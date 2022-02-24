import React, { useEffect, useState } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoCaretBack, IoCaretForward } from 'react-icons/io5';
import { useAxios } from '../../services';
import { ProductCard } from '../product-card';
import { LookalikeProductsProps, ProductMedia, Product } from './types';

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

const lookalikeSliderSettings = {
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    prevArrow: <IoCaretBack fill="green" />,
    nextArrow: <IoCaretForward fill="green" />,
    infinite: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export const LookalikeProducts: React.FC<LookalikeProductsProps> = ({
    productId,
}: LookalikeProductsProps): React.ReactElement => {

    const [lookalikeProducts, setLookalikeProducts] = useState<Product[]>([]);
    const [{ data, loading, error }, execute] = useAxios({
        url: `/product/${productId}/similar?offset=0&limit=8`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setLookalikeProducts(data?.products);
        }
    }, [data]);

    return (
        <Slider {...lookalikeSliderSettings}>
            {loading ? <Spinner animation="grow" /> : lookalikeProducts?.map((product: Product) =>
                <Col className="px-2" key={product?.id}>
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
        </Slider>
    );
}