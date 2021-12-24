import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, InputGroup, FormControl, Card, Form, FloatingLabel, Image, Alert, Spinner, } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import FormCheck from 'react-bootstrap/FormCheck';
import { FaSearch, FaHeart, FaCheckCircle } from 'react-icons/fa';
import Dropzone from 'react-dropzone';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import { AdCard } from '../components/ad-card/ad-card';


export const ÇategoryPage: React.FC = (): React.ReactElement => {

    return (
        <>
            <div>

                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="filters-pop">
                        <div className="filter-widget">
                            <h3>Body</h3>
                            <div className="widget-content">
                                <Form.Check type="checkbox" id="1" label="Sedan" />
                                <Form.Check type="checkbox" id="2" label="Sedan" />
                                <Form.Check type="checkbox" id="3" label="Sedan" />
                                <Form.Check type="checkbox" id="4" label="Sedan" />
                                <Form.Check type="checkbox" id="5" label="Sedan" />
                            </div>
                        </div>
                        <div className="filter-widget">
                            <h3>Body</h3>
                            <div className="widget-content">
                                <FloatingLabel controlId="floatingSelect" label="Car Make">
                                    <Form.Select aria-label="Choose">
                                        <option>Choose</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </div>
                        </div>
                        <div className="filter-widget">
                            <h3>Age (year)</h3>
                            <div className="widget-content">
                                <Form.Check type="radio" name="age" id="6" label="< 1 yr" />
                                <Form.Check type="radio" name="age" id="7" label="< 2 yrs" />
                                <Form.Check type="radio" name="age" id="8" label="< 3 yrs" />
                                <Form.Check type="radio" name="age" id="9" label="< 4 yrs" />
                                <Form.Check type="radio" name="age" id="10" label="< 5 yrs" />
                                <Form.Check type="radio" name="age" id="11" label="< 5-10 yrs" />
                            </div>
                        </div>

                        <div className="filter-widget">
                            <h3>Budget</h3>
                            <div className="widget-content">
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="First name" />
                                        </Col>
                                        <Col className="col-auto text-center align-items-center"> - </Col>
                                        <Col>
                                            <Form.Control placeholder="Last name" />
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                        </Button>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </div>




                <Container className="pt-4 pt-lg-4">

                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="h4 text-secondary mb-1">Get The Best Deals On Used Cars in Ghana</h1>
                    <p className="mb-2">Thousands of cars to choose from Kia, Honda, Volkswagen, Toyota and more under $70,000 in Ghana</p>

                </Container>

                <div className="fixed-filters">
                    <Container className="">
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="outline-success btn-success rounded btn-fullround" id="dropdown-autoclose-true">
                                Used Cars
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="pre-scrollable">
                                <InputGroup placeholder="Type your search" className="border-bottom">
                                    <FormControl className="border-0"
                                        placeholder="Type your search"
                                        aria-label="Type your search"
                                    />
                                    <button className="btn-link btn">
                                        <FaSearch />
                                    </button>
                                </InputGroup>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item className="py-2" href="#">Menu Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                                Link Dropdown:
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="pre-scrollable">
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#" className="py-2">Menu Item</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                                Sort by:
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="pre-scrollable">
                                <div className="px-3 py-1">
                                    <Form.Check type="radio" id="dc" label="Best Match" name="sortby" />
                                    <Form.Check type="radio" id="dc2" label="Recent" name="sortby" />

                                    <Form.Check type="radio" id="dc3" label="Price - High to Low" name="sortby" />
                                    <Form.Check type="radio" id="dc4" label="Recent" name="sortby" />

                                    <Form.Check type="radio" id="dc5" label="Price - Low to High" name="sortby" />
                                    <Form.Check type="radio" id="dc6" label="Reg. Year - New to Old" name="sortby" />
                                </div>


                            </Dropdown.Menu>
                        </Dropdown>


                    </Container>




                </div>

                <Container className="">
                    <section className="pb-5">

                        <Row>
                            <Col sm={12}>
                                <Row className="post-list">
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg={3} md={4} className="col-6 mb-3">
                                        <AdCard />
                                    </Col>
                                    <Col lg="{12}" className="py-3 text-center">
                                        <button className="btn btn-outline-success rounded btn-fullround"> Load More</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </section>
                </Container>



            </div>
        </>
    );
};
