import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components';
import { Loader } from '../components';
import { useAxios } from '../services';

export const ProductDetailPage: React.FC = (): React.ReactElement => {
    //34bac1ec-8d17-467e-936e-0545d222093b
    const { productId, slug } = useParams<{ slug: string, productId: string }>();
    const [{ data, loading }] = useAxios({
        url: `product/${productId}`,
        method: 'GET',
    }, {
        manual: false,
    });

    return (
        <>
            {loading ? <Loader show={loading} /> : <ProductDetail productDetail={data?.product} />}
        </>
    );
};
