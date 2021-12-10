import React from 'react';
import { Container } from 'react-bootstrap';
import { CreatePostForm } from '../components/create-post';

export const CreatePostPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <Container>
                <CreatePostForm />
            </Container>
        </>
    );
};