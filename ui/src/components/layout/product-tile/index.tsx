import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

export const ProductTile:React.FC = ():React.ReactElement => {
    return (
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
    );
};