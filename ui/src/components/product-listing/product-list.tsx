import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card/product-card';

export const ProductList = () => {

    const productCardContents = {
        productId: '4',
        title: "Special title treatment",
        summary: 'With supporting text below as a natural lead-in...',
        description: 'Ashanti, Greater Accra lorelpsum...',
        mediaType: "image",
        mediaSrc: "https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg",
        authorName: 'John Smith',
        authorProfilePicture: '/images/user-circle.svg',
        postedOnDate: 'Today',
        isFavourite: false,
        onFavUnfav: (fav: boolean) => { },
    };

    return (
        <Container className="">
            <section className="pb-5">
                <Row>
                    <Col sm={12}>
                        <Row className="post-list">
                            {[...Array(20)].map(() =>
                                <Col lg={3} md={4} className="col-md-6 mb-3">
                                    <ProductCard {...productCardContents} />
                                </Col>
                            )};
                            <Col lg={12} className="py-3 text-center">
                                <button className="btn btn-outline-success rounded btn-fullround"> Load More</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}