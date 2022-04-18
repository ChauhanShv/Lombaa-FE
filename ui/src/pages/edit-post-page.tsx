import React from 'react';
import { Container } from 'react-bootstrap';
import { EditPostContainer } from '../components/edit-post';

export const EditPostPage: React.FC = (): React.ReactElement => {
    return (
        <Container>
            <EditPostContainer />
        </Container>
    );
};