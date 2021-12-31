import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
    Col,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAxios } from '../../services';
import { isEmpty } from 'lodash';
import { ChangeEmailFormFeilds, AlertType } from './types';
import { useAppContext, ActionTypes } from '../../contexts';
import { getAPIErrorMessage } from '../../utils';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
}).required();

export const ChangeEmail: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const userData = state.user?.metaData;
    const [alert, setAlert] = useState<AlertType>({});
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ChangeEmailFormFeilds>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: userData?.email,
        }
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/email',
        method: 'PUT'
    });
    const [{ data: resendEmailRes, loading: resendEmailLoading }, executeEmailResend] = useAxios({
        url: '/user/email/verify/resend',
        method: 'GET',
    });

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: response?.message || 'Email Changed Successfully',
            });
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: {
                        ...state.user?.metaData,
                        email: getValues().email,
                    },
                }
            })
        }
        if (resendEmailRes?.success) {
            setAlert({
                variant: 'success',
                message: resendEmailRes?.message || 'Verification mail sent successful',
            });
        }
    }, [response, resendEmailRes]);

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
    const handleResendVerificationMail = (event: React.FormEvent) => {
        event.preventDefault();
        executeEmailResend({});
    }

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

    const getSubmitButtonText = (isEmailVerified: number) => {
        return isEmailVerified ? 'Update' : 'Verify';
    }

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Change Email</span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-5">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            {...register('email')}
                            type="text"
                            placeholder="Email"
                            className={getErrorClassName('email')}
                        />
                        {getErrorText('email')}
                    </FloatingLabel>
                    {!userData?.isEmailVerified && (
                        <>
                            <p className="text-danger">Your email is not verified yet. Please verify</p>
                            <Button
                                variant='outline-success'
                                className="mb-3 w-100"
                                onClick={handleResendVerificationMail}
                            >
                                Resend Verification Mail
                            </Button>
                        </>
                    )}
                    <Button type="submit" className="btn btn-success w-100">
                        {
                            loading ? (
                                <Spinner animation="border" role="status"></Spinner>
                            ) : `${getSubmitButtonText(userData?.isEmailVerified)}`
                        }
                    </Button>
                </Form>
            </Col>
        </Card>
    );
}