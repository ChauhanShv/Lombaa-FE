import React, { useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { ProductDetailImageSlider, ProductDetailDescription } from '.';
import { ProductCard } from '../product-card';
import { ProductDetailProps } from './types';

export const ProductDetail: React.FC<ProductDetailProps> = ({
    productDetail
}: ProductDetailProps): React.ReactElement => {

    return (
        <>
            {!!productDetail?.productMedia.length && (
                <section className="pt-4 pb-5 mt-0 align-items-center">
                    <ProductDetailImageSlider
                        productMedia={productDetail?.productMedia}
                        productCategory={productDetail?.category}
                        productName={productDetail?.title}
                    />
                </section>
            )}
            {!!productDetail && (
                <section className=" pb-5">
                    <ProductDetailDescription productDetail={productDetail} />
                </section>
            )}
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Shop for Similar Products</h2>
                    <Row>
                        <Col sm={12}>
                            <Row className="post-list">
                                <Col md={6} lg={3} className="col-12 mb-3">
                                    <a href="#" className="ad-post bg-dark  p-4 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                        <p><i className="fas fa-plus-circle"></i></p>
                                        <h6>Want to see your stuff here ?</h6>
                                        <p>Sell things in your community. It's quick safe and local.</p>
                                        <p>
                                            <Button className="btn btn-success rounded px-3" variant="fullround">Post an Ad for free!</Button>
                                        </p>
                                    </a>
                                </Col>
                                <Col md={6} lg={3} className="mb-3">
                                    <ProductCard
                                        productId='1'
                                        slug='2'
                                        title="Special title treatment"
                                        summary='With supporting text below as a natural lead-in...'
                                        description='Ashanti, Greater Accra lorelpsum...'
                                        mediaSrc="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg"
                                        authorName='John Smith'
                                        authorProfilePicture='/images/user-circle.svg'
                                        postedOnDate=''
                                        isFavourite={false}
                                        onFavUnfav={(fav: boolean) => { }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}