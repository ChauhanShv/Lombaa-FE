import React from 'react';
import './settings.css'
import { Container, Grid, Row, Col } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FaChevronLeft, FaChevronRight, FaPlusCircle, FaHeart } from 'react-icons/fa';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export const SettingsPage: React.FC = () => {
    return (
        <div>
            <Container className="p-5">
                <Row>
                    <Col md={4}>
                        <Card className="sidenav">
                            <Card.Header className="d-flex align-items-center"> <button className="btn btn-white"><FaChevronLeft /></button> Settings</Card.Header>
                            <ListGroup className="mb-3">
                                <ListGroup.Item className="active" action href="">Personal details
                                    <FaChevronRight /></ListGroup.Item>
                                <ListGroup.Item action href="">Business information <FaChevronRight /></ListGroup.Item>
                            </ListGroup>

                            <ListGroup>
                                <ListGroup.Item className="" action href="">Personal details
                                    <FaChevronRight /></ListGroup.Item>
                                <ListGroup.Item action href="">Business information <FaChevronRight /></ListGroup.Item>
                            </ListGroup>
                        </Card>


                    </Col>
                    <Col md={8}>
                        

                        <Card className="">
                            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button> Personal details</span>
                                <button className="btn btn-success">Save</button>
                            </Card.Header>


                            <div className="card-content col-md-8 mx-auto">
                                <div className="details-form p-5">
                                    <p className="text-center">
                                        <Image src="https://dummyimage.com/100/007bff/efefef" roundedCircle />
                                    </p>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Full Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingSelect" label="Select Location" className="mb-3">
                                        <Form.Select aria-label="Floating label select example">
                                            <option>Select Location</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Birthday"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingSelect" label="Sex" className="mb-3">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="1">Do Not Specify</option>
                                            <option value="2">Female</option>
                                            <option value="3">Male</option>
                                        </Form.Select>
                                    </FloatingLabel>

                                    <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>

                                    <ListGroup as="ul" className="connectsocial mb-3">
                                        <ListGroup.Item as="li">
                                            Google <span>Toogle switch</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Facebook <span>Toogle switch</span>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <button className="btn btn-success w-100">Save</button>
                                </div>
                            </div>

                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
};