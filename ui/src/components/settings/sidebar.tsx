import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../contexts';
import './settings.css';

export const SideBar: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const location = useLocation();
    const userData = state?.user?.metaData;

    return (
        <Card className="sidenav bg-light position-sticky">
            <Card.Header className="d-flex align-items-center py-3 font-weight-bold">
                <NavLink to="/" activeClassName="">
                    <button className="btn">
                        <FaChevronLeft />
                    </button>
                </NavLink>
                Settings
            </Card.Header>
            <ListGroup>
                {userData?.accountType === 'standard' ? (
                    <NavLink className="side-cta" to="/settings/personal-details" activeClassName="active">
                        <ListGroup.Item className="py-3" active={location.pathname === '/settings'}>
                            Personal details
                            <FaChevronRight />
                        </ListGroup.Item>
                    </NavLink>
                ) : (
                    <NavLink className="side-cta" to="/settings/business-information">
                        <ListGroup.Item className="py-3" active={location.pathname === '/settings'}>
                            Business information
                            <FaChevronRight />
                        </ListGroup.Item>
                    </NavLink>
                )}
            </ListGroup>
            <ListGroup>
                <NavLink className="side-cta" to="/settings/change-password">
                    <ListGroup.Item className="py-3" >
                        Change password
                        <FaChevronRight />
                    </ListGroup.Item>
                </NavLink>
                <NavLink className="side-cta" to="/settings/change-email">
                    <ListGroup.Item className="py-3">
                        Change email
                        <FaChevronRight />
                    </ListGroup.Item>
                </NavLink>
                <NavLink className="side-cta" to="/settings/change-phone">
                    <ListGroup.Item className="py-3">
                        Change phone number
                        <FaChevronRight />
                    </ListGroup.Item>
                </NavLink>
                <NavLink className="side-cta" to="/settings/select-package">
                    <ListGroup.Item className="py-3">
                        My Packages
                        <FaChevronRight />
                    </ListGroup.Item>
                </NavLink>
                <NavLink className="side-cta" to="/settings/deactivate-account">
                    <ListGroup.Item className="py-3">
                        Deactivate account
                        <FaChevronRight />
                    </ListGroup.Item>
                </NavLink>
            </ListGroup>
        </Card>
    );
};