import React from 'react';
import { Container } from 'react-bootstrap';
import { Packages } from '../components';

export const PackagesPage: React.FC = (): React.ReactElement => {
    return (
        <Container>
            <Packages />
        </Container>
    );
};