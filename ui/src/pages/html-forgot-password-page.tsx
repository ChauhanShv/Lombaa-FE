import React, { useState } from 'react';
import { useAppContext, ActionTypes } from '../contexts';

import { Container, Row, Col, ListGroup, Card, Form, FloatingLabel, Image, Button } from 'react-bootstrap';

import { FaKey } from 'react-icons/fa';

export const ForgotPage: React.FC = () => {
    const { dispatch } = useAppContext();
    const [user, setUser] = useState<string>('');
    const doLogin = () => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: {
                user,
            },
        });
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
                            <div className="card-content text-center p-5 col-md-6 mx-auto">
                                <h4 className="mb-4">Enter your email or phone number</h4>
                                <FloatingLabel controlId="floatingInput" label="Email or Phone" className="mb-3">
                                    <Form.Control type="email" placeholder="Email or Phone" />
                                </FloatingLabel>
                                <button className="btn btn-lg btn-success w-100 mb-3">Submit</button>
                                <button className="link btn ">Cancel</button>
                            </div>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};