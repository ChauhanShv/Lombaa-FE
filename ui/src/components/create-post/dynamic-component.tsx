import React, { useState } from 'react';
import { FloatingLabel, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import './post-ad.css';
import { Fields } from '.';

interface DynamicComponentProps {
    data: any;
}

const getErrorText = (field: string, errors: any): React.ReactElement | null => {
    const errorMessages: any = {
        ...errors
    };
    if (errorMessages[field]) {
        return (
            <Form.Text className="text-danger">
                {errorMessages[field]?.message}
            </Form.Text>
        );
    }
    return null;
};
const getErrorClassName = (field: string, errors: any): string => {
    const errorMessages: any = {
        ...errors,
    };
    return errorMessages[field] ? 'is-invalid' : '';
};

export const getPostSubCategoryComponent = (fields: Fields[]) => (
    fields.map((field: any) => {
        switch (field?.fieldType) {
            case 'checkbox':
                return <CheckboxComponent data={field} key={field.id} />
            case 'dropdown':
                return <DropdownComponent data={field} key={field.id} />
            case 'tagView':
                return <TagViewComponent data={field} key={field.id} />
            case 'switch':
                return <SwitchComponent data={field} key={field.id} />
            case 'label':
                return <LabelComponent data={field} key={field.id} />
            default:
                null;
        }
    })
);

const CheckboxComponent: React.FC<DynamicComponentProps> = ({ data }: DynamicComponentProps): React.ReactElement => {
    return (
        <div key={data?.id}>
            <Form.Label className="text-muted">
                {data?.label}
            </Form.Label>
            <Form.Check className="mb-3" type="checkbox">
                {data?.values?.map((subCategory: any) =>
                    <>
                        <Form.Check.Input
                            type={data?.fieldType}
                            className="margin-right-3"
                        />
                        <Form.Check.Label className="margin-right-3">
                            {subCategory?.value}
                        </Form.Check.Label>
                    </>
                )}
            </Form.Check>
        </div>
    );
};

const DropdownComponent = ({ data }: DynamicComponentProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <FloatingLabel className="mb-3" label={data?.label}>
            <Form.Select className={getErrorClassName('dynamicSelect', errors)} {...register('dynamicSelect')}>
                <option value="">Select {data?.label}</option>
                {data?.values?.map((fieldData: any) =>
                    <option value={fieldData?.id} key={fieldData?.id}>
                        {fieldData?.value}
                    </option>
                )}
            </Form.Select>
            {getErrorText('dynamicSelect', errors)}
        </FloatingLabel>
    );
}

const TagViewComponent = ({ data }: DynamicComponentProps): React.ReactElement => {
    const [toggleValue, setToggleValue] = useState<any>(data?.values[0]?.id);
    return (
        <ToggleButtonGroup
            className="mb-3"
            type="radio"
            name="condition-options"
            defaultValue={toggleValue}
            onChange={(value) => setToggleValue(value)}
            key={data?.id}
        >
            {data?.values?.map((fieldData: any) =>
                <ToggleButton
                    variant="outline-success fullround"
                    value={fieldData?.id}
                    className="rounded m-2 ms-0"
                    id={fieldData?.id}
                    key={fieldData?.id}
                >
                    {fieldData?.value}
                </ToggleButton>
            )}
        </ToggleButtonGroup>
    );
}

const SwitchComponent = ({ data }: DynamicComponentProps): React.ReactElement => {
    return (
        <Form.Check
            type="switch"
            id={data?.id}
            label={data?.label}
        />
    );
}

const LabelComponent = ({ data }: DynamicComponentProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <FloatingLabel className="mb-3" label={data?.label}>
            <Form.Control
                className={getErrorClassName('dynamicInput', errors)}
                type="text"
                placeholder="Post sub-category Input"
                {...register('dynamicInput')}
            />
            {getErrorText('dynamicInput', errors)}
        </FloatingLabel>
    );
}