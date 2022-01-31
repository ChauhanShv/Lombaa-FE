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
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentLocation, setCurrentLocation] = useState<any>({
        lat: query.get('lat'),
        lng: query.get('lng'),
    });

    const [{ data, loading }, refetch] = useAxios({
        url: `/category/${categoryId}/products`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.data?.products);
        }
    }, [data]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            navigator.permissions.query({
                name: 'geolocation',
            }).then((result) => {
                if (result.state == 'granted') {
                    refetch({
                        url: `/category/${categoryId}/products?lat=${currentLocation.lat}&lng=${currentLocation.lng}`
                    })
                }
                result.onchange = () => {
                    refetch({
                        url: `/category/${categoryId}/products?lat=${currentLocation.lat}&lng=${currentLocation.lng}`
                    })
                }
            });
        }, () => {
            setCurrentLocation({
                lat: query.get('lat'),
                lng: query.get('lng'),
            })
        });
    }, []);

    const onFilterChange = (filter: string) => {
        if (filter) {
            refetch({
                url: `/category/${categoryId}/products?lat=${currentLocation.lat}&lng=${currentLocation.lng}&${filter}`
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
                            ) : !products.length ? (
                                <div className='text-center'>
                                    <img className="w-50" src='/images/placeholder-image.jpg' />
                                    <p className="text-muted mt-4">No products available to show</p>
                                </div>
                            ) : (products.map((product: Product) =>
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