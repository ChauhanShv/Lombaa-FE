import React, { useEffect, useState } from 'react';
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
import { isEmpty } from 'lodash';
import { getAPIErrorMessage } from '../../utils';
import { useAxios } from '../../services/base-service';
import { PASSWORD_REGEX } from '../../constants';
import { ChangePasswordFormFeilds, AlertType } from './types';

const schema = yup.object().shape({
    oldPassword: yup.string().required('Password is required'),
    password: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
}).required();
const successMessage: string = 'Your password has changed';

export const ChangePassword: React.FC = (): React.ReactElement => {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<ChangePasswordFormFeilds>({
        resolver: yupResolver(schema),
    });
    const [alert, setAlert] = useState<AlertType>({});
    const [{data: response, loading, error: apiError}, execute] = useAxios({
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
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Change Password</span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-5" noValidate>
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Current Password"
                        className="mb-3"
                    >
                        <Form.Control 
                            {...register('oldPassword')} 
                            type="password" 
                            placeholder="Password" 
                            className={getErrorClassName('oldPassword')}
                        />
                        {getErrorText('oldPassword')}
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="New Password"
                        className="mb-3"
                    >
                        <Form.Control 
                            {...register('password')} 
                            type="password" 
                            placeholder="Password" 
                            className={getErrorClassName('password')}
                        />
                        {getErrorText('password')}
                    </FloatingLabel>
                    <Button type="submit" className="btn btn-success w-100">
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