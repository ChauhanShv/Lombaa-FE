import React, { useState } from 'react';
import {
    FloatingLabel,
    Form,
    ToggleButtonGroup,
    ToggleButton,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import './post-ad.css';
import { getErrorClassName } from '../../utils';
import { Fields } from '.';

interface FormFieldsProps {
    fields: Fields[];
}

export const FormFields: React.FC<FormFieldsProps> = ({
    fields
}: FormFieldsProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();
    const getFieldNecessity = (required: boolean) => required ? '*' : '(Optional)';
    const getErrorText = (field: string): React.ReactElement | null => {
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

    const InputComponent: React.FC<Fields> = ({
        id,
        label,
        fieldType,
        isRequired,
    }: Fields): React.ReactElement => {
        const type = ['email', 'text', 'date'].includes(fieldType) ? fieldType : 'text';
        return (
            <FloatingLabel label={label + getFieldNecessity(isRequired)} className="mb-3">
                <Form.Control
                    {...register(id)}
                    type={type}
                    placeholder={label}
                    isValid={!!errors[id]}
                    className={getErrorClassName(id, errors)}
                />
                {getErrorText(id)}
            </FloatingLabel>
        );
    };

    const TextAreaComponent: React.FC<Fields> = ({
        id,
        label,
        isRequired,
    }: Fields): React.ReactElement => {
        return (
            <FloatingLabel label={label + getFieldNecessity(isRequired)} className="mb-3">
                <Form.Control
                    {...register(id)}
                    as="textarea"
                    placeholder={label}
                    isValid={!!errors[id]}
                    rows={3}
                    className={getErrorClassName(id, errors)}
                />
                {getErrorText(id)}
            </FloatingLabel>
        );
    };

    const DropDownComponent = ({
        id,
        label,
        values,
        isRequired,
    }: Fields): React.ReactElement => {
        return (
            <FloatingLabel className="mb-3" label={label + getFieldNecessity(isRequired)}>
                <Form.Select
                    {...register(id)}
                    className={getErrorClassName(id, errors)}
                >
                    <option value="">Select {label}</option>
                    {values.map((val: any) =>
                        <option value={val.id} key={val?.id}>
                            {val.value}
                        </option>
                    )}
                </Form.Select>
                {getErrorText(id)}
            </FloatingLabel>
        );
    }

    const CheckboxComponent = ({
        id,
        label,
        values,
    }: Fields): React.ReactElement => {
        return (
            <>
                <Form.Label className="text-muted">
                    {label}
                </Form.Label>
                <Form.Check
                    type="checkbox"
                    className={`mb-3 ${getErrorClassName(id, errors)}`}
                >
                    {values.map((val: any) =>
                        <React.Fragment key={val.id}>
                            <Form.Check.Input
                                {...register(id)}
                                type="checkbox"
                                value={val.id}
                                className="margin-right-3"
                            />
                            <Form.Check.Label className="margin-right-3">
                                {val.value}
                            </Form.Check.Label>
                        </React.Fragment>
                    )}
                </Form.Check>
                {getErrorText(id)}
            </>
        );
    }

    const SwitchComponent = ({
        id,
        label,
    }: Fields): React.ReactElement => {
        return (
            <InputGroup className="mb-3">
                <Form.Check
                    {...register(id)}
                    className={getErrorClassName(id, errors)}
                    type="switch"
                    id={id}
                    label={label}
                />
                {getErrorText(id)}
            </InputGroup>
        );
    }

    const TagViewComponent = ({
        id,
        label,
        values,
    }: Fields): React.ReactElement => {
        const [toggleValue, setToggleValue] = useState<string>(values[0].id);
        return (
            <InputGroup className="mb-3">
                <ToggleButtonGroup
                    {...register(id)}
                    className={`mb-3 ${getErrorClassName(id, errors)}`}
                    aria-label="label"
                    type="radio"
                    name="condition-options"
                    defaultValue={toggleValue}
                    onChange={(value) => setToggleValue(value)}
                    key={id}
                >
                    {values.map((val: any) =>
                        <ToggleButton
                            variant="outline-success fullround"
                            value={val.id}
                            className="rounded m-2 ms-0"
                            id={val.id}
                            key={val.id}
                        >
                            {val.value}
                        </ToggleButton>
                    )}
                </ToggleButtonGroup>
                {getErrorText(id)}
            </InputGroup>
        );
    }

    const PriceComponent = (): React.ReactElement => {
        const [isForSale, setIsForSale] = useState<string>('sale');
        return (
            <>
                <ToggleButtonGroup
                    type="radio"
                    name="price-options"
                    defaultValue={isForSale}
                >
                    <ToggleButton variant="outline-success fullround" className="rounded m-2 ms-0" value="sale" onClick={() => setIsForSale('sale')}>
                        For Sale
                    </ToggleButton>
                    <ToggleButton variant="outline-success fullround" className="rounded m-2" value="free" onClick={() => setIsForSale('free')}>
                        For Free
                    </ToggleButton>
                </ToggleButtonGroup>
                {isForSale === 'sale' && (
                    <InputGroup className="mt-2 mb-5">
                        <InputGroup.Text id="basic-addon1 d-block">$</InputGroup.Text>
                        <FormControl
                            className={getErrorClassName('price', errors)}
                            {...register('price')}
                            placeholder="Price of your listing"
                            aria-label="Price of your listing"
                            aria-describedby="basic-addon1"
                        // onChange={handlePriceChange}
                        />
                        {getErrorText('price')}
                    </InputGroup>
                )}
            </>
        );
    }

    const getFieldFromType = (field: Fields) => {
        switch (field.fieldType) {
            case 'text':
            case 'label':
            case 'title':
            case 'email':
            case 'date':
                return <InputComponent {...field} key={field.id} />;
            case 'textArea':
                return <TextAreaComponent {...field} key={field.id} />;
            case 'dropdown':
                return <DropDownComponent {...field} key={field.id} />;
            case 'checkbox':
                return <CheckboxComponent {...field} key={field.id} />
            case 'switch':
                return <SwitchComponent {...field} key={field.id} />;
            case 'tagView':
                return <TagViewComponent {...field} key={field.id} />;
            case 'price':
                return <PriceComponent {...field} key={field.id} />;
            default:
                return null;
        }
    };
    return (
        <>
            {
                fields.map((field: Fields) => getFieldFromType(field))
            }
        </>
    );
};