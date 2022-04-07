import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card';
import { ProductSkeletonLoader } from '..';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { Product, ProductMedia } from './types';
import { ProductFilters } from '.';

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

export const ProductList: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const { session: { lat, lng } } = state;
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);

    const getApiUrl = (): string => {
        if (lat && lng) {
            return `/category/${categoryId}/products?lat=${lat}&lng=${lng}`;
        }
        return `/category/${categoryId}/products?`;
    };

    const [{ data, loading }, refetch] = useAxios({
        url: getApiUrl(),
        method: 'GET',
    }, {
        manual: false,
    });

    useEffect(() => {
        if (state.session.lat && state.session.lng) {
            refetch({
                url: getApiUrl(),
            });
        }
    }, [state.session.lat, state.session.lng]);

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.data?.products);
        }
    }, [data]);

    const onFilterChange = (filter: string) => {
        if (filter && state.session.lat && state.session.lng) {
            refetch({
                url: `${getApiUrl()}&${filter}`
            });
        } else {
            refetch({
                url: `/category/${categoryId}/products?${filter}`
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
                                <ProductSkeletonLoader />
                            ) : !products.length ? (
                                <div className='text-center'>
                                    <img className="w-25" src='/images/no-products-placeholder.png' />
                                    <p className="text-muted mt-4">No products available to show</p>
                                </div>
                            ) : (products.map((product: Product) =>
                                <Col xl={3} lg={4} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        slug={product?.slug}
                                        title={product?.title}
                                        location={`${product?.location?.city?.name} ${product?.location?.region?.name}`}
                                        price={product?.price ? `${product?.location?.country?.currencySymbol} ${product?.price}` : ''}
                                        mediaSrc={getPrimaryMedia(product.productMedia)}
                                        authorName={product?.user?.name}
                                        authorProfilePicture={product?.user?.profilePicture?.url || '/images/user-circle.svg'}
                                        postedOnDate={product?.postedAt}
                                        isFavourite={product?.isFavorite}
                                        onFavUnfav={(fav: boolean) => { }}
                                    />
                                </Col>
                            ))}
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