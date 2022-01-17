import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ProductCard } from '../components/product-card/product-card';
import { ProductDetailImageSlider, ProductDetailDescription } from '../components/product-detail';

export const AdDetailPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <section className="pt-4 pb-5 mt-0 align-items-center">
                <ProductDetailImageSlider />
            </section>
            <section className=" pb-5">
                <ProductDetailDescription />
            </section>
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Hot Deals</h2>
                    <Row>
                        <Col sm={12}>
                            <Row className="post-list">
                                <Col md={3} className="col-12 mb-3">
                                    <a href="#" className="ad-post bg-dark  p-4 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                        <p><i className="fas fa-plus-circle"></i></p>
                                        <h6>Want to see your stuff here ?</h6>
                                        <p>Sell things in your community. It's quick safe and local.</p>
                                        <p>
                                            <Button className="btn btn-success rounded px-3" variant="fullround">Post an Ad for free!</Button>
                                        </p>
                                    </a>
                                </Col>
                                <Col md={3} className="col-6 mb-3">
                                    <ProductCard
                                        productId='1'
                                        title="Special title treatment"
                                        summary='With supporting text below as a natural lead-in...'
                                        description='Ashanti, Greater Accra lorelpsum...'
                                        mediaType="image"
                                        mediaSrc="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg"
                                        authorName='John Smith'
                                        authorProfilePicture='/images/user-circle.svg'
                                        postedOnDate=''
                                        isFavourite={false}
                                        onFavUnfav={(fav: boolean) => { }}
                                    />
                                </Col>
                                <Col md={3} className="col-6 mb-3">
                                    <ProductCard
                                        productId='2'
                                        title="New Title"
                                        summary='Summary Text'
                                        description='Ashanti, Greater Accra lorelpsum...'
                                        mediaType="image"
                                        mediaSrc="https://static3.srcdn.com/wordpress/wp-content/uploads/2021/04/Older-Games-With-Great-Graphics-Far-Cry-2.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5"
                                        authorName='John Wick'
                                        authorProfilePicture='/images/user-circle.svg'
                                        postedOnDate=''
                                        isFavourite={false}
                                        onFavUnfav={(fav: boolean) => { }}
                                    />
                                </Col>
                                <Col md={3} className="col-6 mb-3">
                                    <ProductCard
                                        productId='3'
                                        title="Counter Strike"
                                        summary="Global Offensive"
                                        description="Counter Strike Global Offensive"
                                        mediaType="image"
                                        mediaSrc='https://www.cswarzone.com/wp-content/uploads/2020/10/fps-guide.jpg'
                                        authorName='Kenny S'
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
};
