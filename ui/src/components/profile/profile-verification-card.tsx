import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ProfileVerificationStepper } from './profile-verification-stepper';
import { useHistory } from 'react-router-dom';

export const ProfileVerificationCard: React.FC = (): React.ReactElement => {
    const navigate = useHistory();
    const [nonVerifiedStep, setNonVerifiedStep] = useState<string>('');

    const getNonVerifiedStepLabel = (nonVerifiedStepLabel: string) => {
        setNonVerifiedStep(nonVerifiedStepLabel);
    };

    const handleVerifyNowClick = () => {
        switch (nonVerifiedStep) {
            case 'Google':
            case 'Facebook':
            case 'Photo':
                navigate.push('/settings');
                break;
            case 'Phone':
                navigate.push('/change-phone');
                break;
            case 'Email':
                navigate.push('/change-email');
                break;
        }
    };

    return (
        <Container className="p-4">
            <h2 className="fwsemi text-secondary">Verification</h2>
            <Row className="shadow border rounded pt-4">
                <Col md={12}>
                    <Col className="text-center p-md-3">
                        <ProfileVerificationStepper onVerify={getNonVerifiedStepLabel} />
                    </Col>
                    <Col className="text-center p-3 text-muted">
                        Users who are verified are twice as likely to sell. <br />
                        Verify your identity to make those sales!
                    </Col>
                </Col>
                <Col md={12} className="justify-content-end border-top align-items-center d-flex">
                    <Button onClick={handleVerifyNowClick} className="m-0 p-3 text-dark bg-white border-white">Verify Now <FaChevronRight /></Button>
                </Col>
            </Row>
        </Container>
    );
}
