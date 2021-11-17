import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useAppContext, ActionTypes } from '../../contexts';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

import './profile.css';

export const ProfileHeaderCard: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();

    return (
        <Container className="p-4">
            <Row className="shadow border rounded py-4" >
                <Col md={6}>
                    <Row>
                        <Col md={12} className="d-flex">
                            <div className="ps-2">
                                <Image
                                    src={state?.user?.metaData?.profilePicture?.absolute_path || "/images/avatar.svg"}
                                    width="100"
                                    roundedCircle
                                />
                            </div>
                            <div className="px-2">
                                <h3 className="user-title px-3 text-success m-0">
                                    {state?.user?.metaData?.name} {'  '}
                                    {state?.user?.metaData?.profileVerificationScore >= 60 ? <FaCheckCircle className="fs-5 text-info" /> : ''}
                                </h3>
                                <p className="px-3 text-muted mb-2"><strong>Business Account</strong></p>
                                <p className="px-3"><Button variant="link" className="p-0">Edit Profile</Button>&nbsp;|&nbsp;
                                <Button variant="link" className="p-0">Settings</Button>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-4 pt-md-0 text-muted px-4">
                    <p><FaEnvelope className="me-2" />{state?.user?.metaData?.email}</p>
                    <p><FaMapMarkerAlt className="me-2" />{state?.user?.metaData?.location}</p>
                    <p><FaClock className="me-2" />Joined 1y 2m</p>
                </Col>
            </Row>
        </Container>
    );
}
