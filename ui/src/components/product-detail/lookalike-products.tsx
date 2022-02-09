import React, { useEffect, useState } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { useAxios } from '../../services';
import { ProductCard } from '../product-card';
import { LookalikeProductsProps, ProductMedia, Product } from './types';

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

export const LookalikeProducts: React.FC<LookalikeProductsProps> = ({
    productId,
}: LookalikeProductsProps): React.ReactElement => {

    const [lookalikeProducts, setLookalikeProducts] = useState<Product[]>([]);
    const [{ data, loading, error }, execute] = useAxios({
        url: `/product/${productId}/similar?offset=0&limit=4`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setLookalikeProducts(data?.products);
        }
    }, [data]);

    return (
        <>
            {loading ? <Spinner animation="grow" /> : lookalikeProducts?.map((product: Product) =>
                <Col lg={3} md={6}>
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
                        isFavourite={product?.isFavorite || false}
                        onFavUnfav={(fav: boolean) => { }}
                    />
                </Col>
            )}
        </>
    );
}