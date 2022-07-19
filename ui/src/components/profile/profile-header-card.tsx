import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaMobile } from 'react-icons/fa';
import { ProfileHeaderCardProps } from './types';
import './profile.css';

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
    otherUser,
}): React.ReactElement => {
    const { state } = useAppContext();
    const { userId } = useParams<{ userId: string }>();
    const userData = state.user?.metaData;

    const getAccountType = () => {
        if (userId) {
            return otherUser?.accountType === 'standard' ? 'Standard Account' : 'Business Account';
        }
        return userData?.accountType === 'standard' ? 'Standard Account' : 'Business Account';
    }

    const getAccountName = () => {
        if (userId) {
            return otherUser?.accountType === 'standard' ? otherUser?.name : otherUser?.businessName;
        }
        return userData?.accountType === 'standard' ? userData?.name : userData?.businessName;
    }

    const getLocation = () => {
        if (userId) {
            return otherUser?.location ? `${otherUser?.location?.city?.name}, ${otherUser?.location?.region?.name}` : 'Location';
        }
        return userData?.location ? `${userData?.location?.city?.name}, ${userData?.location?.region?.name}` : 'Location';
    }

    return (
        <Container className="p-4">
            <Row className="shadow border rounded py-4 user-card" >
                <Col md={6}>
                    <Row>
                        <Col md={12} className="d-flex">
                            <div className="ps-2">
                                <Image
                                    src={userId ?
                                        otherUser?.profilePicture?.url || "/images/user-circle.svg" :
                                        userData?.profilePicture?.url || "/images/user-circle.svg"
                                    }
                                    width="100"
                                    height="100"
                                    roundedCircle
                                />
                            </div>
                            <div className="px-2">
                                <h3 className="user-title px-3 text-success m-0">
                                    {getAccountName()} {'  '}
                                    {userId ? (
                                        <>
                                            {Number(otherUser?.profileVerificationScore) >= 60 ?
                                                <FaCheckCircle className="fs-5 text-info" /> : ''
                                            }
                                        </>
                                    ) : (
                                        <>
                                            {userData?.profileVerificationScore >= 60 ?
                                                <FaCheckCircle className="fs-5 text-info" /> : ''
                                            }
                                        </>
                                    )}
                                </h3>
                                <p className="px-3 text-muted mb-2">
                                    <strong>{getAccountType()}</strong>
                                </p>
                                {!userId && (
                                    <p className="px-3">
                                        <Link to="/settings/personal-details" className="p-0">Edit Profile</Link>
                                        {' | '}
                                        <Link to="/settings" className="p-0">Settings</Link>
                                    </p>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="pt-2 pt-md-0 text-muted px-4">
                    <p>
                        <FaEnvelope className="me-2" />
                        {userId ? otherUser?.email : userData?.email}
                    </p>
                    <p>
                        <FaMapMarkerAlt className="me-2" />
                        {getLocation()}
                    </p>
                    <p>
                        <FaClock className="me-2" />
                        Joined on {' '}
                        {userId ?
                            moment(otherUser?.memberSince).format('LL') :
                            moment(userData?.memberSince).format('LL')
                        }
                    </p>
                    {userId && otherUser?.showPhoneNumberConsent && (
                        <p>
                            <FaMobile className="me-2" />
                            {otherUser?.phoneNumber}
                        </p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
