import React from 'react';
import {Row, Col, Container, InputGroup, FormControl,} from 'react-bootstrap';
import { FaBookmark, FaCommentDots, FaBell, FaList, FaSearch } from 'react-icons/fa';
import './home-page.css';

export const HomePage: React.FC = (): React.ReactElement => {
    return (
        <>
            <section className="pt-5 pb-5 mt-0 align-items-center bg-secondary  d-none d-lg-flex">
                <Container>
                    <Row className="mt-auto">
                        <Col lg={8} sm={12} className="text-center mx-auto">
                            <h1
                                className="display-5 text-uppercase text-white mb-3 d-none d-lg-block ">
                                Buy and sell quickly, safely and locally!</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8} sm={12} className="p-4 rounded mx-auto text-center spot-search bg-success">
                            <form className="form-noborder">
                                <Row className="mb-2 justify-content-center">
                                    <Col lg={4} sm={12} className="form-group has-icon m-0">
                                        <label className="text-start w-100 m-0">Search anything..</label>
                                        <span className="text-success fas fa-map-marker-alt form-control-feedback "></span>
                                        <InputGroup size="lg">
                                            <FormControl
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col lg={8} sm={12} className="form-group">
                                        <label className="text-start w-100 m-0">Type your search</label>
                                        <InputGroup size="lg" placeholder="Type your search">
                                            <FormControl
                                                placeholder="Type your search"
                                                aria-label="Type your search"
                                            />
                                             <button className="btn btn-primary">
                                                    <FaSearch />
                                                </button>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container>
                <Row>
                    <Col lg={3} sm={12}>
                        <section className="d-md-block d-lg-none">
                            <h2 className="fs-6 px-3 pt-2 m-0 d-flex justify-content-between align-items-center">Browse Categories <a href="#" className="btn">See All</a></h2>
                            <div className="mobcat-slider">
                                <div>
                                    <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                        <span className="text-center w-100">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                        <span className="text-center w-100">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                        <span className="text-center w-100">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                        <span className="text-center w-100">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                        <span className="text-center w-100">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="pt-5 pb-5">
                            <div className="row">
                                <div className="category-sidebar d-none d-lg-block">
                                    <div className="btn-group dropright w-100">
                                        <a href="#" className="btn btn-light dropdown-toggle d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                            <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Event centres, Venues and Workstations <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group dropright w-100">
                                        <a href="#" className="btn btn-light dropdown-toggle d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                            <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Event centres, Venues and Workstations <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group dropright w-100">
                                        <a href="#" className="btn btn-light dropdown-toggle d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                            <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Event centres, Venues and Workstations <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group dropright w-100">
                                        <a href="#" className="btn btn-light dropdown-toggle d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                            <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Category <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                            <div className="btn-group w-100">
                                                <a href="#" className="btn btn-light d-flex justify-content-start align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span><img width="32" className="me-2" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                                                    <span className="text-left">Event centres, Venues and Workstations <br /> <strong className="w-100 text-left">72,546</strong></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col lg={9} sm={12}>
                        <Row>
                            <Col className="mx-auto mt-5">
                                <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5" data-ride="carousel">
                                    <div className="carousel-inner" role="listbox">
                                        <div className="carousel-item active">
                                            <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src="/images/slide.png" alt="Second slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src="/images/slide.png" alt="Third slide" />
                                        </div>
                                    </div>
                                    {/* // Slides
                            Controls */}
                                    <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </a>
                                    <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </a>
                                    {/* Controls */}
                                    <ol className="carousel-indicators">
                                        <li data-target="#carousel-thumb" data-slide-to="0" className="active">
                                            <img className="d-block w-100 img-fluid" src="/images/slide.png" />
                                        </li>
                                        <li data-target="#carousel-thumb" data-slide-to="1">
                                            <img className="d-block w-100 img-fluid" src="/images/slide.png" />
                                        </li>
                                        <li data-target="#carousel-thumb" data-slide-to="2">
                                            <img className="d-block w-100 img-fluid" src="/images/slide.png" />
                                        </li>
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                    </Col>
                    <Col lg={9} sm={12}>
                        <>
                            <Row className="post-list">
                                <Col md={4} className="col-12 mb-3">
                                    <a href="#" className="ad-post bg-primary p-3 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                        <p><i className="fas fa-plus-circle"></i></p>
                                        <h6>Want to see your stuff here ?</h6>
                                        <p>Sell things in your community. It's quick safe and local.</p>
                                        <p>
                                            <button className="btn btn-success">Post an Ad for free!</button>
                                        </p>
                                    </a>
                                </Col>
                                <Col md={4} className="col-6 mb-3">
                                    <div className="card">
                                        <a href="#">
                                            <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                                            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                                <small className="text-white">Today</small>
                                                <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title text-success">Special title treatment</h4>
                                                <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                                <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col md={4} className="col-6 mb-3">
                                    <div className="card">
                                        <a>
                                            <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                                            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                                <small className="text-white">Today</small>
                                                <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title text-success">Special title treatment</h4>
                                                <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                                <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col md={4} className="col-6 mb-3">
                                    <div className="card">
                                        <a>
                                            <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                                            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                                <small className="text-white">Today</small>
                                                <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title text-success">Special title treatment</h4>
                                                <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                                <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
