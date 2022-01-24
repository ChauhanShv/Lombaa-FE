import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import { FaAsterisk, FaHandshake, FaMapMarkerAlt, FaEdit, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { SellerDetailCard } from '.';
import { ProductFields, ProductDetailDescriptionProps, FieldValue } from './types';
import { useAxios } from '../../services';
import './product-detail.css';

export const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({
    productDetail
}: ProductDetailDescriptionProps): React.ReactElement => {
    const [isMarkSolded, setIsMarkSolded] = useState<boolean>(false);
    const [{ data, loading }, executeSoldProduct] = useAxios({
        url: `/product/${productDetail.id}`,
        method: 'POST',
    });

    const handleMarkSolded = () => {
        const confirmMarkSold = confirm('Are you sure you want to mark the product as sold !');
        if (confirmMarkSold) {
            executeSoldProduct({});
            data?.success ? setIsMarkSolded(true) : null;
        }
    };

    return (
        <Container>
            <Row>
                <Col className="col-lg-8 col-md-11 mx-auto">
                    <h1 className="h2 text-dark mb-3">{productDetail.title}</h1>
                    <h2 className="text-success">
                        {productDetail.location.country.currencySymbol}{' '}{productDetail.price}
                    </h2>
                    <Row className="border-bottom py-3 mb-5">
                        <Col>
                            <FaAsterisk /> Used
                        </Col>
                        <Col>
                            <FaHandshake /> Meetup
                        </Col>
                        <Col>
                            <FaMapMarkerAlt /> {`${productDetail.location.city.name}, ${productDetail.location.region.name}`}
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
                            <p className="text-muted m-0">Qty: </p>
                            <p>1 pc</p>
                        </Col>
                        <Col className="col-12 mb-2">
                            <p className="text-muted m-0"> Model No : </p>
                            <p>700</p>
                        </Col>
                        {productDetail.productFields?.map((productField: ProductFields) =>
                            <Col className='col-12 mb-2' key={productField.id}>
                                {!['title', 'description', 'price'].includes(productField.field.fieldType) && (
                                    <>
                                        <p className="text-muted m-0">{productField.field.label}</p>
                                        {productField.field.values.map((value: FieldValue) =>
                                            <p key={value.id}>{value.value}</p>
                                        )}
                                    </>
                                )}
                            </Col>
                        )}

                        <Col className="col-12 mb-2">
                            <p>{productDetail.description}</p>
                        </Col>

                        <Col className="col-12 mb-2">
                            <h4>Meet-up</h4>
                            <p><FaMapMarkerAlt /> {`${productDetail.location.city.name}, ${productDetail.location.region.name}`}</p>
                        </Col>

                        <Col className="col-12 mb-5">
                            <h4>Payment</h4>

                        </Col>
                        <Col className="col-12 mb-2">
                            <h4 className="mb-0">Meet the seller</h4>
                            <SellerDetailCard user={productDetail?.user} />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} sm={12} className="d-flex flex-wrap flex-column">
                    <div className="p-4 w-100">
                        <Link to='/' className="p-0 mb-3 usermeta d-block">
                            <img
                                className="rounded-circle me-2"
                                src={productDetail?.user?.profilePicture?.url}
                                width="30"
                                height="30"
                            />
                            {productDetail?.user?.name}
                        </Link>
                        {loading ? <Spinner animation="border" variant='danger' /> : (isMarkSolded || productDetail.soldAt) ? (
                            <div className="bg-danger p-4 rounded">
                                <h4 className="text-white">
                                    This product is out of stock
                                </h4>
                            </div>
                        ) : (
                            <>
                                <Button variant="btn btn-success" className="p-2 me-lg-2 mb-3 w-100">
                                    No Chats yet - Promote
                                </Button>
                                <ListGroup className="product-auth">
                                    <ListGroup.Item className="text-gray" action>
                                        <FaEdit className="me-2" />
                                        Edit Listing
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-gray" action>
                                        <FaCheckCircle className="me-2" />
                                        Mark as Reserved
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-gray" onClick={handleMarkSolded} action>
                                        <FaHandshake className="me-2" />
                                        Mark as Sold
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-danger" action>
                                        <FaTrashAlt className="me-2" />
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                        )}
                    </div>
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