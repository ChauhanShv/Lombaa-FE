import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSearch, FaHeart, FaCheckCircle } from 'react-icons/fa';

export const ListingSuccessfulTile: React.FC = (): React.ReactElement => {
    return (
        <Container className="p-4 pt-lg-5">
            <Row>
                <Col>
                    <div className="shadow p-3 p-lg-5">
                        <Row>
                            <Col className="col-md-3">
                                <div className="shadow">
                                    <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                                    <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                        <small className="text-white">Today</small>
                                        <button className="saved" id="fav"><FaHeart /></button>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title text-success">Special title treatment</h4>
                                        <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                        <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-8">
                                <h1 className="h2"><FaCheckCircle className="text-success fs-4" /> Successfully listed</h1>
                                <Button variant="fullround" className="px-4 btn-outline-secondary">View Listing</Button>{' '}
                                <Button variant="fullround" className="px-4 mx-3 btn-success">Share</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
