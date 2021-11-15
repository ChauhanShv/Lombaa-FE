import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export const ProfileVerificationCard: React.FC = (): React.ReactElement => {
    return (
        <Container className="p-4">
            <h2>Verification</h2>
            <Row className="shadow border rounded py-4">
                <Col md={12}>
                    <Col className="text-center p-3">
                        Users who are verified are twice as likely to sell. <br />
                        Verify your identity to make those sales!
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}
