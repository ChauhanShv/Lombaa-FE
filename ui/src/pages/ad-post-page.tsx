import React from 'react';
import { Container } from 'react-bootstrap';
import { PostAdForm } from '../components/post-ad';

export const AdPostPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <Container>
                <PostAdForm />
            </Container>
        </>
    );
};