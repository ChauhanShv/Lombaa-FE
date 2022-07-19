import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaCheckCircle,
    FaMobile
} from 'react-icons/fa';
import { useAppContext } from '../../contexts';
import { SellerDetailsCardProps } from './types';

export const SellerDetailCard: React.FC<SellerDetailsCardProps> = ({
    user,
    userId,
}: SellerDetailsCardProps): React.ReactElement => {

    const { state } = useAppContext();
    const currentUserId = state?.user?.metaData?.id;
    const getAccountType = () => user?.accountType === 'standard' ? 'Standard Account' : 'Business Account';
    const getAccountName = () => user?.accountType === 'standard' ? user?.name : user?.businessName;
    const getLocation = () => user?.location ? `${user.location.city.name}, ${user.location.region.name}` : 'Location';
    const getContactNumber = () => user?.showPhoneNumberConsent ? user?.phoneNumber : '';

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
                            <div className="px-3">
                                <Link
                                    to={userId === currentUserId ? '/profile' : `/profile/${userId}`}
                                    className="d-inline-flex user-title-seller text-success m-0"
                                >
                                    <h4 className='fs-5'>
                                        {getAccountName()}{'  '}
                                    </h4>
                                    <div>
                                        {(user?.profileVerificationScore && user?.profileVerificationScore >= 60) ?
                                            <FaCheckCircle className="fs-5 text-info" /> : ''
                                        }
                                    </div>
                                </Link>
                                <p className="text-muted mb-2">
                                    <strong>{getAccountType()}</strong>
                                </p>
                                <p className="px-3 d-none">
                                    <Link
                                        to={userId === currentUserId ? '/profile' : `/profile/${userId}`}
                                        className="p-0"
                                    >
                                        View Profile
                                    </Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-2 pt-md-0 text-muted px-4">
                    <p>
                        <FaEnvelope className="me-2" />
                        {user?.email}
                    </p>
                    <p>
                        <FaMapMarkerAlt className="me-2" />
                        {getLocation()}
                    </p>
                    {user?.showPhoneNumberConsent && (
                        <p>
                            <FaMobile className="me-2" />
                            {getContactNumber()}
                        </p>
                    )}
                    <p>
                        <FaClock className="me-2" />
                        Joined on {moment(user?.createdAt).format('LL')}
                    </p>
                </Col>
            </Row>
        </Container>
    );
}