// components/AdminForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '../components/textInput/textInput';
import { useAuthContext } from './context';


interface SignInFormValues {
    email: string;
    password: string;

}

const SignInFormValues = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

    password: Yup.string()
        // .min(5, 'Password too short!')
        .required('Required'),

});

export const SignInForm: React.FC = () => {
    const { signIn } = useAuthContext()

    const initialValues: SignInFormValues = {
        email: '',
        password: '',

    };

    const handleSubmit = (values: SignInFormValues) => {
        signIn(values)
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInFormValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>

                    <FormField label="Email" name="email" className="my-4" />
                    <FormField label="Password" name="password" type="password" />

                    <div>
                        <Button type="submit" className="w-full mt-4 my-3 bg-black" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
