import React from 'react';
import { Container } from 'react-bootstrap';
import { CreatePostContainer } from '../components/create-post';

export const CreatePostPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <Container>
                <CreatePostContainer />
            </Container>
        </>
    );
};