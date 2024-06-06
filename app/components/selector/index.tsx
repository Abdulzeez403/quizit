import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldProps, useField } from 'formik';

interface GenderSelectProps {
    label: string;
    name: string;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ label, name }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Select
                onValueChange={(value) => helpers.setValue(value)}

            >
                <SelectTrigger className="w-96">
                    <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
    );
};

export default GenderSelect;
