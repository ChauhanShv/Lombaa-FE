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

const LIMIT: number = 24;
export const ProductList: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const { session: { lat, lng } } = state;
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [offset, setOffset] = useState<number>(0);

    const getApiUrl = (): string => {
        if (lat && lng) {
            return `/category/${categoryId}/products?lat=${lat}&lng=${lng}`;
        }
        return `/category/${categoryId}/products?`;
    };

    const [{ data, loading }, refetch] = useAxios({
        url: getApiUrl(),
        method: 'GET',
        params: {
            offset: 0,
            limit: LIMIT,
        },
    }, {
        manual: false,
    });

    useEffect(() => {
        setOffset(0);
        if (state.session.lat && state.session.lng) {
            refetch({
                url: getApiUrl(),
                params: {
                    offset: 0,
                    limit: LIMIT,
                }
            });
        }
    }, [state.session.lat, state.session.lng]);

    useEffect(() => {
        if (data?.success) {
            if (offset === 0) {
                setProducts(data?.data?.products);
            } else {
                setProducts([...products, ...data?.data?.products]);
            }
        }
    }, [data]);

    const getMoreProducts = (start: number = 0) => {
        if (offset >= 0) {
            refetch({
                url: getApiUrl(),
                params: {
                    offset: start,
                    limit: LIMIT,
                },
            });
        }
    };

    const handleShowMoreProducts = () => {
        getMoreProducts(offset + LIMIT);
        setOffset(offset + LIMIT);
    }

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
                            {!products.length && !loading && (
                                <div className='text-center'>
                                    <img className="w-25" src='/images/no-products-placeholder.png' />
                                    <p className="text-muted mt-4">No products available to show</p>
                                </div>
                            )}
                            {!!products.length && products.map((product: Product) =>
                                <Col xl={3} lg={4} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        slug={product?.slug}
                                        title={product?.title}
                                        location={`${product?.location?.city?.name}, ${product?.location?.region?.name}`}
                                        price={product?.price ? `${product?.location?.country?.currencySymbol} ${product?.price}` : ''}
                                        mediaSrc={getPrimaryMedia(product.productMedia)}
                                        authorName={product?.user?.name}
                                        authorProfilePicture={product?.user?.profilePicture?.url || '/images/user-circle.svg'}
                                        postedOnDate={product?.postedAt}
                                        isFavourite={product?.isFavorite}
                                        onFavUnfav={(fav: boolean) => { }}
                                    />
                                </Col>
                            )}
                            {loading && (
                                <ProductSkeletonLoader />
                            )}
                            {!!products.length && (
                                <Col lg={12} className="py-3 text-center">
                                    <button
                                        onClick={handleShowMoreProducts}
                                        className="btn btn-outline-success rounded btn-fullround"
                                    >
                                        Load More
                                    </button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}