import React from 'react';;
import { ListGroup, Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SideBar: React.FC = (): React.ReactElement => {
    return (
        <Card className="sidenav bg-light">
            <Card.Header className="d-flex align-items-center">
                <button className="btn btn-white">
                    <FaChevronLeft />
                </button>
                Settings
            </Card.Header>
            <ListGroup className="mb-3">
                <Link to="/settings/personal-details">
                    <ListGroup.Item className="active py-3">
                        Personal details
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/business-information">
                    <ListGroup.Item className="py-3">
                        Business information
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
            </ListGroup>

            <ListGroup>
                <Link to="/settings/personal-details">
                    <ListGroup.Item className="py-3">
                        Personal details
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/business-information">
                    <ListGroup.Item className=" py-3">
                        Business information
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/change-password">
                    <ListGroup.Item className="py-3" >
                        Change password
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/change-email">
                    <ListGroup.Item className=" py-3">
                        Change email
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/change-phone">
                    <ListGroup.Item className=" py-3">
                        Change phone number
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
                <Link to="/settings/deactivate-account">
                    <ListGroup.Item className=" py-3">
                        Deactivate account
                        <FaChevronRight />
                    </ListGroup.Item>
                </Link>
            </ListGroup>
        </Card>
    );
};