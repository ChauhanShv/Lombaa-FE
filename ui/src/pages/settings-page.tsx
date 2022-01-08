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
    PersonalDetails,
    ChangeEmail,
    ChangePassword,
    ChangePhone,
    DeactivateAccount
} from '../components';

export const SettingsPage: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const getPage = (): React.ReactElement => {
        switch (page) {
            case 'personal-details':
                return <PersonalDetails />;
            case 'change-email':
                return <ChangeEmail />;
            case 'change-password':
                return <ChangePassword />;
            case 'change-phone':
                return <ChangePhone />;
            case 'deactivate-account':
                return <DeactivateAccount />;
            default:
                return <PersonalDetails />;
        };
    };

    const getContent = () => {
        if (!isTabletOrMobile) {
            return (
                <>
                    <Col lg={4}>
                        <SideBar />
                    </Col>
                    <Col lg={8}>
                        {getPage()}
                    </Col>
                </>
            );
        }

        if (!page) {
            return (
                <Col lg={4}>
                    <SideBar />
                </Col>
            );
        }

        if (page) {
            return (
                <Col lg={8}>
                    {getPage()}
                </Col>
            );
        }
    };
    return (
        <>
            <Container className="p-md-5 pt-4">
                <Row>
                    {getContent()}
                </Row>
            </Container>
        </>
    )
};