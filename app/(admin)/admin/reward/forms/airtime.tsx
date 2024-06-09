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
    // amount: string;
    phoneNumber: string;
}

const AirtimeFormSchema = Yup.object().shape({
    // amount: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
});

const predefinedAmounts = ['200', '100', '500', '1000'];

export const AirtimeForm: React.FC = () => {
    const { currentUser, user } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);


    const { buyAirtime, createReward } = useBuyAirtimeContext()
    const [selectedAirtime, setSelectedAirtime] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<string>('');

    const { getReward } = useBuyAirtimeContext()




    const handleSubmit = async (values: AirtimeFormValues) => {
        const payload = { ...values, serviceID: selectedAirtime, amount: selectedAmount };

        if (user?.profile?.points < Number(selectedAmount)) {
            notify.error("Oooop!! You don't have sufficient Coin to perform this transaction");
        } else {
            try {
                await buyAirtime(payload as any);
                console.log(payload);

                // Only call createReward if buyAirtime was successful
                await createReward(userCookie?._id, {
                    points: Number(selectedAmount),
                    type: `${selectedAirtime} Airtime`,
                    amount: Number(selectedAmount)
                });
                notify.success("Airtime purchased successfully!");
                getReward(userCookie._id)
            } catch (error) {
                console.error("Error buying airtime:", error);
                notify.error("An error occurred while buying airtime.");
            }
        }
    };


    const initialValues: AirtimeFormValues = { phoneNumber: '' };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={AirtimeFormSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className='pr-8'>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {NetworkProviders.map((provider, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedAirtime(provider.value)}
                                style={{
                                    position: 'relative',
                                    border: selectedAirtime === provider.value ? '2px solid red' : 'none',
                                    borderRadius: '4px',
                                    padding: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={provider.img}
                                    alt={provider.value}
                                    style={{ width: '75px', height: '75px', borderRadius: '10px' }}
                                />
                                {selectedAirtime === provider.value && (
                                    <div style={{ position: 'absolute', top: '20px', left: '25px', color: 'red', fontSize: '25px' }}>
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {predefinedAmounts.map((amount, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setFieldValue('amount', amount);
                                }}
                                style={{
                                    position: 'relative',
                                    border: selectedAmount === amount ? '2px solid green' : 'none',
                                    borderRadius: '4px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    backgroundColor: selectedAmount === amount ? 'lightgreen' : 'customSecondary'
                                }}
                            >
                                {amount}
                                {selectedAmount === amount && (
                                    <div style={{ position: 'absolute', top: '0px', right: '0px', color: 'green', fontSize: '15px' }}>
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <FormField label="Phone Number" name="phoneNumber" type="text" />

                    <div>
                        <Button type="submit" className=" mt-4 my-3 bg-black hover:bg-slate-300" disabled={isSubmitting}>

                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AirtimeForm;
