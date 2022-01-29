import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card';
import { Loader } from '..';
import { useAxios } from '../../services';
import { Product, ProductMedia } from './types';

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

export const ProductList: React.FC = (): React.ReactElement => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);

    const [{ data, loading }] = useAxios({
        url: `/category/${categoryId}/products`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.data?.products);
        }
    }, [data]);

    return (
        <Container className="">
            <section className="pb-5">
                <Row>
                    <Col sm={12}>
                        <Row className="post-list">
                            {loading ? (
                                <Loader show={loading} />
                            ) : products.map((product: Product) =>
                                <Col lg={3} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        slug={product?.slug}
                                        title={product?.title}
                                        description={product?.description}
                                        summary=""
                                        mediaSrc={getPrimaryMedia(product.productMedia)}
                                        authorName={product?.user?.name}
                                        authorProfilePicture={product?.user?.profilePicture?.url || '/images/user-circle.svg'}
                                        postedOnDate={product?.postedAt}
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