import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { ProductDetailImageSlider, ProductDetailDescription, LookalikeProducts } from '.';
import { ProductDetailProps } from './types';

export const ProductDetail: React.FC<ProductDetailProps> = ({
    productDetail
}: ProductDetailProps): React.ReactElement => {

    return (
        <>
            <Container className="mt-3 mb-1">
                <Row>
                    <Breadcrumbs separator=">" aria-label="breadcrumb">
                        <Link key="1" color="inherit" to="/">
                            Home
                        </Link>
                        <Link key="2" color="inherit" to={`/product-listing/${productDetail?.categoryId}`}>
                            {productDetail?.category?.name}
                        </Link>
                        <Link key="3" color="inherit" to="#">
                            {productDetail?.title}
                        </Link>
                    </Breadcrumbs>
                </Row>
            </Container>
            {!!productDetail?.productMedia.length && (
                <section className="pt-2 pb-3 mt-0 align-items-center">
                    <ProductDetailImageSlider
                        productMedia={productDetail?.productMedia}
                        isFavourite={productDetail?.favourite}
                        productName={productDetail?.title}
                        productId={productDetail?.id}
                    />
                </section>
            )}
            {!!productDetail && (
                <section className="pb-5">
                    <ProductDetailDescription productDetail={productDetail} />
                </section>
            )}
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Shop for Similar Products</h2>
                    <Row className="post-list">
                        <Col xs={11} className="mx-auto">
                            <LookalikeProducts productId={productDetail?.id} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}