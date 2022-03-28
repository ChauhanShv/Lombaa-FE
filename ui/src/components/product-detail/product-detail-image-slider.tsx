import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShare, FaHeart, FaImages } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './product-detail.css';
import { ProductShareModal } from '.';
import { ProductDetailImageSliderProps, ProductMedia } from './types';

const AdSpotsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export const ProductDetailImageSlider: React.FC<ProductDetailImageSliderProps> = ({
    productMedia,
}: ProductDetailImageSliderProps): React.ReactElement => {

    const [isShreModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    return (
        <Container>
            {isShreModalOpen && (
                <ProductShareModal onClose={() => setIsShareModalOpen(false)} />
            )}
            <Row className="mt-auto">
                <Col lg={12} sm={12} className="position-relative">
                    <Slider className="product-slider" {...AdSpotsettings}>
                        {productMedia?.map((media: ProductMedia) =>
                            <div key={media?.fileId}>
                                {media?.file?.mime?.includes('video') ? (
                                    <video className='d-block w-100' controls>
                                        <source src={media?.file?.url} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div>
                                        <img
                                            className="d-block w-100 product-slide-bg"
                                            src={media?.file?.url}
                                            alt="background-slide-img"
                                        />
                                        <img
                                            className="d-block w-100 product-slide-image"
                                            src={media?.file?.url}
                                            alt={`Slide - ${media?.id}`}
                                        />
                                    </div>

                                )}
                            </div>
                        )}
                    </Slider>
                    <div className="btns-over">
                        <button onClick={() => setIsShareModalOpen(true)} className="icon-btn btn-like">
                            <FaShare /> Share
                        </button>
                        <button className="icon-btn btn-like" id="fav">
                            <FaHeart /> Like
                        </button>
                    </div>
                    <div className="btns-over bottom">
                        <button className="icon-btn" >
                            <FaImages />
                            {' '}{productMedia?.length}{' Images'}
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}