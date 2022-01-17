import React from 'react';
import moment from 'moment';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaAsterisk, FaHandshake, FaMapMarkerAlt } from 'react-icons/fa';
import { ProfileHeaderCard } from '../profile';
import { ProductDetailDescriptionProps, ProductDetail } from './types';
import './product-detail.css';

export const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({
    productDetail
}: ProductDetailDescriptionProps): React.ReactElement => {
    return (
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
                            <p>{moment(productDetail?.postedAt).format('LL')}</p>
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
    );
};