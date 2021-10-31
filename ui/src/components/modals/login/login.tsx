import React, { useEffect, useState } from 'react';
import { Modal, Alert, Spinner } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getAPIErrorMessage } from '../../../utils';
import { LoginProps, FormFields } from './types';
import { ActionTypes, useAppContext } from '../../../contexts';
import { useAxios } from '../../../services/base-service';
import './login.css';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
}).required();

export const Login: React.FC<LoginProps> = ({
    show,
    onClose,
    openRegister,
}: LoginProps): React.ReactElement => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });
    const { dispatch } = useAppContext();
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/auth',
        method: 'POST',
    });

    useEffect(() => {
        if (response?.success) {
            localStorage.setItem("token", response.response.token);
            dispatch({
                type: ActionTypes.LOGIN,
                payload: {
                    token: response?.response?.token,
                    user: response?.metadata,
                }
            });
            onClose();
        }
    }, [response]);
    const handleRegisterClick = () => {
        onClose();
        openRegister(true);
    };
    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
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

    const getErrorClassName = (field: string): string => {
        const errorMessages: any = {
            ...errors
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };

    return (
        <Modal show={show} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    <div className="modal-body">
                        <p className="ml-3"><strong>Welcome back!</strong></p>
                        {apiError && (
                            <Alert variant="danger">
                                {getAPIErrorMessage(apiError)}
                            </Alert>
                        )}
                        <Form onSubmit={handleFormSubmit} noValidate>                          
                            <FloatingLabel label="Your Email address" className="mb-3" >
                                <Form.Control
                                    {...register("email")}
                                    type="email"
                                    placeholder="Your Email address"
                                    className={getErrorClassName('email')}
                                />
                                {getErrorText('email')}
                            </FloatingLabel>
                            <FloatingLabel label="Password" className="mb-3" >
                                <Form.Control
                                    {...register("password")}
                                    type="password"
                                    placeholder="Password"
                                    className={getErrorClassName('password')}
                                />
                                {getErrorText('password')}
                            </FloatingLabel>
                            <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                                <Form.Check name="usertype" label="Remember Me" inline type="checkbox" aria-label="radio 1" />
                                <Link to="forgot-password">Forgot Password?</Link>
                            </div>                         
                            <div className="form-group text-center mt-3">
                                <Button type="submit" className="btn btn-primary w-100">
                                    {
                                        loading ? (
                                            <Spinner animation="border" role="status"></Spinner>
                                        ) : 'Login'
                                    }
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="text-center mb-4">Don't have an account? <Button className="px-0" variant="link" onClick={handleRegisterClick}>Register</Button></div>
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
