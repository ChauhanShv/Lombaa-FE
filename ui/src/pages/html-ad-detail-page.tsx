import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap';
import { FaShare, FaHeart, FaImages, FaAsterisk, FaHandshake, FaMapMarkerAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductCard } from '../components/ad-card/product-card';
import { ProfileHeaderCard } from '../components/profile/profile-header-card';

import './ad-page.css';


const AdSpotsettings = {
    dots: true,
}

export const AdDetailPage: React.FC = (): React.ReactElement => {

    const productCardContents = {
        productId: '4',
        title: "Special title treatment",
        summary: 'With supporting text below as a natural lead-in...',
        description: 'Ashanti, Greater Accra lorelpsum...',
        mediaType: "image",
        mediaSrc: "https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg",
        authorName: 'John Smith',
        authorProfilePicture: '/images/user-circle.svg',
        postedOnDate: '',
        isFavourite: false,
        onFavUnfav: (fav: boolean) => { },
    };

    return (
        <>
            <section className="pt-4 pb-5 mt-0 align-items-center">
                <Container>
                    <Row>
                        <ul className="breadcrumbs">
                            <li><Link to="/">Audio</Link></li>
                            <li>{'>'}</li>
                            <li>Other Audio Equipment</li>
                        </ul>
                    </Row>
                    <Row className="mt-auto">
                        <Col lg={12} sm={12} className="position-relative">
                            <Slider className="ad-slider" {...AdSpotsettings}>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                            </Slider>
                            <div className="btns-over">
                                <button className="icon-btn btn-like"><FaShare /> Share</button>
                                <button className="icon-btn btn-like" id="fav"><FaHeart /> Like</button>
                            </div>
                            <div className="btns-over bottom">
                                <button className="icon-btn" ><FaImages /> 6 Images</button>
                            </div>
                        </Col>


                    </Row>

                </Container>
            </section>
            <section className=" pb-5">
                <Container>

                    <Row>
                        <Col className="col-lg-8 col-md-11 mx-auto">
                            <h1 className="h2 text-dark mb-3">Polycom RealPresence Group 700 for sale @ $250 each(AAR660)</h1>
                            <h2 className="text-success">$400</h2>
                            <Row className="border-bottom py-3 mb-5">
                                <Col>
                                    <FaAsterisk /> Used
                                </Col>
                                <Col>
                                    <FaHandshake /> Meetup
                                </Col>
                                <Col>
                                    <FaMapMarkerAlt /> Blk 2019 Bukit Batok St 23
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-12 mb-2">
                                    <h4>Description</h4>

                                </Col>
                                <Col className="col-12 mb-2">
                                    <p className="text-muted m-0">Posted</p>
                                    <p>2 weeks ago</p>
                                </Col>

                                <Col className="col-12 mb-2">
                                    <p>Please self inspect. Find just about anything using the app on your mobile.</p>
                                </Col>
                                <Col className="col-12 mb-2">
                                    <p>Qty: 1 pc</p>
                                </Col>
                                <Col className="col-12 mb-2">
                                    <p>Used. Items can be powered on, however, not fully tested.</p>
                                </Col>
                                <Col className="col-12 mb-2">
                                    <p> Model No : 700</p>
                                </Col>

                                <Col className="col-12 mb-2">
                                    <p>"First Come  First Serve ".<br />
                                        Unable to reply inquiries, Therefore, JUST WALK IN to check the condition and see 5000 other items at our warehouse</p>

                                    <p>Thanks for your understanding. </p>

                                    <p>**********************************************<br />
                                        Viewing & Self inspection: </p>

                                    <p>Blk 2019 Bukit Batok St 23 (Industrial Park A)<br />
                                        #01-254, Singapore 659524</p>

                                    <p>Operating hours: 11 am to 5 pm (Mon - Sat).</p>
                                </Col>

                                <Col className="col-12 mb-2">
                                    <h4>Meet-up</h4>
                                    <p><FaMapMarkerAlt /> Blk 2019 Bukit Batok St 23</p>
                                </Col>

                                <Col className="col-12 mb-5">
                                    <h4>Payment</h4>

                                </Col>
                                <Col className="col-12 mb-2">
                                    <h4 className="mb-0">Meet the seller</h4>
                                    <ProfileHeaderCard />
                                </Col>


                            </Row>


                        </Col>
                        <Col lg={4} sm={12} className="d-flex">
                            <div className="p-4">
                                <h3>Buy and sell quickly, safely and locally!</h3>
                                <p>Find just about anything using the app on your mobile.</p>
                                <Button variant="link" className="p-0 me-lg-2">
                                    <img className="d-block mw-100" width="125" src="/images/appstore.png" alt="App Store" />
                                </Button>
                                <Button variant="link" className="p-0">
                                    <img className="d-block mw-100" width="125" src="/images/googleplay.png" alt="Google Play" />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Hot Deals</h2>
                    <Row>


                        <Col sm={12}>
                            <>
                                <Row className="post-list">
                                    <Col md={3} className="col-12 mb-3">
                                        <a href="#" className="ad-post bg-dark  p-4 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                            <p><i className="fas fa-plus-circle"></i></p>
                                            <h6>Want to see your stuff here ?</h6>
                                            <p>Sell things in your community. It's quick safe and local.</p>
                                            <p>
                                                <Button className="btn btn-success rounded px-3" variant="fullround">Post an Ad for free!</Button>
                                            </p>

                                        </a>
                                    </Col>
                                    {[...Array(16)].map(() =>
                                        <Col md={3} className="col-6 mb-3">
                                            <ProductCard {...productCardContents} />
                                        </Col>
                                    )}
                                </Row>
                            </>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
