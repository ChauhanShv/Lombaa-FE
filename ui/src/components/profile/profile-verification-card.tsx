import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ProfileVerificationStepper } from './profile-verification-stepper';

export const ProfileVerificationCard: React.FC = (): React.ReactElement => {
    return (
        <Container className="p-4">
            <h2 className="fwsemi text-secondary">Verification</h2>
            <Row className="shadow border rounded pt-4">
                <Col md={12}>
                    <Col className="text-center p-3">
                        <ProfileVerificationStepper />
                    </Col>
                    <Col className="text-center p-3 text-muted">
                        Users who are verified are twice as likely to sell. <br />
                        Verify your identity to make those sales!
                    </Col>
                </Col>
                <Col md={12} className="justify-content-end border-top align-items-center d-flex">
                    <Link to="" className="m-0 p-3 text-dark fs-5">Verify Now <FaChevronRight /></Link>
                </Col>
            </Row>
        </Container>
    );
}
