import React, { useState, useEffect } from 'react';
import {FaBookmark, FaCommentDots, FaBell, FaList, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAxios } from '../../../services/base-service';
import { useAppContext, ActionTypes } from '../../../contexts';
import { Login, Register } from '../../modals';
import './header.css';
import logo from './logo.svg';

export const Header: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const { isLoggedIn } = state;
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [registerModal, setRegisterModal] = useState<boolean>(false);
    const [{ data: response }, refetch] = useAxios({
        url: '/user/isActive',
        method: 'GET',
    });

    useEffect(() => {
        if (isLoggedIn) {
            refetch();
        }
    }, []);
    useEffect(() => {
        if (response?.success) {
            dispatch({
                type: ActionTypes.IS_ACTIVE,
                payload: {
                    user: response?.response?.user,
                }
            });
        }
    }, [response]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark border border-success bg-success">
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
                
                        {!isLoggedIn && (
                            <>
                                <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setLoginModal(true)}>Login</button>
                                <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setRegisterModal(true)}>Register</button>
                            </>
                        )}
                        <div className="nav-item dropdown">
                            <a className="nav-link  p-0 rounded-circle border " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle" width="32" height="32" src=" https://dummyimage.com/100/007bff/efefef" alt="Htmlstream" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Account Settings</a>
                    <a className="dropdown-item" href="#">Newsletter</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Sign Out</a>
                    </div>
                </div>
                    <a className="nav-link px-4 bg-primary rounded ms-3 text-white d-none d-lg-flex" href="#">+ Sell</a>
                </div>
            </div>
            </nav>
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