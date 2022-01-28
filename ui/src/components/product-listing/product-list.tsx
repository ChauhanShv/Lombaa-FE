import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card';
import { Loader } from '..';
import { useAxios } from '../../services';
import { Product, ProductMedia } from './types';
import { ProductFilters } from '.';

export const ProductList: React.FC = (): React.ReactElement => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [productMedia, setProductMedia] = useState<ProductMedia[]>([]);

    const [{ data, loading, error }, execute] = useAxios({
        url: `/category/${categoryId}/products?sortby=pric&sortorder=dsc&filter=Brand$Tvs|Type$twowheeler,fourwheeler`,
        method: 'GET',
    });

    useEffect(() => {
        if (data?.success) {
            const getProductMedia: ProductMedia[] | undefined = [];
            setProducts(data?.data?.products);
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
    }, [categoryId]);

    return (
        <Container className="">
            <ProductFilters productList={products} />
            <section className="pb-5">
                <Row>
                    <Col sm={12}>
                        <Row className="post-list">
                            {loading ? (
                                <Loader show={loading} />
                            ) : products.map((product: Product, index: number) =>
                                <Col lg={3} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        slug={product?.slug}
                                        title={product?.title}
                                        description={product?.description}
                                        summary=""
                                        mediaSrc={productMedia[index]?.file?.url}
                                        authorName={product?.user?.name}
                                        authorProfilePicture={product?.user?.profilePicture?.url || '/images/user-circle.svg'}
                                        postedOnDate={moment(product?.postedAt).format('LL')}
                                        isFavourite={product?.isFavorite}
                                        onFavUnfav={(fav: boolean) => { }}
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