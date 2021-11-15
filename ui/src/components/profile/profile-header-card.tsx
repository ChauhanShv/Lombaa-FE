import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useAppContext, ActionTypes } from '../../contexts';
import { FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const ProfileHeaderCard: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    
    return (
        <Container className="p-4">
            <Row className="shadow border rounded py-4" >
                <Col md={6}>
                    <Row>
                        <Col md={12} className="d-flex">
                            <div className="ps-2">
                                <Image src="/images/avatar.svg" roundedCircle />
                            </div>
                            <div className="px-2">
                                <h2 className="px-3 text-success">{state?.user?.metaData?.name}</h2>
                                <Button variant="link">Edit Profile</Button> |
                                <Button variant="link">Settings</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-4 pt-md-0">
                    <p><FaEnvelope className="me-2" />{state?.user?.metaData?.email}</p>
                    <p><FaMapMarkerAlt className="me-2" />{state?.user?.metaData?.location}</p>
                    <p><FaClock className="me-2" />Joined 1y 2m</p>
                </Col>
            </Row>
        </Container>
    );
}
