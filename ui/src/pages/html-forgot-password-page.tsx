import React, { useState, useEffect } from 'react';
import { useAppContext, ActionTypes } from '../contexts';
import { Container, Row, Col, ListGroup, Card, Form, FloatingLabel, Image, Button, Alert } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAxios } from '../services/base-service';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is not valid'),
}).required();

export const ForgotPage: React.FC = () => {
    const { register, handleSubmit, reset, getValues, formState: { isValid, errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { dispatch } = useAppContext();
    const [user, setUser] = useState<string>('');
    const [forgotPasswordSuccessAlert, setForgotPasswordSuccessAlert] = useState<boolean>(false);
    const [forgotPasswordFailureAlert, setForgotPasswordFailureAlert] = useState<boolean>(false);

    const [{ data: forgotPasswordResponse, loading, error: forgotApiError }, executeForgotPassword] = useAxios({
        url: '/user/password/forget',
        method: 'POST',
    });

    useEffect(() => {
        if(forgotPasswordResponse?.success) {
            setForgotPasswordSuccessAlert(true);
        }
    }, [forgotPasswordResponse]);

    useEffect(() => {
        if(forgotApiError) {
            setForgotPasswordFailureAlert(true);
        }
    }, [forgotApiError]);

    const doLogin = () => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: {
                user,
            },
        });
    };

    const onSubmit = (values: any) => {
        console.log(isValid, errors, 'Valid::::');
        // if (isFormValid(values)) {
            executeForgotPassword({
                data: {
                    ...values,
                }
            });
        // }
        reset();
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };

    const ForgotPasswordSuccessAlert: React.FC = (): React.ReactElement => {
        return(
            <Alert variant="success" onClose={() => setForgotPasswordSuccessAlert(false)} dismissible>
                {forgotPasswordResponse?.message}
            </Alert>
        );
    };

    const ForgotPasswordFailureAlert: React.FC = (): React.ReactElement => {
        return(
            <Alert variant="danger" onClose={() => setForgotPasswordFailureAlert(false)} dismissible>
                Something Went Wrong! 
            </Alert>
        );
    };

    return (
        <div>
            <Container className="p-5">
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                                <h1><FaKey className="text-success" /> Forgot Password?</h1>
                            </Card.Header>
                            <Form onSubmit={handleFormSubmit} className="card-content text-center p-5 col-md-6 mx-auto">
                                {forgotPasswordSuccessAlert && <ForgotPasswordSuccessAlert />}
                                {forgotPasswordFailureAlert && <ForgotPasswordFailureAlert />}
                                <h4 className="mb-4">Enter your email or phone number</h4>
                                <FloatingLabel controlId="floatingInput" label="Email or Phone" className="mb-3">
                                    <Form.Control type="email" placeholder="Email or Phone" {...register('email')} />
                                </FloatingLabel>
                                <button type='submit' className="btn btn-lg btn-success w-100 mb-3">Submit</button>
                                <button className="link btn ">Cancel</button>
                            </Form>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};