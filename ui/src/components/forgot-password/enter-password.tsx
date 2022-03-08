import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
} from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isEmpty } from 'lodash';
import { useQuery } from '../../services';
import { useAxios } from '../../services';
import { PASSWORD_REGEX } from '../../constants';
import { getAPIErrorMessage } from '../../utils';

const schema = yup.object().shape({
    newPassword: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
}).required();
interface AlertType {
    variant?: string;
    message?: string;
};

export const EnterPassword: React.FC = () => {
    const [alert, setAlert] = useState<AlertType>({});
    const query = useQuery();
    const token = query.get("token");
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/password/reset',
        method: 'PUT',
    });
    useEffect(() => {
        if (response?.success) {
            reset();
            setAlert({
                variant: 'success',
                message: response?.message || 'Email to reset password is sent',
            });
        }
    }, [response]);
    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            execute({
                data: {
                    token,
                    newPassword: values.newPassword,
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
        <Container className="py-5">
            <Row>
                <Col md={12}>
                    <Card>
                        {(apiError || alert.message) && (
                            <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                                {alert.message || getAPIErrorMessage(apiError)}
                            </Alert>
                        )}
                        <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                            <span className="d-flex align-items-center my-lg-1 settings-font-header">
                                <button className="btn btn-white d-md-block d-lg-none">
                                    <FaChevronLeft />
                                </button>
                                Change Password
                            </span>
                        </Card.Header>
                        <Form onSubmit={handleFormSubmit} className="card-content text-center col-lg-6 mx-auto p-3" noValidate>
                            <h6 className="mt-4 mb-4">Enter your email to get the forgot password link</h6>
                            <FloatingLabel
                                label="New password"
                                className="mb-3"
                            >
                                <Form.Control
                                    {...register('newPassword')}
                                    type="password"
                                    placeholder="New password"
                                    className={getErrorClassName('newPassword')}
                                />
                                {getErrorText('newPassword')}
                            </FloatingLabel>
                            <FloatingLabel
                                label="Re-type new password"
                                className="mb-3"
                            >
                                <Form.Control
                                    {...register('confirmPassword')}
                                    type="password"
                                    placeholder="Re-type new password"
                                    className={getErrorClassName('confirmPassword')}
                                />
                                {getErrorText('confirmPassword')}
                            </FloatingLabel>
                            <Button type='submit' className="btn btn-success w-100 mb-3">
                                {
                                    loading ? (
                                        <Spinner animation="border" role="status"></Spinner>
                                    ) : 'Submit'
                                }
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};