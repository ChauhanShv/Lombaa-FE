import React, { useState } from 'react';
import {FaBookmark, FaCommentDots, FaBell, FaList, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Navbar, Dropdown } from 'react-bootstrap';
import { Login, Register } from '../../modals';
import { useAppContext } from '../../../contexts';
import './header.css';
import logo from './logo.svg';

const HeaderComponent: React.FC = (): React.ReactElement => {
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [registerModal, setRegisterModal] = useState<boolean>(false);
    const { state } = useAppContext();
    const { session } = state;
    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-dark border border-success bg-success" sticky="top">
                <div className="container">
                    <Link className="navbar-brand  d-none d-lg-flex" to="/">
                        <img src={logo} alt="Logo" />
                    </Link>

                    <div className="input-group d-md-flex d-lg-none">
                        <input type="text" className="form-control" placeholder="Search this blog" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
            
                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav ms-auto me-sm-2 mt-2 mt-lg-0 icon-list d-none d-lg-flex align-items-center">
                            <li className="nav-item icon-item active me-3">
                                <a className="nav-link text-success" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Saved">
                                <FaBookmark />
                                </a>
                            </li>
                            <li className="nav-item icon-item me-3">
                                <a className="nav-link text-success" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Messages"><FaCommentDots /></a>
                            </li>
                            <li className="nav-item icon-item me-3">
                                <a className="nav-link text-success" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Notifications"><FaBell /> </a>
                            </li>
                            <li className="nav-item icon-item me-3">
                                <a className="nav-link text-success" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="My Ads">
                                <FaList /></a>
                            </li>
                        </ul>
                
                        {!session.isLoggedIn && (
                            <>
                                <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setLoginModal(true)}>Login</button>
                                <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setRegisterModal(true)}>Register</button>
                            </>
                        )}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0">
                                <img className="rounded-circle" width="40" height="40" src=" https://dummyimage.com/100/007bff/efefef" alt="Htmlstream" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link to="/profile" className="profile-dropdown-link">
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Link to="/settings" className="profile-dropdown-link">
                                    <Dropdown.Item>Account Settings</Dropdown.Item>
                                </Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    <a className="nav-link px-4 bg-primary rounded ms-3 text-white d-none d-lg-flex" href="#">+ Sell</a>
                </div>
            </div>
            </Navbar>
            {loginModal && (
                <Login
                    show={loginModal}
                    openRegister={setRegisterModal}
                    onClose={() => setLoginModal(false)}
                />
            )}
            {registerModal && (
                <Register
                    show={registerModal}
                    openLogin={setLoginModal}
                    onClose={() => setRegisterModal(false)}
                />
            )}
        </>
    );
};

export const Header = React.memo(HeaderComponent);