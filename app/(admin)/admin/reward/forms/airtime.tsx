import { FormField } from '@/app/components/textInput/textInput';
import { NetworkProviders } from '@/app/data';
import { Button } from '@/components/ui/button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useBuyAirtimeContext } from '../context';
import { useAuthContext } from '@/app/(auth)/context';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';

interface AirtimeFormValues {
    phone: string;
}

const AirtimeFormSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
});

const predefinedAmounts = ['100', '200', '500', '1000'];

export const AirtimeForm: React.FC = () => {
    const { currentUser, user } = useAuthContext();
    const cookies = new Cookies();
    const userCookie = cookies.get("user");

    useEffect(() => {
        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);

    const { rewardAirtime, getReward } = useBuyAirtimeContext();
    const [selectedAirtime, setSelectedAirtime] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<string>('');

    const handleSubmit = async (values: AirtimeFormValues) => {
        const userPoints = user?.profile?.points ?? 0;
        if (userPoints < Number(selectedAmount)) {
            notify.error("Oooop!! You don't have sufficient Coin to perform this transaction");
        } else {
            try {
                const payload = { ...values, network: selectedAirtime.toUpperCase(), amount: +selectedAmount };
                await rewardAirtime(userCookie._id, payload as any);
                console.log(payload);

                if (selectedAmount === "") {
                    return notify.error("Amount is required!");
                }
                getReward(userCookie._id);
            } catch (error) {
                console.error("Error buying airtime:", error);
                notify.error("An error occurred while buying airtime.");
            }
        }
    };

    const initialValues: AirtimeFormValues = { phone: '' };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={AirtimeFormSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className='p-4'>
                    <div className='flex gap-4 mb-4'>
                        {NetworkProviders.map((provider, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedAirtime(provider.value)}
                                className={`relative border ${selectedAirtime === provider.value ? 'border-red-500' : 'border-transparent'} rounded-lg  cursor-pointer`}
                            >
                                <img
                                    src={provider.img}
                                    alt={provider.value}
                                    className='w-20 h-20 rounded-lg'
                                />
                                {selectedAirtime === provider.value && (
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl'>
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className='flex gap-4 mb-4'>
                        {predefinedAmounts.map((amount, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setFieldValue('amount', amount);
                                }}
                                className={`relative border ${selectedAmount === amount ? 'border-green-500 bg-green-100' : 'border-black'} rounded-lg py-4 px-4 text-center cursor-pointer`}
                            >
                                {amount}
                                {selectedAmount === amount && (
                                    <div className='absolute top-0 right-0 text-green-500 text-sm p-1'>
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <FormField label="Phone Number" name="phone" type="text" className="mb-4" />

                    <div>
                        <Button type="submit" className="mt-4 bg-black hover:bg-gray-800 text-white" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AirtimeForm;
