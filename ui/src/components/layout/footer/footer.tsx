import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useAxios } from '../../../services';
import { PageCategory, Page } from './types';
import './footer.css';

export const Footer: React.FC = () => {

    const [pageCategories, setPageCategories] = useState<PageCategory[]>();
    const [{ data, loading, error }, execute] = useAxios({
        url: '/page/category',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            console.log(data?.data?.categories);
            setPageCategories(data?.data?.categories);
        }
    }, [data]);

    return (
        <>
            <footer className="d-none d-lg-block">
                <section
                    className="pt-4 pb-5 mt-0 align-items-end align-items-md-center d-flex greenbg">
                    <div className="container-fluid d-flex h-100">
                        <div
                            className="m-0 row  justify-content-center w-100 align-items-sm-end align-items-md-center d-flex text-center h-100">
                            <div className="col-12 col-md-6 ">
                                <h2 className="   text-light mb-2 mt-5">
                                    <strong>TRY THE LOMBAA APP</strong>
                                </h2>
                                <p className="lead  text-light mb-5">
                                    Buy and sell quickly, safely and locally! find just about anything using the app on your mobile.
                                </p>
                                <div className="row col-md-9 mx-auto">
                                    <div className="col-6">
                                        <a href="#">
                                            <img className="mw-100" src="/images/appstore.png" />
                                        </a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#">
                                            <img className="mw-100" src="/images/googleplay.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-0 mt-0">
                    <div className="footer ">
                        <div className="pt-5 pb-5">
                            <div className="container">
                                <div className="row">
                                    {loading ? (<></>) : (
                                        <>
                                            {pageCategories && !!pageCategories?.length && pageCategories?.map((pageCategory: PageCategory) => (
                                                <div className="col-xs-6 col-sm-3">
                                                    <h4 className="my-2 text-success">{pageCategory?.title}</h4>
                                                    {pageCategory?.pages && !!pageCategory?.pages?.length && pageCategory?.pages?.map((page: Page) => (
                                                        <ul className='list-unstyled list-light'>
                                                            <li>
                                                                <Link to={`/${page?.slug}`}>
                                                                    {page?.title}
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {/* <div className="col-xs-6 col-sm-3">
                                        <h4 className="my-2 text-success">About</h4>
                                        <ul className="list-unstyled list-light">
                                            <li><Link to="/about-lombaa">About Lombaa</Link></li>
                                            <li><Link to="/">Terms Conditions</Link></li>
                                            <li><Link to="/">Privacy Policy</Link></li>
                                            <li><Link to="/">Billing Policy</Link></li>
                                            <li><Link to="/">Cookie Policy</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <h4 className="my-2 text-success">Hot Links</h4>
                                        <ul className="list-unstyled list-light text-light">
                                            <li><Link to="/">Brand</Link></li>
                                            <li><Link to="/">Sellers</Link></li>
                                            <li><Link to="/">Regions</Link></li>
                                        </ul>
                                    </div>
                                    <br className="hidden-sm-up" />
                                    <div className="col-xs-6 col-sm-3">
                                        <h4 className="my-2 text-success">Resources</h4>
                                        <ul className="list-unstyled list-light">
                                            <li><Link to="/">Blog</Link></li>
                                            <li><Link to="/">Careers</Link></li>
                                            <li><Link to="/">Press</Link></li>
                                            <li><Link to="/">Events</Link></li>
                                            <li><Link to="/">Contact</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <h4 className="my-2 text-success">Connect</h4>
                                        <ul className="list-unstyled list-light">
                                            <li><Link to="/">Support</Link></li>
                                            <li><Link to="/">Social</Link></li>
                                            <li><Link to="/">Community</Link></li>
                                        </ul>
                                        <p className="color-light mt-2">Stay up-to-date!</p>
                                        <form>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Email"
                                                    aria-label="Email"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <button className="btn btn-white btn-sm" type="button">
                                                    OK
                                                </button>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>
                                <hr />
                                <div className="row f-flex justify-content-between">
                                    <div className="col-md-8 text-xs-center  text-left   my-1">
                                        <p className="mt-2  text-muted"> © Copyright 2021 • All Rights
                                            Reserved |&nbsp;
                                            <a className=" " href="#">Disclaimer</a>
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-xs-center   text-lg-right   my-1">
                                        <div className="btn-container  mt-1 text-md-end text-sm-center">
                                            <div className="mb-1 mr-3 align-self-right pt-0 d-inline-block">
                                                <a href="#" role="button"
                                                    className=" btn-white p-2 m-2 btn btn-round btn-rised btn-icon x">
                                                    <FaTwitter />
                                                </a>
                                                <a href="#" role="button"
                                                    className="btn-white p-2 m-2 btn btn-round btn-rised btn-icon ">
                                                    <FaFacebook />
                                                </a>
                                                <a href="#" role="button"
                                                    className="btn-white p-2 m-2 btn btn-round btn-rised btn-icon  ">
                                                    <FaLinkedin />
                                                </a>
                                                <a href="#" role="button"
                                                    className="btn-white p-2 m-2 btn btn-rised btn-round btn-icon  ">
                                                    <FaGoogle />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
};