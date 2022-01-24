import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Breadcrumbs, Link } from '@mui/material';
import { FaShare, FaHeart, FaImages } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './product-detail.css';
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
    productCategory,
    productName,
}: ProductDetailImageSliderProps): React.ReactElement => {

    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Breadcrumbs separator=">" aria-label="breadcrumb">
                        <Link underline="hover" key="1" color="inherit" href="/">{productCategory.name}</Link>
                        <Link underline="hover" key="2" color="inherit" href="/product-listing">{productCategory.description}</Link>
                        <Link underline="hover" key="3" color="inherit" href="#">{productName}</Link>
                    </Breadcrumbs>
                </Row>
                <Row className="mt-auto">
                    <Col lg={12} sm={12} className="position-relative">
                        <Slider className="ad-slider" {...AdSpotsettings}>
                            {productMedia?.map((media: ProductMedia) =>
                                <div key={media?.fileId}>
                                    {media?.file?.mime?.includes('video') ? (
                                        <video className='d-block w-100' controls>
                                            <source src={media?.file?.url} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img className="d-block w-100" src={media?.file?.url} alt="First slide" />
                                    )}
                                </div>
                            )}
                        </Slider>
                        <div className="btns-over">
                            <button className="icon-btn btn-like"><FaShare /> Share</button>
                            <button className="icon-btn btn-like" id="fav"><FaHeart /> Like</button>
                        </div>
                        <div className="btns-over bottom">
                            <button className="icon-btn" ><FaImages />{' '}{productMedia?.length}{' Images'}</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}