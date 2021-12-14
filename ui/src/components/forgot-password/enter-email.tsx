import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FloatingLabel,
    Button,
    Spinner,
    Alert
} from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isEmpty } from 'lodash';
import { useAxios } from '../../services';
import { getAPIErrorMessage } from '../../utils';

export interface FormFields {
    email: string;
};
export interface AlertType {
    variant?: string;
    message?: string;
};
const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
}).required();

export const EnterEmail: React.FC = () => {
    const [alert, setAlert] = useState<AlertType>({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });

    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/password/forget',
        method: 'POST',
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
        <Container className="p-5">
            <Row>
                <Col md={12}>
                    <Card>
                        {(apiError || alert.message) && (
                            <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                                {alert.message || getAPIErrorMessage(apiError)}
                            </Alert>
                        )}
                        <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                            <h1><FaKey className="text-success" /> Forgot Password?</h1>
                        </Card.Header>
                        <Form onSubmit={handleFormSubmit} className="card-content text-center p-5 col-md-6 mx-auto" noValidate>
                           <h4 className="mb-4">Enter your email to get the forgot password link</h4>
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <Form.Control
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    className={getErrorClassName('email')}
                                />
                                {getErrorText('email')}
                            </FloatingLabel>
                            <Button type='submit' className="btn btn-lg btn-success w-100 mb-3">
                                {
                                    loading ? (
                                        <Spinner animation="border" role="status"></Spinner>
                                    ) : 'Submit'
                                }
                            </Button>
                            <button className="link btn ">Cancel</button>
                        </Form>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
};