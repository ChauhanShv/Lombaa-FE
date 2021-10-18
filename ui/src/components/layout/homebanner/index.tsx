import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './styles.css';

export const HomeBanner:React.FC = (): React.ReactElement => {
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
                                            <InputGroup.Text>
                                                <button className="btn btn-primary">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
