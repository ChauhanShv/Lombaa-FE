import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { ProductCard } from '../product-card';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { Budget, Product, ProductMedia } from './types';
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
    const [budget, setBudget] = useState<Budget>({});

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
                    ...(budget.min || budget.max) && { price: `${budget.min},${budget.max}` },
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
                    ...(budget.min || budget.max) && { price: `${budget.min},${budget.max}` },
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
                url: `${getApiUrl()}&${filter}`,
                params: {
                    offset: offset,
                    limit: LIMIT,
                    ...(budget.min || budget.max) && { price: `${budget.min},${budget.max}` },
                },
            });
        } else {
            refetch({
                url: `/category/${categoryId}/products?${filter}`,
                params: {
                    offset: offset,
                    limit: LIMIT,
                    ...(budget.min || budget.max) && { price: `${budget.min},${budget.max}` },
                },
            });
        }
    };

    const onBudgetChange = (price: Budget) => {
        setBudget({ ...price });
        refetch({
            url: getApiUrl(),
            params: {
                offset: 0,
                limit: LIMIT,
                ...(price.min || price.max) && { price: `${price.min},${price.max}` },
            },
        });
    }

    return (
        <Container className="">
            {categoryId &&
                <ProductFilters
                    categoryId={categoryId}
                    onFilterChange={onFilterChange}
                    onBudgetChange={onBudgetChange}
                />
            }
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
                                        userId={product?.userId}
                                        isFavourite={product?.isFavorite}
                                        onFavUnfav={(fav: boolean) => { }}
                                        boosted={product?.boosted}
                                    />
                                </Col>
                            )}
                            {loading && (
                                <div className="py-4">
                                    <LinearProgress />
                                </div>
                            )}
                            {!!products.length && products.length === LIMIT && (
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