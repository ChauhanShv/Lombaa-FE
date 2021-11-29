import React, { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Form, FloatingLabel } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropzone from 'react-dropzone';
import { CategorySelector } from '.';
import { OptionalDetailsForm } from './optional-details-form';

export const PostAdForm: React.FC = (): React.ReactElement => {
    const [isForSale, setIsForSale] = useState<Number>(1);

    return (
        <Container className="p-4 pt-lg-5">
            <h1 className="mb-3 h2">What are you listing today?</h1>
            <Row className="">
                <Col className="col-lg-4 ">
                    <div className="shadow p-3 p-lg-5 h-100">
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </Col>
                <Col className="col-lg-8">
                    <div className="shadow p-3 p-lg-5 h-100">
                        <CategorySelector />

                        <FloatingLabel className="mb-5" controlId="floatingInputGrid" label="Listing Title">
                            <Form.Control type="text" placeholder="Ad Title" />
                        </FloatingLabel>

                        <h5 className="mb-3">About the item</h5>
                        <h6 className="text-muted">Condition</h6>
                        <ToggleButtonGroup className="mb-5" type="radio" name="condition-options" defaultValue={1}>
                            <ToggleButton id="tbg-radio-1" variant="outline-success fullround" className="rounded m-2 ms-0" value={1}>
                                Brand New
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-2" variant="outline-success fullround" className="rounded m-2" value={2}>
                                Like New
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-3" variant="outline-success fullround" className="rounded m-2" value={3}>
                                Well used
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-4" variant="outline-success fullround" className="rounded m-2" value={4}>
                                Heavily used
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <h6 className="text-muted">Price</h6>
                        <ToggleButtonGroup type="radio" name="price-options" defaultValue={1}>
                            <ToggleButton id="price-radio-1" variant="outline-success fullround" className="rounded m-2 ms-0" value={1} onClick={() => setIsForSale(1)}>
                                For Sale
                            </ToggleButton>
                            <ToggleButton id="price-radio-2" variant="outline-success fullround" className="rounded m-2" value={0} onClick={() => setIsForSale(0)}>
                                For Free
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {isForSale === 1 && (
                            <InputGroup className="mt-2 mb-5">
                                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                <FormControl
                                    placeholder="Price of your listing"
                                    aria-label="Price of your listing"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        )}

                        <h6 className="text-muted">Description</h6>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={5} placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!" />
                        </Form.Group>

                        <FloatingLabel className="mb-5" controlId="floatingSelect" label="Brand">
                            <Form.Select aria-label="Floating label select example">
                                <option>Select Brand</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>

                        <OptionalDetailsForm />

                        <div className="d-flex justify-content-end">
                            <Button variant="fullround" className="btn-success rounded btn-lg">List Now</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
