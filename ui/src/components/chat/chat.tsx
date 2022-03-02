import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { ContactList, ChatContent } from '.';
import './chat-page.css';

export const Chat: React.FC = (): React.ReactElement => {
    const { chatId } = useParams<{ chatId: string }>();

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
    const getContent = () => {
        if (!isTabletOrMobile) {
            return (
                <>
                    <Col lg={4} className="p-0">
                        <ContactList />
                    </Col>
                    <Col lg={8} className="p-0">
                        <ChatContent />
                    </Col>
                </>
            );
        }

        if (!chatId) {
            return (
                <Col lg={4} className="p-0">
                    <ContactList />
                </Col>
            );
        }

        if (chatId) {
            return (
                <Col lg={8} className="p-0">
                    <ChatContent />
                </Col>
            );
        }
    };

    return (
        <Container className="mt-3 card">
            <Row>
                {getContent()}
            </Row>
        </Container>
    );
}
