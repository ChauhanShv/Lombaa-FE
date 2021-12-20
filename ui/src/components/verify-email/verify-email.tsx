import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

interface VerifyEmailProps {
    token: string;
};

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ token }: VerifyEmailProps): React.ReactElement => {
    return (
        <Container className="p-5">
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>
                            <h3>Email Verification</h3>
                        </Card.Header>
                        <Form className="card-content text-center p-5 col-lg-6 mx-auto" noValidate>
                            <h4 className="mb-4">Your Email has been verified successfully</h4>
                            <Button
                                href="/"
                                target='_blank'
                                type='submit'
                                className="btn btn-lg btn-success w-100 mb-3"
                            >
                                Go to Home Page <BsFillArrowRightCircleFill />
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}