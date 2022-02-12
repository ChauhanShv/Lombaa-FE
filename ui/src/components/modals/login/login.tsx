import React, { useEffect, useState } from 'react';
import { Modal, Alert, Spinner, Form, FloatingLabel, Button, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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
    onRegisterClick,
}: LoginProps): React.ReactElement => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });
    const { dispatch } = useAppContext();
    const [showModal, setShowModal] = useState<boolean>(show ?? false);
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
        onRegisterClick();
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
        <Modal show={showModal} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    <div className="modal-body px-0">
                        <Modal.Header closeButton>
                            <p className="ml-3"><strong>Welcome back!</strong></p>
                        </Modal.Header>
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
                                <Form.Check name="usertype" label="Remember Me" id="remember" inline type="checkbox" aria-label="radio 1" />
                                <Link to="/forgot-password" onClick={() => onClose()}>Forgot Password?</Link>
                            </div>
                            <div className="form-group text-center mt-3">
                                <Button type="submit" className="btn btn-success w-100">
                                    {
                                        loading ? (
                                            <Spinner animation="border" role="status"></Spinner>
                                        ) : 'Login'
                                    }
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="text-center mb-4">Don't have an account?
                        <Nav.Link className="px-0 register-link" onClick={handleRegisterClick}>
                            Register
                        </Nav.Link>
                    </div>
                    <div className="row justify-content-center mb-5">
                        <div className="col-12">
                            <GoogleLogin
                                clientId={GOOGLE_CLIENTID}
                                render={renderProps => (
                                    <Button
                                        className="glog-btn w-100"
                                        variant="outline-link"
                                        onClick={renderProps.onClick}
                                        disabled={googleLoading}
                                    >
                                        <img src="images/google.svg" /> Continue with Google
                                    </Button>
                                )}
                                buttonText="Login"
                                onSuccess={googleSuccess}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <FacebookLogin
                                render={renderProps => (
                                    <Button
                                        className="fblog-btn w-100"
                                        variant="outline-link"
                                        onClick={renderProps.onClick}
                                        disabled={fbLoading}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 90 90"><g><path d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"></path></g></svg> Continue with Facebook
                                    </Button>
                                )}
                                appId={FB_APPID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={facebookSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
