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
import { useAppContext } from '../../contexts';
import { getErrorClassName } from '../../utils';
import { Field, EditFormFieldsProps } from './types';

export const EditFormFields: React.FC<EditFormFieldsProps> = ({
    fields,
    fieldValues,
}: EditFormFieldsProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();
    const { state } = useAppContext();
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

    const getValuesForFields: any = (id: string, fieldType: string) => {
        for (const fieldValue of fieldValues) {
            if (fieldValue.field?.id === id) {
                if (fieldType === 'dropdown' || fieldType === 'checkbox' || fieldType === '') {
                    return fieldValue?.fieldValue?.id;
                }
                return fieldValue.value;
            }
        }
        return "";
    };

    const InputComponent: React.FC<Field> = ({
        id,
        label,
        fieldType,
        dataTypes,
        isRequired,
    }: Field): React.ReactElement => {
        const [inputValue, setInputValue] = useState<string>(getValuesForFields(id, fieldType));
        const type = ['email', 'text', 'date'].includes(fieldType) && ['numeric'].includes(dataTypes) ? 'number' : fieldType || 'text';
        return (
            <FloatingLabel label={label + getFieldNecessity(isRequired)} className="mb-3">
                <Form.Control
                    {...register(id)}
                    type={type}
                    placeholder={label}
                    isValid={!!errors[id]}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    className={getErrorClassName(id, errors)}
                />
                {getErrorText(id)}
            </FloatingLabel>
        );
    };

    const TextAreaComponent: React.FC<Field> = ({
        id,
        label,
        fieldType,
        isRequired,
    }: Field): React.ReactElement => {
        const [inputValue, setInputValue] = useState<string>(getValuesForFields(id, fieldType));
        return (
            <FloatingLabel label={label + getFieldNecessity(isRequired)} className="mb-3">
                <Form.Control
                    style={{ height: '150px' }}
                    {...register(id)}
                    as="textarea"
                    placeholder={label}
                    isValid={!!errors[id]}
                    rows={3}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
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
        fieldType,
        isRequired,
    }: Field): React.ReactElement => {
        const [selectedValue, setSelectedValue] = useState<string>(getValuesForFields(id, fieldType));
        return (
            <FloatingLabel className="mb-3" label={label + getFieldNecessity(isRequired)}>
                <Form.Select
                    {...register(id)}
                    className={getErrorClassName(id, errors)}
                    value={selectedValue}
                    onChange={(event: any) => setSelectedValue(event.target?.value)}
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
        fieldType,
    }: Field): React.ReactElement => {
        const [isCheckedId, setIsCheckedId] = useState<string>(getValuesForFields(id, fieldType));
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
                                checked={val.id === isCheckedId}
                                onChange={(event) => setIsCheckedId(val.id)}
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
        fieldType,
    }: Field): React.ReactElement => {
        const [isCheckedId, setIsCheckedId] = useState<string>(getValuesForFields(id, fieldType));
        return (
            <InputGroup className="mb-3">
                <Form.Check
                    {...register(id)}
                    className={getErrorClassName(id, errors)}
                    checked={id === isCheckedId}
                    type="switch"
                    id={id}
                    label={label}
                    onChange={(event) => setIsCheckedId(id)}
                />
                {getErrorText(id)}
            </InputGroup>
        );
    }

    const TagViewComponent = ({
        id,
        label,
        values,
        fieldType,
    }: Field): React.ReactElement => {
        const [toggleValue, setToggleValue] = useState<string>(getValuesForFields(id, fieldType) || values[0].id);
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

    const PriceComponent = ({
        id,
        fieldType,
    }: Field): React.ReactElement => {
        const defaultPriceValue = parseInt(getValuesForFields(id, fieldType));
        const [priceValue, setPriceValue] = useState<number>(defaultPriceValue);
        return (
            <div className='mb-4'>
                <InputGroup className="mt-2">
                    <InputGroup.Text id="basic-addon1 d-block">
                        {state?.user?.metaData?.location?.country?.currencySymbol}
                    </InputGroup.Text>
                    <FormControl
                        type="number"
                        className={`${getErrorClassName(id, errors)} p-3`}
                        {...register(id)}
                        placeholder="Price of your listing *"
                        aria-label="Price of your listing"
                        aria-describedby="basic-addon1"
                        value={priceValue}
                        onChange={(event: any) => setPriceValue(event.target.value)}
                    />
                </InputGroup>
                <span>{getErrorText(id)}</span>
            </div>
        );
    }

    const getFieldFromType = (field: Field) => {
        switch (field.fieldType) {
            case 'text':
            case 'label':
            case 'title':
            case 'email':
            case 'date':
                return <InputComponent {...field} key={field.id} />;
            case 'textArea':
            case 'description':
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
                fields.map((field: Field) => getFieldFromType(field))
            }
        </>
    );
};