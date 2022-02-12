import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
    Col,
    Row,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import {
    FaChevronLeft,
    FaInfoCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAxios } from '../../services';
import { isEmpty } from 'lodash';
import { ChangeEmailFormFeilds, AlertType } from './types';
import { useAppContext, ActionTypes } from '../../contexts';
import { getAPIErrorMessage } from '../../utils';
import './settings.css';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
}).required();

export const ChangeEmail: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const userData = state.user?.metaData;
    const [alert, setAlert] = useState<AlertType>({});
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ChangeEmailFormFeilds>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            email: userData?.email,
        }
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/email',
        method: 'PUT'
    });
    const [{ data: resendEmailRes, loading: resendEmailLoading, error: resendMailError }, executeEmailResend] = useAxios({
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
                message: `Verification link sent to your mail ${userData?.email}`,
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

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center ">
                    <Link to="/settings" className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </Link>Change Email
                </span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto col-11">
                <Form onSubmit={handleFormSubmit} className="details-form p-5">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError) || getAPIErrorMessage(resendMailError)}
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
                        <Row className='mb-3'>
                            <Col md={2}>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id="tooltip">
                                            Your email is not verified yet. Please verify
                                        </Tooltip>
                                    }
                                >
                                    <Button className='border-0 bg-white'>
                                        <FaInfoCircle style={{ width: 50, height: 30 }} fill='red' />{'     '}
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                            <Col md={10} className='mt-2'>
                                Please <a onClick={handleResendVerificationMail} className="verify-email-link">Verify</a> Your account here.
                            </Col>
                        </Row>
                    )}
                    <Button type="submit" className="btn btn-success w-100">
                        {
                            loading ? (
                                <Spinner animation="border" role="status"></Spinner>
                            ) : 'Update'
                        }
                    </Button>
                </Form>
            </Col>
        </Card>
    );
}