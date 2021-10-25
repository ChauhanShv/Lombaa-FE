import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
    SideBar,
    PersonalPetails,
    ChangeEmail,
    ChangePassword,
    ChangePhone,
    DeactivateAccount
} from '../components';

export const SettingsPage: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const getPage = (): React.ReactElement => {
        switch(page) {
            case 'personal-details':
                return <PersonalPetails />;
            case 'change-email':
                return <ChangeEmail />;
            case 'change-password':
                return <ChangePassword />;
            case 'change-phone':
                return <ChangePhone />;
            case 'deactivate-account':
                return <DeactivateAccount />;
            default:
                return <PersonalPetails />;
        };
    };
    return (
        <>
            <Container className="p-5">
                <Row>
                    <Col md={4}>
                        <SideBar />
                    </Col>
                    <Col md={8}>
                        {getPage()}
                    </Col>
                </Row>
            </Container>

        </>
    )
};