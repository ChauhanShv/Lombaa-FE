import React, { useEffect, useState } from 'react';
import { Modal, Alert, Spinner } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { RegisterProps, FormFields, AccountType } from './types';
import { PASSWORD_REGEX, NAME_MIN_LENGTH } from '../../../constants';
import { useAxios } from '../../../services/base-service';
import { useAppContext, ActionTypes } from '../../../contexts';
import './register.css';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
    accountType: yup.string().required('Account type is required'),
}).required();

export const Register: React.FC<RegisterProps> = ({
    show,
    openLogin,
    onClose,
}: RegisterProps): React.ReactElement => {
    const { register, handleSubmit, getValues, formState: { isValid, errors } } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });
    const [selectedAccountType, setSelectedAccountType] = useState<AccountType>();
    const { dispatch } = useAppContext();
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/auth1',
        method: 'POST',
    });

    useEffect(() => {
        if (response?.token) {
            localStorage.setItem("token", response.token);
            dispatch({
                type: ActionTypes.LOGIN,
            });
            onClose();
        }
    }, [response]);

    const getIndividualFields = (): React.ReactElement => {
        return (
            <>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Your Name" className="mb-3">
                        <Form.Control
                            {...register("name")}
                            placeholder="Your Name"
                        />
                        {getErrorText('name')}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Your phone number" className="mb-3">
                        <Form.Control
                            {...register("phoneNumber")}
                            placeholder="Your phone number"
                        />
                        {getErrorText('phoneNumber')}
                    </FloatingLabel>
                </Form.Group>
            </>
        );
    };

    const getBusinessFields = (): React.ReactElement => {
        return (
            <>
                <Form.Group className="mb-3">
                    <FloatingLabel label="TIN number" className="mb-3">
                        <Form.Control 
                            {...register("tin")}
                            placeholder="TIN number"
                            isValid={!!errors.tin}
                        />
                        {getErrorText('tin')}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Legal business name" className="mb-3">
                        <Form.Control 
                            {...register("businessName")}
                            placeholder="Legal business name"
                            isValid={!!errors.businessName}
                        />
                        {getErrorText('businessName')}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Business phone number" className="mb-3">
                        <Form.Control
                            {...register("phoneNumber")}
                            placeholder="Business phone number"
                            isValid={!!errors.phoneNumber}
                        />
                        {getErrorText('phoneNumber')}
                    </FloatingLabel>
                </Form.Group>
            </>
        );
    };

    const getFieldsOnAccountType = (): React.ReactElement | null => {
        if (selectedAccountType) {
            return selectedAccountType === AccountType.INDIVIDUAL ? getIndividualFields() : getBusinessFields();
        }
        return null;
    };
    const isFormValid = (formValues: any): boolean => {
        if (!isValid) {
            return isValid;
        }
        if (formValues.accountType === AccountType.INDIVIDUAL) {
            if (!formValues.name || formValues.name.length < NAME_MIN_LENGTH) {
                return false;
            }
        }
        if (formValues.accountType === AccountType.BUSINESS) {
            if (!formValues.businessName || formValues.businessName.length < NAME_MIN_LENGTH) {
                return false;
            }
        }
        return true;
    };
    const onSubmit = (values: any) => {
        if (isFormValid(values)) {
            execute({
                data: {
                    ...values,
                }
            });
        }
    };
    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };
    const handleLoginClick = () => {
        onClose();
        openLogin(true);
    };

    const getErrorText = (field: string): React.ReactElement | null => {
        const errorMessages: any = {
            ...errors
        };
        const formValues = getValues();
        if (errorMessages.accountType) {
            errorMessages.accountType = {
                message: 'Account type is required',
            };
        }

        if (formValues.accountType === AccountType.INDIVIDUAL) {
            if (!formValues.name) {
                errorMessages.name = {
                    message: 'Name is required',
                };
            }

            if (formValues.name?.length < NAME_MIN_LENGTH) {
                errorMessages.name = {
                    message: 'Name is invalid',
                };
            }
        }
        if (formValues.accountType === AccountType.BUSINESS) {
            if (!formValues.businessName) {
                errorMessages.businessName = {
                    message: 'Busines name is required',
                };
            }

            if (formValues.businessName?.length < NAME_MIN_LENGTH) {
                errorMessages.businessName = {
                    message: 'Busines name is invalid',
                };
            }
        }

        if (errorMessages[field]) {
            return (
                <Form.Text className="text-danger">
                    {errorMessages[field]?.message}
                </Form.Text>
            );
        }
        return null;
    };

    return (
        <Modal show={show} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    <div className="modal-body">
                        <p className="ml-3"><strong>Create your account!</strong></p>
                        {apiError && (
                            <Alert variant="danger">
                                Something went wrong.
                            </Alert>
                        )}
                        <Form onSubmit={handleFormSubmit} noValidate>                   
                            <FloatingLabel label="Email address" className="mb-3">
                                <Form.Control
                                    {...register("email")}
                                    type="email"
                                    placeholder="Your Email"
                                    isValid={!!errors.email}
                                    className="is-invalid"
                                />
                                {getErrorText('email')}
                            </FloatingLabel>
                            <FloatingLabel label="Password" className="mb-3" >
                                <Form.Control
                                    {...register("password")}
                                    type="password"
                                    placeholder="Password"
                                    isValid={!!errors.password}
                                />
                                {getErrorText('Password')}
                            </FloatingLabel>

                            <div className="form-group mb-3">
                                <Form.Check
                                    label="Individual"
                                    inline
                                    type="radio"
                                    value={AccountType.INDIVIDUAL}
                                    checked={selectedAccountType === AccountType.INDIVIDUAL}
                                    {...register("accountType")}
                                    onChange={() => setSelectedAccountType(AccountType.INDIVIDUAL)}
                                    isValid={!!errors.accountType}
                                />
                                <Form.Check
                                    label="Business"
                                    inline
                                    type="radio"
                                    value={AccountType.INDIVIDUAL}
                                    checked={selectedAccountType === AccountType.INDIVIDUAL}
                                    {...register("accountType")}
                                    onChange={() => setSelectedAccountType(AccountType.INDIVIDUAL)}
                                    isValid={!!errors.accountType}
                                />
                                {getErrorText('accountType')}
                            </div>
                            {selectedAccountType && getFieldsOnAccountType()}
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-primary w-100">
                                    {
                                        loading ? (
                                            <Spinner animation="border" role="status"></Spinner>
                                        ) : 'Register'
                                    }
                                </button>
                            </div>
                        </Form>
                        <div className="text-center mt-3 mb-3">Already have an account?                         
                            <Button variant="link" onClick={handleLoginClick}>Login</Button>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-5">
                        <div className="col-5">
                            <Button className="w-100" variant="outline-success"><FaGoogle /> Via Google</Button>                            
                        </div>
                        <div className="col-5">
                            <Button className="w-100" variant="outline-success"><FaFacebook /> Via Facebook</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};