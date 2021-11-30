import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AdCard } from '../components/ad-card/ad-card';
import { AdDetailImageSlider, AdDetailDescription } from '../components/ad-detail';

export const AdDetailPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <section className="pt-4 pb-5 mt-0 align-items-center">
                <AdDetailImageSlider />
            </section>
            <section className=" pb-5">
                <AdDetailDescription />
            </section>
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Hot Deals</h2>
                    <Row>
                        <Col sm={12}>
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
                                <Col md={3} className="col-6 mb-3">
                                    <AdCard />
                                </Col>
                                <Col md={3} className="col-6 mb-3">
                                    <AdCard />
                                </Col>
                                <Col md={3} className="col-6 mb-3">
                                    <AdCard />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
