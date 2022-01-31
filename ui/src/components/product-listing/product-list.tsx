import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card';
import { Loader } from '..';
import { useAxios } from '../../services';
import { useQuery } from '../../utils';
import { Product, ProductMedia } from './types';
import { ProductFilters } from '.';

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

export const ProductList: React.FC = (): React.ReactElement => {
    const query = useQuery();
    const lat = query.get("lat");
    const lng = query.get("lng");
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);

    const [{ data, loading }, refetch] = useAxios({
        url: `/category/${categoryId}/products?lat=${lat}&lng=${lng}`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.data?.products);
        }
    }, [data]);

    const onFilterChange = (filter: string) => {
        if (filter) {
            console.log('abhi', filter);
            refetch({
                url: `/category/${categoryId}/products?lat=${lat}&lng=${lng}&${filter}`
            });
        }
    };

    return (
        <Container className="">
            {categoryId && <ProductFilters categoryId={categoryId} onFilterChange={onFilterChange} />}
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
                            {/* <Col lg={12} className="py-3 text-center">
                                <button className="btn btn-outline-success rounded btn-fullround"> Load More</button>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}