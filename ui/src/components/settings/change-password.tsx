import React, { useEffect, useState } from 'react';
import {
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
    Col,
    InputGroup,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { getAPIErrorMessage } from '../../utils';
import { useAxios } from '../../services';
import { PASSWORD_REGEX } from '../../constants';
import { ChangePasswordFormFeilds, AlertType } from './types';

const schema = yup.object().shape({
    oldPassword: yup.string().required('Current password is required'),
    password: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 6 characters, 1 uppercase letter, 1 lowercase letter and 1 special character'
    ).notOneOf([yup.ref('oldPassword'), 'null'], 'New and old password cannot be same').required('New password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
}).required();
const successMessage: string = 'Your password has changed';

export const ChangePassword: React.FC = (): React.ReactElement => {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<ChangePasswordFormFeilds>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [alert, setAlert] = useState<AlertType>({});
    const [showPassword, setShowPassword] = useState<any>({
        oldPassword: false,
        password: false,
        confirmPassword: false,
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/password',
        method: 'PUT'
    });

    useEffect(() => {
        if (response?.success) {
            reset();
            setAlert({
                variant: 'success',
                message: successMessage,
            });
        }
    }, [response]);

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
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center my-lg-1 settings-font-header">
                    <Link to="/settings" className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </Link>Change Password
                </span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto col-11">
                <Form onSubmit={handleFormSubmit} className="details-form p-5" noValidate>
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <InputGroup size="lg">
                        <Form.Control
                            {...register('oldPassword')}
                            type={showPassword.oldPassword ? "text" : 'password'}
                            placeholder="Password"
                            className={getErrorClassName('oldPassword')}
                        />
                        <InputGroup.Text
                            onClick={() => setShowPassword({
                                ...showPassword,
                                oldPassword: !showPassword.oldPassword
                            })}
                        >
                            {showPassword.oldPassword ? <BiHide /> : <BiShow />}
                        </InputGroup.Text>
                    </InputGroup>
                    {getErrorText('oldPassword')}
                    <InputGroup size="lg" className="mt-3">
                        <Form.Control
                            {...register('password')}
                            type={showPassword.password ? "text" : 'password'}
                            placeholder="New Password"
                            className={getErrorClassName('password')}
                        />
                        <InputGroup.Text
                            onClick={() => setShowPassword({
                                ...showPassword,
                                password: !showPassword.password
                            })}
                        >
                            {showPassword.password ? <BiHide /> : <BiShow />}
                        </InputGroup.Text>
                    </InputGroup>
                    {getErrorText('password')}
                    <InputGroup size="lg" className="mt-3">
                        <Form.Control
                            {...register('confirmPassword')}
                            type={showPassword.confirmPassword ? "text" : 'password'}
                            placeholder="Confirm Password"
                            className={getErrorClassName('confirmPassword')}
                        />
                        <InputGroup.Text
                            onClick={() => setShowPassword({
                                ...showPassword,
                                confirmPassword: !showPassword.confirmPassword
                            })}
                        >
                            {showPassword.confirmPassword ? <BiHide /> : <BiShow />}
                        </InputGroup.Text>
                    </InputGroup>
                    {getErrorText('confirmPassword')}
                    <Button type="submit" className="mt-3 btn btn-success w-100">
                        {
                            loading ? (
                                <Spinner animation="border" role="status"></Spinner>
                            ) : 'Save'
                        }
                    </Button>
                </Form>
            </Col>
        </Card>
    );
} 