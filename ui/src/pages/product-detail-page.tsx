import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components';
import { Loader } from '../components';
import { useAxios } from '../services';

const DeletedProductPlaceholder: React.FC = (): React.ReactElement => {
    return (
        <Container className="text-center">
            <Col>
                <img
                    width="50%"
                    height="50%"
                    src="/images/no-products-placeholder.png"
                />
            </Col>
            <p className="text-muted fw-bold">
                Oops! Product not found!
            </p>
        </Container>
    );
}

export const ProductDetailPage: React.FC = (): React.ReactElement => {

    const { productId, slug } = useParams<{ slug: string, productId: string }>();
    const [{ data, loading }] = useAxios({
        url: `product/${productId}`,
        method: 'GET',
    }, {
        manual: false,
    });

    return (
        <>
            {loading ?
                <Loader show={loading} /> : (
                    <>
                        {data?.deletedAt ? (
                            <DeletedProductPlaceholder />
                        ) : (
                            <ProductDetail productDetail={data?.product} />
                        )}
                    </>
                )}
        </>
    );
};
