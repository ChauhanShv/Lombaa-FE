import React from 'react';
import { Typography } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

export const PaymentSuccessfulPage: React.FC = (): React.ReactElement => {
    return (
        <Container className="text-center mb-5">
            <img
                className="py-4"
                src="/images/payment-success-icon.png"
                alt="payment-success-icon"
                width="20%"
                height="20%"
            />
            <Typography variant='h4'>Payment Successful</Typography>
            <div className="shadow text-left p-4 mt-3">
                <Row className="my-1 text-left">
                    <Col md={5}>
                        <p>Transaction Id:</p>
                    </Col>
                    <Col md={7}>
                        <p className="text-muted">
                            1739-4932-4237934
                        </p>
                    </Col>
                </Row>
                <Row className="my-1 text-left">
                    <Col md={5}>
                        <p>Package Id:</p>
                    </Col>
                    <Col md={7}>
                        <p className="text-muted">
                            9082-4122-5628934
                        </p>
                    </Col>
                </Row>
                <Row className="my-1 text-left">
                    <Col md={5}>
                        <p>Name:</p>
                    </Col>
                    <Col md={7}>
                        <p className="text-muted">
                            Booster package
                        </p>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};