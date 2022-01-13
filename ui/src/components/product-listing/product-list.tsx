import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../product-card/product-card';
import { useAxios } from '../../services';
import { Product } from './types';

export const ProductList: React.FC = (): React.ReactElement => {

    const [products, setProducts] = useState<Product[]>([]);

    const productCardContents = {
        summary: 'With supporting text below as a natural lead-in...',
        description: 'Ashanti, Greater Accra lorelpsum...',
        mediaType: "image",
        mediaSrc: "https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg",
        authorProfilePicture: '/images/user-circle.svg',
        postedOnDate: 'Today',
        isFavourite: false,
        onFavUnfav: (fav: boolean) => { },
    };

    const [{ data, loading, error }, execute] = useAxios({
        url: '/category/32983174-3f21-49b2-8143-5ae77a363a26/products',
        method: 'GET',
    });

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.data?.Products);
        }
    }, [data]);

    useEffect(() => {
        execute({});
    }, []);

    return (
        <Container className="">
            <section className="pb-5">
                <Row>
                    <Col sm={12}>
                        <Row className="post-list">
                            {products.map((product: Product) =>
                                <Col lg={3} md={6} className="mb-3" key={product?.id}>
                                    <ProductCard
                                        productId={product?.id}
                                        title={product?.title}
                                        authorName={product?.user?.name}
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