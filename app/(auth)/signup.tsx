"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '../components/textInput/textInput';
import { useAuthContext } from './context';
import GenderSelect from '../components/selector';


interface SignUpFormValues {
    name: string;
    email: string;
    gender: string;
    username: string;
    password: string;



}

const SignUpFormValues = Yup.object().shape({
    name: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')

});

export const SignUpForm: React.FC = () => {

    const { signUp, loading } = useAuthContext()

    const initialValues: SignUpFormValues = {
        name: '',
        email: '',
        password: '',
        username: '',
        gender: '',

    };

    const handleSubmit = (values: SignUpFormValues) => {
        signUp(values)
        console.log(values);
    };

    return (
        <div className="">

            <Formik
                initialValues={initialValues}
                validationSchema={SignUpFormValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormField label="Name" name="name" className="my-4" />
                        <FormField label="Email" name="email" className="my-4" />
                        <FormField label="Username" name="username" className="my-4" />
                        <GenderSelect label="Gender" name="gender" />
                        <FormField label="Password" name="password" type="password" className="my-4" />
                        <div>

                            <Button type="submit" className="mt-4 bg-black" disabled={isSubmitting}>
                                Submit
                            </Button>


                        </div>
                    </Form>
                )}
            </Formik>

        </div>

    );
};
