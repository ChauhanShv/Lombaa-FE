import React from 'react';
import { Form, Modal, FloatingLabel, Row, Col, Button } from 'react-bootstrap';

interface MoreFiltersModalProps {
    showMoreFilters: boolean;
}

export const MoreFiltersModal = ({ showMoreFilters, onCloseMoreFilters }: any) => {
    return (
        <Modal show={showMoreFilters} onHide={onCloseMoreFilters}>
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
                <Button variant="secondary" onClick={onCloseMoreFilters}>
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}