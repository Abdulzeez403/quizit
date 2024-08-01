import { FormField } from '@/app/components/textInput/textInput';
import { IData, NetworkProviders } from '@/app/data';
import { Button } from '@/components/ui/button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useBuyAirtimeContext } from '../context';
import { useAuthContext } from '@/app/(auth)/context';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';

const DataFormSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is Required'),
    dataPlan: Yup.string().required('Data plan is required'),
});

const DataPlans = ['500MB', '1GB', '2GB', '3GB'];

export const DataBundleForm: React.FC = () => {
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

    const { rewardData, getReward } = useBuyAirtimeContext();
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');
    const [selectedDataPlan, setSelectedDataPlan] = useState<string>('');

    const handleSubmit = async (values: IData) => {
        const userPoints = user?.profile?.points ?? 0;
        const dataPlanAmount = Number(selectedDataPlan.replace('MB', '').replace('GB', '')) * (selectedDataPlan.includes('GB') ? 1000 : 1); // Convert to MB

        if (userPoints < dataPlanAmount) {
            notify.error("Oooop!! You don't have sufficient Coin to perform this transaction");
        } else {
            try {
                const payload = {
                    phone: values.phone,
                    network: selectedNetwork.toUpperCase(),
                    dataPlan: selectedDataPlan,
                };

                await rewardData(userCookie._id, payload as any);
                console.log(payload);
                getReward(userCookie._id);
            } catch (error) {
                console.error("Error buying airtime:", error);
                notify.error("An error occurred while buying airtime.");
            }
        }
    };

    const initialValues: IData = { phone: 0, dataPlan: '' };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={DataFormSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className='p-4'>
                    <div className="flex gap-4 mb-4">
                        {NetworkProviders.map((provider, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedNetwork(provider.value)}
                                className={`relative border ${selectedNetwork === provider.value ? 'border-red-500' : 'border-transparent'} rounded-lg p-1 cursor-pointer`}
                            >
                                <img
                                    src={provider.img}
                                    alt={provider.value}
                                    className="w-20 h-20 rounded-lg"
                                />
                                {selectedNetwork === provider.value && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl">
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mb-4">
                        {DataPlans.map((data, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedDataPlan(data);
                                    setFieldValue('dataPlan', data); // Set the data plan in the form field
                                }}
                                className={`relative border ${selectedDataPlan === data ? 'border-green-500 bg-green-100' : 'border-black'} rounded-lg p-4 text-center cursor-pointer`}
                            >
                                {data}
                                {selectedDataPlan === data && (
                                    <div className="absolute top-0 right-0 text-green-500 text-sm p-1">
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <FormField label="Phone Number" name="phone" type="text" />

                    <div>
                        <Button type="submit" className="mt-4 bg-black hover:bg-slate-300 text-white" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default DataBundleForm;
