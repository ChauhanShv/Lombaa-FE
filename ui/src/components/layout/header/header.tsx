import React, { useState } from 'react';
import {
    FaBookmark,
    FaCommentDots,
    FaBell,
    FaList
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../contexts';
import { Login, Register } from '../../modals';
import './header.css';

export const Header: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const { isLoggedIn } = state;

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [registerModal, setRegisterModal] = useState<boolean>(false);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark border border-success bg-success">
                <div className="container">
                    <Link className="navbar-brand  d-none d-lg-flex" to="/">
                        <img src="/images/logo.svg" alt="Lomba" />
                    </Link>

                    <div className="input-group d-md-flex d-lg-none">
                        <input type="text" className="form-control" placeholder="Search this blog" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fa fa-search"></i>
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
                                <button className="text-white mx-2 d-none d-lg-block" onClick={() => setLoginModal(true)}>Login</button>
                                <button className="text-white mx-2 d-none d-lg-block" onClick={() => setRegisterModal(true)}>Register</button>
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
            {loginModal && (<Login show={loginModal} onClose={() => setLoginModal(false)} />)}
            {registerModal && (<Register show={registerModal} onClose={() => setRegisterModal(false)} />)}
        </>
    );
};