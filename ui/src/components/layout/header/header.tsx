import React, { useEffect, useState } from 'react';
import {
    FaCommentDots,
    FaBell,
    FaList,
    FaSearch,
    FaHeart,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Container,
    Navbar,
    Button,
    InputGroup,
    FormControl,
    Dropdown
} from 'react-bootstrap';
import { debounce } from 'lodash';
import { Autocomplete } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Login, Register } from '../../modals';
import { useAppContext, ActionTypes } from '../../../contexts';
import { CategoryPopover, MobileNav, HeaderDropdown } from '.';
import { useAxios } from '../../../services';
import { SearchFieldValue } from './types';
import './header.css';

const HeaderComponent: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const { state, dispatch } = useAppContext();
    const { session, user } = state;
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [registerModal, setRegisterModal] = useState<boolean>(false);
    const [searchFields, setSearchFields] = useState<SearchFieldValue[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>();

    const [{ data: searchResponse, loading: searchLoading }, searchExecute] = useAxios({
        url: `/product/category?search=${searchValue}`,
        method: 'GET',
    });

    useEffect(() => {
        const showLogin = location.pathname === '/login';
        if (showLogin && !state.session.isLoggedIn) {
            setLoginModal(true);
        }
    }, [location, state.session.isLoggedIn]);

    useEffect(() => {
        if (searchResponse?.success) {
            setSearchFields(searchResponse?.products);
        }
    }, [searchResponse]);

    const handleSearchInputChange = (event: any) => {
        setSearchValue(event.target.value);
        const executeSearchApi = debounce(() => {
            searchExecute({
                url: `/product/category?search=${event.target.value}`,
            });
        }, 1000);
        executeSearchApi();
    }
    const handleSearchClick = () => {
        searchExecute({});
    }

    return (
        <>
            <MobileNav />
            <Navbar sticky="top" className="d-none d-lg-flex navbar navbar-expand-lg navbar-dark shadow bg-success flex-wrap justify-content-between p-0">
                <Navbar className="w-100 navbar navbar-light bg-dark p-0 header-cat">
                    <Container className="align-items-end">
                        <CategoryPopover />
                        <div className="d-flex align-items-center ms-auto me-0">
                            {session.isLoggedIn && (
                                <ul className="navbar-nav ms-auto me-sm-2 mt-2 mt-lg-0 icon-list d-none d-lg-flex align-items-center">
                                    <li className="nav-item icon-item active me-3">
                                        <Link className="nav-link" to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Saved">
                                            <FaHeart />
                                        </Link>
                                    </li>
                                    <li className="nav-item icon-item me-3">
                                        <Link className="nav-link" to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Messages"><FaCommentDots /></Link>
                                    </li>
                                    <li className="nav-item icon-item me-3">
                                        <Link className="nav-link" to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Notifications"><FaBell /></Link>
                                    </li>
                                    <li className="nav-item icon-item me-3">
                                        <Link className="nav-link" to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="My Ads">
                                            <FaList /></Link>
                                    </li>
                                </ul>
                            )}

                            {!session.isLoggedIn && (
                                <>
                                    <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setLoginModal(true)}>Login</button>
                                    <button className="btn text-white mx-2 px-0 d-none d-lg-block" onClick={() => setRegisterModal(true)}>Register</button>
                                </>
                            )}
                            {session.isLoggedIn && (
                                <HeaderDropdown />
                            )}
                        </div>
                    </Container>
                </Navbar>
                <Navbar className="w-100 navbar navbar-expand-lg navbar-dark bg-white brand-nav">
                    <div className="container">
                        <Link className="navbar-brand  d-none d-lg-flex" to="/">
                            <svg width="149" height="42" viewBox="0 0 149 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="gray" d="M54.704 13.912H58.448V27.952H66.08V31H54.704V13.912ZM73.8189 31.192C72.5229 31.192 71.3869 30.936 70.4109 30.424C69.4509 29.912 68.7069 29.176 68.1789 28.216C67.6669 27.256 67.4109 26.136 67.4109 24.856C67.4109 23.576 67.6669 22.456 68.1789 21.496C68.7069 20.536 69.4509 19.8 70.4109 19.288C71.3869 18.776 72.5229 18.52 73.8189 18.52C75.0989 18.52 76.2189 18.776 77.1789 19.288C78.1389 19.8 78.8749 20.536 79.3869 21.496C79.9149 22.456 80.1789 23.576 80.1789 24.856C80.1789 26.136 79.9149 27.256 79.3869 28.216C78.8749 29.176 78.1389 29.912 77.1789 30.424C76.2189 30.936 75.0989 31.192 73.8189 31.192ZM73.8189 28.432C74.7149 28.432 75.3949 28.136 75.8589 27.544C76.3389 26.952 76.5789 26.056 76.5789 24.856C76.5789 23.672 76.3389 22.784 75.8589 22.192C75.3949 21.584 74.7149 21.28 73.8189 21.28C72.9069 21.28 72.2109 21.584 71.7309 22.192C71.2509 22.784 71.0109 23.672 71.0109 24.856C71.0109 27.24 71.9469 28.432 73.8189 28.432ZM97.3753 18.52C98.7673 18.52 99.7993 18.944 100.471 19.792C101.159 20.624 101.503 21.904 101.503 23.632V31H97.8793V23.752C97.8793 22.904 97.7433 22.296 97.4713 21.928C97.1993 21.544 96.7513 21.352 96.1273 21.352C95.3913 21.352 94.8233 21.608 94.4233 22.12C94.0233 22.632 93.8233 23.352 93.8233 24.28V31H90.1993V23.752C90.1993 22.92 90.0553 22.312 89.7673 21.928C89.4953 21.544 89.0553 21.352 88.4473 21.352C87.7113 21.352 87.1353 21.608 86.7193 22.12C86.3193 22.632 86.1193 23.352 86.1193 24.28V31H82.4953V22.312C82.4953 21.016 82.4313 19.856 82.3033 18.832H85.7113L85.9273 20.656C86.2953 19.968 86.8073 19.44 87.4633 19.072C88.1353 18.704 88.9033 18.52 89.7673 18.52C91.5753 18.52 92.7753 19.272 93.3672 20.776C93.7673 20.088 94.3193 19.544 95.0233 19.144C95.7433 18.728 96.5273 18.52 97.3753 18.52ZM111.802 18.52C112.858 18.52 113.794 18.784 114.61 19.312C115.426 19.824 116.058 20.56 116.506 21.52C116.954 22.464 117.178 23.56 117.178 24.808C117.178 26.056 116.946 27.168 116.482 28.144C116.034 29.104 115.402 29.856 114.586 30.4C113.77 30.928 112.842 31.192 111.802 31.192C110.954 31.192 110.186 31.016 109.498 30.664C108.826 30.296 108.314 29.8 107.962 29.176V31H104.362V13.336H107.986V20.536C108.338 19.912 108.85 19.424 109.522 19.072C110.21 18.704 110.97 18.52 111.802 18.52ZM110.77 28.432C111.666 28.432 112.354 28.12 112.834 27.496C113.314 26.872 113.554 25.976 113.554 24.808C113.554 23.688 113.314 22.824 112.834 22.216C112.354 21.608 111.666 21.304 110.77 21.304C109.874 21.304 109.178 21.616 108.682 22.24C108.202 22.848 107.962 23.72 107.962 24.856C107.962 26.008 108.202 26.896 108.682 27.52C109.178 28.128 109.874 28.432 110.77 28.432ZM131.695 18.832V31H128.119V29.2C127.751 29.824 127.231 30.312 126.559 30.664C125.887 31.016 125.127 31.192 124.279 31.192C123.223 31.192 122.287 30.936 121.471 30.424C120.671 29.912 120.039 29.184 119.575 28.24C119.127 27.28 118.903 26.176 118.903 24.928C118.903 23.68 119.127 22.568 119.575 21.592C120.039 20.616 120.679 19.864 121.495 19.336C122.311 18.792 123.239 18.52 124.279 18.52C125.127 18.52 125.887 18.704 126.559 19.072C127.231 19.44 127.751 19.936 128.119 20.56V18.832H131.695ZM125.335 28.432C126.231 28.432 126.919 28.128 127.399 27.52C127.879 26.912 128.119 26.032 128.119 24.88C128.119 23.728 127.879 22.848 127.399 22.24C126.919 21.616 126.231 21.304 125.335 21.304C124.439 21.304 123.743 21.624 123.247 22.264C122.751 22.904 122.503 23.792 122.503 24.928C122.503 26.064 122.743 26.936 123.223 27.544C123.719 28.136 124.423 28.432 125.335 28.432ZM146.812 18.832V31H143.236V29.2C142.868 29.824 142.348 30.312 141.676 30.664C141.004 31.016 140.244 31.192 139.396 31.192C138.34 31.192 137.404 30.936 136.588 30.424C135.788 29.912 135.156 29.184 134.692 28.24C134.244 27.28 134.02 26.176 134.02 24.928C134.02 23.68 134.244 22.568 134.692 21.592C135.156 20.616 135.796 19.864 136.612 19.336C137.428 18.792 138.356 18.52 139.396 18.52C140.244 18.52 141.004 18.704 141.676 19.072C142.348 19.44 142.868 19.936 143.236 20.56V18.832H146.812ZM140.452 28.432C141.348 28.432 142.036 28.128 142.516 27.52C142.996 26.912 143.236 26.032 143.236 24.88C143.236 23.728 142.996 22.848 142.516 22.24C142.036 21.616 141.348 21.304 140.452 21.304C139.556 21.304 138.86 21.624 138.364 22.264C137.868 22.904 137.62 23.792 137.62 24.928C137.62 26.064 137.86 26.936 138.34 27.544C138.836 28.136 139.54 28.432 140.452 28.432Z" fill="white" />
                                <g clipPath="url(#clip0_1224:558)">
                                    <path className="green" d="M21.3549 41.9581C10.4704 42.6281 -0.86935 32.7876 0.041141 18.9272C0.620544 10.8873 6.82844 2.88933 14.4435 0.418739C14.6504 0.33499 14.8159 0.293116 15.0229 0.251242C16.7611 -0.125628 18.3337 0.669985 18.6234 2.17746C18.9131 3.81056 17.7957 4.5643 16.4714 5.02492C12.1672 6.5324 8.89773 9.21236 6.82844 13.3579C2.89677 21.1884 5.58686 30.6102 12.9949 35.007C20.5686 39.4875 30.4184 37.1426 35.2606 29.6889C41.096 20.6859 37.123 8.75174 27.1076 5.15054C26.6523 4.98305 26.0315 4.94117 25.7832 4.64805C25.1624 3.85244 24.2105 2.9312 24.2519 2.09371C24.2933 0.71186 25.5349 -0.209376 26.9006 0.167493C29.0113 0.753734 31.1634 1.42372 32.9844 2.55433C40.1441 6.90927 44.2413 16.0798 42.7101 23.8684C40.8063 33.1226 33.9362 40.2831 25.2866 41.7069C24.0036 41.9162 22.6793 41.8744 21.3549 41.9581Z" fill="white" />
                                    <path className="green" d="M21.2724 30.9033C15.4783 30.9033 10.9259 26.2971 10.8845 20.4766C10.8431 14.656 15.5611 9.88235 21.3965 9.88235C27.025 9.88235 31.6188 14.656 31.6188 20.4347C31.6188 26.2552 26.9836 30.9033 21.2724 30.9033Z" fill="white" />
                                    <path d="M18.5714 25.5238C17.9167 25.5238 17.3869 26.081 17.3869 26.7619C17.3869 27.4429 17.9167 28 18.5714 28C19.2262 28 19.7619 27.4429 19.7619 26.7619C19.7619 26.081 19.2262 25.5238 18.5714 25.5238ZM24.5238 25.5238C23.869 25.5238 23.3393 26.081 23.3393 26.7619C23.3393 27.4429 23.869 28 24.5238 28C25.1786 28 25.7143 27.4429 25.7143 26.7619C25.7143 26.081 25.1786 25.5238 24.5238 25.5238ZM18.6726 23.5119L18.6905 23.4376L19.2262 22.4286H23.6607C24.1071 22.4286 24.5 22.1748 24.7024 21.791L27 17.4514L25.9643 16.8571H25.9583L25.3036 18.0952L23.6607 21.1905H19.4821L19.4048 21.0233L18.0714 18.0952L17.506 16.8571L16.9464 15.619H15V16.8571H16.1905L18.3333 21.5557L17.5298 23.0724C17.4345 23.2457 17.381 23.45 17.381 23.6667C17.381 24.3476 17.9167 24.9048 18.5714 24.9048H25.7143V23.6667H18.8214C18.744 23.6667 18.6726 23.5986 18.6726 23.5119Z" className="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1224:558">
                                        <rect width="43" height="42" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>

                        <form className="form-noborder">
                            <Row className="justify-content-center">
                                <Col lg={4} sm={12} className="form-group has-icon m-0 p-1">
                                    <InputGroup className="">
                                        <InputGroup.Text id="basic-addon1" className="bg-white"><FaMapMarkerAlt className="text-success" /></InputGroup.Text>
                                        <FormControl className=""
                                            placeholder="Location"
                                            aria-label="Location"
                                        />
                                    </InputGroup>
                                </Col>
                                <Col lg={8} sm={12} className="form-group p-1">
                                    <InputGroup placeholder="Type your search">
                                        <FormControl
                                            placeholder="Type your search"
                                            aria-label="Type your search"
                                            onChange={handleSearchInputChange}
                                        />
                                        {!!searchValue && !!searchFields.length && (
                                            <div className="search-list-box">
                                                <ul className="search-list">
                                                    {searchFields.map((field: any) =>
                                                        <Link to={`/product-listing/${field.id}`} onClick={() => setSearchValue(null)} key={field.id}>
                                                            <li className="search-list-item">{field.name}</li>
                                                        </Link>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                        <button type="button" onClick={handleSearchClick} className="btn btn-success">
                                            <FaSearch />
                                        </button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </form>
                        <Link to='/create-post'>
                            <Button variant="fullround" className="nav-link px-4 bg-success rounded ms-3 text-white d-none d-lg-flex">
                                + Sell
                            </Button>
                        </Link>
                    </div>
                </Navbar>
            </Navbar>

            <Navbar className="z1 d-lg-none navbar navbar-expand-lg shadow bg-white px-2">
                <InputGroup placeholder="Type your search">
                    <FormControl
                        placeholder="Type your search"
                        aria-label="Type your search"
                        onChange={handleSearchInputChange}
                    />
                    {!!searchValue && !!searchFields.length && (
                        <div className="search-list-box">
                            <ul className="search-list">
                                {searchFields.map((field: any) =>
                                    <Link
                                        to={`/product-listing/${field.id}`}
                                        onClick={() => setSearchValue(null)}
                                        key={field.id}
                                    >
                                        <li className="search-list-item">{field.name}</li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    )}
                    <button className="btn btn-success margin-right-14">
                        <FaSearch />
                    </button>
                </InputGroup>

                {session.isLoggedIn && (
                    <HeaderDropdown />
                )}
            </Navbar>
            <Navbar sticky="top" className="d-lg-none navbar navbar-expand-lg shadow bg-white px-2">
                <InputGroup className="w-100 d-lg-none ">
                    <InputGroup.Text id="basic-addon1" className="bg-white"><FaMapMarkerAlt className="text-success" /></InputGroup.Text>
                    <FormControl className="" placeholder="Location" aria-label="Location" />
                    <InputGroup.Text className="bg-white">Edit</InputGroup.Text>
                </InputGroup>
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