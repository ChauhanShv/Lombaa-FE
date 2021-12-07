import React, { useState } from 'react';
import { FloatingLabel, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './post-ad.css';

interface DynamicComponentProps {
    data: any;
}

export const getPostSubCategoryComponent = (categoryData: any) => (
    categoryData?.fields?.map((category: any) => {
        switch (category?.fieldType) {
            case 'checkbox':
                return <CheckboxComponent data={category} />
            case 'dropdown':
                return <DropdownComponent data={category} />
            case 'tagView':
                return <TagViewComponent data={category} />
            case 'switch':
                return <SwitchComponent data={category} />
            case 'label':
                return <LabelComponent data={category} />
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
    return (
        <FloatingLabel className="mb-3" label={data?.label}>
            <Form.Select>
                <option value="">{data?.label}</option>
                {data?.values?.map((fieldData: any) =>
                    <option value={fieldData?.id} key={fieldData?.id}>
                        {fieldData?.value}
                    </option>
                )}
            </Form.Select>
        </FloatingLabel>
    );
}

const TagViewComponent = ({ data }: DynamicComponentProps): React.ReactElement => {
    const [toggleValue, setToggleValue] = useState<any>('');

    return (
        <ToggleButtonGroup
            className="mb-3"
            type="radio"
            name="condition-options"
            value={toggleValue}
            onChange={(value) => { setToggleValue(value) }}
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
    return (
        <FloatingLabel className="mb-3" label={data?.label}>
            <Form.Control type="text" placeholder="Post sub-category Input" />
        </FloatingLabel>
    );
}