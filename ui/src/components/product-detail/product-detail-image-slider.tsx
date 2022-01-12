import React from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { FaShare, FaHeart, FaImages } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './product-detail.css';

const AdSpotsettings = {
    dots: true,
}

export const AdDetailImageSlider: React.FC = (): React.ReactElement => {
    return (
        <>
            <Container>
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
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
        </>
    );
}