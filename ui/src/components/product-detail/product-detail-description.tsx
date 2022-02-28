import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import { FaAsterisk, FaHandshake, FaMapMarkerAlt, FaEdit, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { SellerDetailCard } from '.';
import { ProductFields, ProductDetailDescriptionProps } from './types';
import { ActionTypes, useAppContext } from '../../contexts';
import { useAxios } from '../../services';
import { AlertBox } from '../alert-box';
import './product-detail.css';
import { ModalType } from '../../types';

export const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({
    productDetail
}: ProductDetailDescriptionProps): React.ReactElement => {
    const [isMarkSolded, setIsMarkSolded] = useState<boolean>(false);
    const [showAlertBox, setShowAlertBox] = useState<boolean>(false);
    const { state, dispatch } = useAppContext();
    const navigate = useHistory();
    const [{ data, loading }, executeSoldProduct] = useAxios({
        url: `/product/${productDetail.id}`,
        method: 'POST',
    });
    const [{ data: chatInitResponse, loading: chatInitLoading }, executeChatInit] = useAxios({
        url: `/chat/init`,
        method: 'POST',
    });

    useEffect(() => {
        if (chatInitResponse?.success) {
            navigate.push(`/chat/${chatInitResponse?.data?.id}`);
        }
    }, [chatInitResponse]);

    const handleChatInit = () => {
        if (!state.session.isLoggedIn) {
            dispatch({
                type: ActionTypes.OPEN_MODAL,
                payload: {
                    modal: ModalType.LOGIN,
                }
            });
            return;
        }
        executeChatInit({
            data: {
                productId: productDetail.id,
            },
        });
    };

    const handleMarkSolded = () => {
        setShowAlertBox(true);
    };

    const onOkayPressedForMarkSolded = () => {
        executeSoldProduct({});
        data?.success ? setIsMarkSolded(true) : null;
        setShowAlertBox(false);
    }
    const onClosePressed = () => {
        setShowAlertBox(false);
    }

    return (
        <Container>
            <Row>
                {showAlertBox && (
                    <AlertBox
                        title={'Mark Product Solded?'}
                        description={"You won't be able to chat with your client and sell this product anymore"}
                        onOk={onOkayPressedForMarkSolded}
                        onClose={onClosePressed}
                    />
                )}
                <Col lg={8} md={11} className="mx-auto">
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
                        <Col className="col-12 mb-3">
                            <h4>Description</h4>
                        </Col>
                        <Row>
                            <Col xs={5}>
                                <p className="text-muted m-0">Posted</p>
                            </Col>
                            <Col xs={7}>
                                <p>{moment(productDetail?.postedAt).format('LL')}</p>
                            </Col>
                        </Row>
                        {productDetail.productFields?.map((productField: ProductFields) =>
                            <Row key={productField.id}>
                                {!['title', 'description', 'price'].includes(productField.field.fieldType) && (
                                    <>
                                        <Col xs={5}>
                                            <p className="text-muted m-0">{productField.field.label}</p>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{productField.value}</p>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        )}

                        <Col className="col-12 mb-3">
                            <p>{productDetail.description}</p>
                        </Col>

                        <Col className="col-12 mb-3">
                            <h4 className="mb-4">Meet-up</h4>
                            <p><FaMapMarkerAlt /> {`${productDetail.location.city.name}, ${productDetail.location.region.name}`}</p>
                        </Col>

                        <Col className="col-12 mb-3">
                            <h4 className="mt-1">Meet the seller</h4>
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
                                <Button onClick={handleChatInit} variant="btn btn-success" className="p-2 me-lg-2 mb-3 w-100">
                                    {chatInitLoading ? <Spinner animation='border' /> : 'No Chats yet - Promote'}
                                </Button>
                                {state?.user?.metaData?.id === productDetail?.userId && (
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
                                )}
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