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
                            className="m-0 row justify-content-center w-100 align-items-sm-end align-items-md-center d-flex text-center h-100">
                            <div className="col-12 col-md-6 ">
                                <h2 className="text-light mb-2 mt-5">
                                    <strong>TRY LOMBAA</strong>
                                </h2>
                                <p className="lead  text-light mb-5">
                                    Buy and sell quickly, safely and locally! find just about anything using Lombaa.
                                </p>
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