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
    DeactivateAccount,
    MyPackages
} from '../components';

export const SettingsPage: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
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
            case 'select-package':
                return <MyPackages />
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
                <Container>
                    <Col lg={6}>
                        <SideBar />
                    </Col>
                </Container>

            );
        } else {
            return (
                <Col lg={12}>
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