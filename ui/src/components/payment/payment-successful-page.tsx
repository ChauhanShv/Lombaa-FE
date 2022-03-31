import React from 'react';
import { Container } from 'react-bootstrap';

export const PaymentSuccessfulPage: React.FC = (): React.ReactElement => {
    return (
        <Container className="text-center">
            <img
                src="/images/payment-success-icon.png"
                alt="payment-success-icon"
                width="40%"
                height="40%"
            />
        </Container>
    );
};