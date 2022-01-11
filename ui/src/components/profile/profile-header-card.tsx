import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext, ActionTypes } from '../../contexts';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

import './profile.css';

export const ProfileHeaderCard: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const userData = state?.user?.metaData;

    const getAccountType = () => userData?.accountType === 'standard' ? 'Standard Account' : 'Business Account';
    const getAccountName = () => userData?.accountType === 'standard' ? userData?.name : userData?.businessName;

    const getLocation = userData?.location ? `${userData?.location?.city?.name}, ${userData?.location?.region?.name}` : 'Location';

    return (
        <Container className="p-4">
            <Row className="shadow border rounded py-4 user-card" >
                <Col md={6}>
                    <Row>
                        <Col md={12} className="d-flex">
                            <div className="ps-2">
                                <Image
                                    src={userData?.profilePicture?.url || "/images/user-circle.svg"}
                                    width="100"
                                    height="100"
                                    roundedCircle
                                />
                            </div>
                            <div className="px-2">
                                <h3 className="user-title px-3 text-success m-0">
                                    {getAccountName()} {'  '}
                                    {userData?.profileVerificationScore >= 60 ? <FaCheckCircle className="fs-5 text-info" /> : ''}
                                </h3>
                                <p className="px-3 text-muted mb-2">
                                    <strong>{getAccountType()}</strong>
                                </p>
                                <p className="px-3">
                                    <Link to="/settings/personal-details" className="p-0">Edit Profile</Link>
                                    {' | '}
                                    <Link to="/settings" className="p-0">Settings</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-2 pt-md-0 text-muted px-4">
                    <p><FaEnvelope className="me-2" />{userData?.email}</p>
                    <p><FaMapMarkerAlt className="me-2" />{getLocation}</p>
                    <p><FaClock className="me-2" />Joined on {moment(userData?.memberSince).format('LL')}</p>
                </Col>
            </Row>
        </Container>
    );
}
