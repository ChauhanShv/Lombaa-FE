import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card';
import { useAxios } from '../../services';
import { Product, ProductMedia } from './types';

export const ProductList: React.FC = (): React.ReactElement => {

    const [products, setProducts] = useState<Product[]>([]);
    const [productMedia, setProductMedia] = useState<ProductMedia[]>([]);

    const productCardContents = {
        summary: 'With supporting text below as a natural lead-in...',
        description: 'Ashanti, Greater Accra lorelpsum...',
    };

    const [{ data, loading, error }, execute] = useAxios({
        url: '/category/32983174-3f21-49b2-8143-5ae77a363a26/products',
        method: 'GET',
    });

    useEffect(() => {
        if (data?.success) {
            const getProductMedia: ProductMedia[] | undefined = [];
            setProducts(data?.data?.Products);
            if (products) {
                products.map((product: Product) => {
                    getProductMedia.push(product?.productMedia?.find((media) => media.isPrimary) || productMedia[0]);
                });
                setProductMedia(getProductMedia);
            }
        }
    }, [data, products]);


    useEffect(() => {
        execute({});
    }, []);

    return (
        <Container className="">
            <section className="pb-5">
                <Row>
                    <Col sm={12}>
                        <Row className="post-list">
                            {products.map((product: Product, index: number) =>
                                <Col lg={3} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        slug={product?.slug}
                                        title={product?.title}
                                        mediaSrc={productMedia[index]?.file?.url}
                                        authorName={product?.user?.name}
                                        authorProfilePicture={product?.user?.profilePicture?.url || '/images/user-circle.svg'}
                                        postedOnDate={moment(product?.postedAt).format('LL')}
                                        isFavourite={false}
                                        onFavUnfav={(fav: boolean) => { }}
                                        {...productCardContents}
                                    />
                                </Col>
                            )}
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