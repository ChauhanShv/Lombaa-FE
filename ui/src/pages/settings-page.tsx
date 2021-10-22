import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { SideBar, PersonalPetails } from '../components';

export const SettingsPage: React.FC = () => {
    return (
        <div>
            <Container className="p-5">
                <Row>
                    <Col md={4}>
                        <SideBar />
                    </Col>
                    <Col md={8}>
                        <PersonalPetails />
                    </Col>
                </Row>
            </Container>

        </div>
    )
};