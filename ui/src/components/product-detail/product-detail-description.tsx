import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import { FaAsterisk, FaHandshake, FaMapMarkerAlt, FaEdit, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { SellerDetailCard, ReportAbuseModal } from '.';
import { ProductFields, ProductDetailDescriptionProps, AlertPopupState } from './types';
import { ActionTypes, useAppContext } from '../../contexts';
import { useAxios } from '../../services';
import { AlertPopup } from '../alert-popup';
import { ModalType } from '../../types';
import './product-detail.css';

export const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({
    productDetail
}: ProductDetailDescriptionProps): React.ReactElement => {
    const [isMarkSolded, setIsMarkSolded] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [showReportAbuseModal, setShowReportAbuseModal] = useState<boolean>(false);
    const [showAlertPopup, setShowAlertPopup] = useState<AlertPopupState>({
        markSold: false,
        delete: false,
    });
    const { state, dispatch } = useAppContext();
    const currentUserId = state?.user?.metaData?.id;
    const navigate = useHistory();
    const [{ data, loading }, executeSoldProduct] = useAxios({
        url: `/product/${productDetail.id}`,
        method: 'POST',
    });
    const [{ data: chatInitResponse, loading: chatInitLoading }, executeChatInit] = useAxios({
        url: `/chat/init`,
        method: 'POST',
    });
    const [{ data: deleteProductRes, loading: deleteProductLoading }, executeDeleteProduct] = useAxios({
        url: '/product/delete',
        method: 'DELETE',
    });

    useEffect(() => {
        if (chatInitResponse?.success) {
            navigate.push(`/chat/buy/${chatInitResponse?.data?.id}`);
        }
    }, [chatInitResponse]);

    useEffect(() => {
        if (data?.success) {
            setIsMarkSolded(true);
        }
    }, [data]);

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

    const onOkayPressedForMarkSolded = () => {
        executeSoldProduct({});
        setShowAlertPopup({
            markSold: false,
            delete: false,
        });
    }
    const onOkayPressedForDelete = () => {
        executeDeleteProduct({
            data: {
                id: productDetail?.id,
            }
        });
    }
    const onClosePressed = () => {
        setShowAlertPopup({
            markSold: false,
            delete: false,
        });
    }
    const showMoreContent = () => {
        if (showMore) {
            return true;
        } else return false;
    };

    return (
        <Container>
            <Row>
                {showAlertPopup.markSold && (
                    <AlertPopup
                        title={'Mark Product Solded?'}
                        description={"You won't be able to chat with your client and sell this product anymore"}
                        onOk={onOkayPressedForMarkSolded}
                        onClose={onClosePressed}
                    />
                )}
                {showAlertPopup.delete && (
                    <AlertPopup
                        title={'Delete Product?'}
                        description={"Are you sure? Your clients won't be able to see this product and will be removed from your profile list as well."}
                        onOk={onOkayPressedForDelete}
                        onClose={onClosePressed}
                    />
                )}
                {showReportAbuseModal && (
                    <ReportAbuseModal
                        onClose={() => setShowReportAbuseModal(false)}
                        onReport={() => { }}
                    />
                )}
                <Col lg={8} md={11} className="mx-auto">
                    <h1 className="h2 text-dark mb-2">{productDetail.title}</h1>
                    <h2 className="text-success m-0">
                        {productDetail.location.country.currencySymbol}{' '}{productDetail.price}
                    </h2>
                    <Row className="border-bottom py-3 mb-4">
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
                            <Col xs={6} md={4}>
                                <p className="text-muted m-0">Posted</p>
                                <Col>
                                    <p>{moment(productDetail?.postedAt).format('LL')}</p>
                                </Col>
                            </Col>
                            {productDetail.productFields?.map((productField: ProductFields, index: number) =>
                                <React.Fragment key={index}>
                                    {!['title', 'price'].includes(productField.field.fieldType) && (
                                        <Col xs={6} md={4}>
                                            <p className='text-muted m-0'>{productField.field.label}</p>
                                            <Col>
                                                <p>{productField.value}</p>
                                            </Col>
                                        </Col>
                                    )}
                                </React.Fragment>
                            )}
                        </Row>

                        {productDetail.productFields?.map((productField: ProductFields, index: number) =>
                            <React.Fragment key={index}>
                                {['description'].includes(productField.field.fieldType) && (
                                    <Col>
                                        <p>
                                            {(productField.value && productField.value.length > 200) ? (
                                                <>{showMoreContent() ? productField.value : productField.value.substring(0, 150)}</>
                                            ) : (
                                                <>{productField?.value}</>
                                            )}
                                        </p>
                                        {productField.value && productField.value.length > 200 && (
                                            <Link to="#" onClick={() => setShowMore(!showMore)}>
                                                {showMoreContent() ? 'Show Less' : 'Show More ...'}
                                            </Link>
                                        )}
                                    </Col>
                                )}
                            </React.Fragment>
                        )}

                        <Col className="col-12 mb-3 mt-5">
                            <h4 className="mb-4">Meet-up</h4>
                            <p>
                                <FaMapMarkerAlt />
                                {`${productDetail.location.city.name}, ${productDetail.location.region.name}`}
                            </p>
                        </Col>

                        <Col className="col-12 mb-3">
                            <h4 className="mt-1">Meet the seller</h4>
                            <SellerDetailCard
                                userId={productDetail?.userId}
                                user={productDetail?.user}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} sm={12} className="d-flex flex-wrap flex-column">
                    <div className="p-4 w-100">
                        <Link
                            to={currentUserId === productDetail?.userId ? '/profile' : `/profile/${productDetail?.userId}`}
                            className="p-0 mb-3 usermeta d-block"
                        >
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
                                <h4 className="text-white text-center">
                                    This product is out of stock
                                </h4>
                            </div>
                        ) : (

                            <>
                                {currentUserId !== productDetail?.userId && (
                                    <>
                                        <Button
                                            onClick={handleChatInit}
                                            variant="btn btn-success"
                                            className="p-2 me-lg-2 mb-3 w-100"
                                        >
                                            {chatInitLoading ?
                                                <Spinner animation='border' /> :
                                                'Chat with seller'
                                            }
                                        </Button>
                                        <Button
                                            variant="btn btn-danger"
                                            className="w-100"
                                            onClick={() => setShowReportAbuseModal(true)}
                                        >
                                            Report Abuse
                                        </Button>
                                    </>
                                )}
                                {currentUserId === productDetail?.userId && (
                                    <ListGroup className="product-auth">
                                        <Link to={`/edit-post/${productDetail?.id}`}>
                                            <ListGroup.Item className="text-gray" action>
                                                <FaEdit className="me-2" />
                                                Edit Listing
                                            </ListGroup.Item>
                                        </Link>
                                        <ListGroup.Item className="text-gray d-none" action>
                                            <FaCheckCircle className="me-2" />
                                            Mark as Reserved
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            className="text-gray"
                                            onClick={() => setShowAlertPopup({
                                                ...showAlertPopup,
                                                markSold: true,
                                            })}
                                            action
                                        >
                                            <FaHandshake className="me-2" />
                                            Mark as Sold
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            className="text-danger"
                                            onClick={() => setShowAlertPopup({
                                                ...showAlertPopup,
                                                delete: true
                                            })}
                                            action
                                        >
                                            <FaTrashAlt className="me-2" />
                                            Delete
                                        </ListGroup.Item>
                                    </ListGroup>
                                )}
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};