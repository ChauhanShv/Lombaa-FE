import React, { useEffect, useState } from 'react';
import { Modal, Alert, Spinner } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { getAPIErrorMessage } from '../../../utils';
import { LoginProps, FormFields } from './types';
import { ActionTypes, useAppContext } from '../../../contexts';
import { useAxios } from '../../../services/base-service';
import { GOOGLE_CLIENTID, FB_APPID } from '../../../config';
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
    const [openFBLogin, setOpenFBLogin] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });
    const { dispatch } = useAppContext();
    const [{ data: loginResponse, loading, error: apiError }, execute] = useAxios({
        url: '/auth',
        method: 'POST',
    });
    const [{ data: googleRes, loading: googleLoading, error: googleApiError }, googleExecute] = useAxios({
        url: '/auth/google',
        method: 'POST',
    });
    const [{ data: fbRes, loading: fbLoading, error: fbApiError }, fbExecute] = useAxios({
        url: '/auth/facebook',
        method: 'POST',
    });

    useEffect(() => {
        const { success, response, metadata } = loginResponse || fbRes || googleRes || {};
        if (success) {
            localStorage.setItem("token", response?.token);
            dispatch({
                type: ActionTypes.LOGIN,
                payload: {
                    token: response?.token,
                    metaData: metadata?.user,
                }
            });
            onClose();
        }
    }, [loginResponse, googleRes, fbRes]);

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
    const showAPIErrorMessage = () => {
        if (!apiError && !fbApiError && !googleApiError) {
            return null;
        }
        return (
            <Alert variant="danger">
                {getAPIErrorMessage(apiError || fbApiError || googleApiError)}
            </Alert>
        );
    };
    const googleSuccess = (gRes: any) => {
        googleExecute({
            data: {
                accessToken: gRes.accessToken,
            },
        });
    }
    const facebookSuccess = (fbRes: any) => {
        fbExecute({
            data: {
                accessToken: fbRes.accessToken
            },
        });
    }

    return (
        <Modal show={show} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    <div className="modal-body">
                        <p className="ml-3"><strong>Welcome back!</strong></p>
                        {showAPIErrorMessage()}
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
                                <Link to="/forgot-password" onClick={() => onClose()}>Forgot Password?</Link>
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
                            <GoogleLogin
                                clientId={GOOGLE_CLIENTID}
                                render={renderProps => (
                                    <Button
                                        className="w-100"
                                        variant="outline-success"
                                        onClick={renderProps.onClick}
                                        disabled={googleLoading || renderProps.disabled}
                                    >
                                        <FaGoogle /> Via Google
                                    </Button>
                                )}
                                buttonText="Login"
                                onSuccess={googleSuccess}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="col-5">
                            <Button
                                className="w-100"
                                variant="outline-success"
                                onClick={() => setOpenFBLogin(true)}
                                disabled={fbLoading}
                            >
                                <FaFacebook /> Via Facebook
                            </Button>
                            {openFBLogin && (
                                <FacebookLogin
                                    appId={FB_APPID}
                                    autoLoad
                                    fields="name,email,picture"
                                    onClick={() => {}}
                                    callback={facebookSuccess}
                                    buttonStyle={{display: 'none'}}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
