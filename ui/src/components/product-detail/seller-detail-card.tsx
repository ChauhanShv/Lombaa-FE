import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { SellerDetailsCardProps } from './types';

export const SellerDetailCard: React.FC<SellerDetailsCardProps> = ({
    user,
    onChatClicked,
}: SellerDetailsCardProps): React.ReactElement => {

    const getAccountType = () => user?.accountType === 'standard' ? 'Standard Account' : 'Business Account';
    const getAccountName = () => user?.accountType === 'standard' ? user?.name : user?.businessName;
    const getLocation = () => user?.location ? `${user.location.city.name}, ${user.location.region.name}` : 'Location';

    return (
        <Container className="p-4">
            <Row className="shadow border rounded py-4 user-card" >
                <Col md={6}>
                    <Row>
                        <Col md={12} className="d-flex">
                            <div className="ps-2">
                                <Image
                                    src={user?.profilePicture?.url || "/images/user-circle.svg"}
                                    width="100"
                                    height="100"
                                    roundedCircle
                                />
                            </div>
                            <div className="px-2">
                                <h3 className="user-title px-3 text-success m-0">
                                    {getAccountName()} {'  '}
                                    {(user?.profileVerificationScore && user?.profileVerificationScore >= 60) ? <FaCheckCircle className="fs-5 text-info" /> : ''}
                                </h3>
                                <p className="px-3 text-muted mb-2">
                                    <strong>{getAccountType()}</strong>
                                </p>
                                <p className="px-3">
                                    <Link to="/settings/personal-details" className="p-0">View Profile</Link>
                                    {' | '}
                                    <Link to="#" className="p-0" onClick={onChatClicked}>Chat</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-2 pt-md-0 text-muted px-4">
                    <p><FaEnvelope className="me-2" />{user?.email}</p>
                    <p><FaMapMarkerAlt className="me-2" />{getLocation()}</p>
                    <p><FaClock className="me-2" />Joined on {moment(user?.memberSince).format('LL')}</p>
                </Col>
            </Row>
        </Container>
    );
}