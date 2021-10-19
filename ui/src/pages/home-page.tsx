import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { CategoryList, HomeBanner, ImageCarousel, ProductTile } from '../components/layout';

export const HomePage: React.FC = ():React.ReactElement => {
    return (
        <>
            <HomeBanner />
            <Container>
                <Row>
                    <Col lg={3} sm={12}>
                        <CategoryList />
                    </Col>
                    <Col lg={9} sm={12}>
                        <ImageCarousel />
                    </Col>
                    <Col lg={3}>
                    </Col>
                    <Col lg={9} sm={12}>
                        <ProductTile />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
