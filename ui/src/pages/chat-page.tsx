import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Chat } from '../components';

export const ChatPage: React.FC = (): React.ReactElement => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const getContent = () => {
        if (!isTabletOrMobile) {
            return (
                <>

                </>
            );
        }
    };

    return (
        // <Container className="p-lg-0 mt-1">
            <div className="d-flex">
                <Chat />
            </div>
        // </Container>
    );
};