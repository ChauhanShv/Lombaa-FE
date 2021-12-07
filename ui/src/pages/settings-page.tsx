import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
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

    const getContent = () => {
        if (!isTabletOrMobile) {
            return (
                <>
                    <Col md={4}>
                        <SideBar />
                    </Col>
                    <Col md={8}>
                        {getPage()}
                    </Col>
                </>
            );
        }

        if (!page) {
            return (
                <Col md={4}>
                    <SideBar />
                </Col>
            );
        }

        if (page) {
            return (
                <Col md={8}>
                    {getPage()}
                </Col>
            );
        }
    };
    return (
        <>
            <Container className="p-5">
                <Row>
                    {getContent()}
                </Row>
            </Container>

        </>
    )
};