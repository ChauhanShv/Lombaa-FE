import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAxios } from '../../services';
import { ProductCard } from '../product-card';
import { useAppContext } from '../../contexts';
import { Category } from '../../types';
import { Loader } from '..';
import { Product, ProductMedia } from '../product-listing/types';
import { Banner } from './types';
import './home.css';

const Spotsettings = {
    dots: true,
}
const CatCarSettings = {
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: false,
    variableWidth: true,
    arrows: true,
};

const getPrimaryMedia = (media: ProductMedia[]): string =>
    media.filter((m: ProductMedia) => m.isPrimary)[0]?.file.url || '';

export const HomeComponent: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const { session: { lat, lng } } = state;
    const navigate = useHistory();
    const category: Category[] = state?.category.filter((cat: Category) => cat.subCategories.length);
    const [bannerData, setBannerData] = useState<Banner[]>([]);
    const [{ data, loading }, execute] = useAxios({
        url: '/product',
        method: 'GET',
    }, { manual: false });
    const [{ data: bannerResponse, loading: bannerLoading }] = useAxios({
        url: '/banner',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (state.session.lat && state.session.lng) {
            execute({
                url: `/product?lat=${lat}&lng=${lng}`,
                method: 'GET',
            });
        }
    }, [state.session.lat, state.session.lng]);
    useEffect(() => {
        if (bannerResponse?.success) {
            setBannerData(bannerResponse?.data);
        }
    }, [bannerResponse]);

    const handleBannerLabelClick = (event: any, banner: Banner) => {
        if (banner.action_type === 'in-site-url') {
            navigate.push(`${banner.action}`);
        } else {
            const newWindow = window.open(`${banner.action}`, '_blank');
            newWindow?.focus();
        }
    };

    return (
        <>
            <section className="py-4 mt-0 align-items-center">
                <Container>
                    <Row className="mt-auto">
                        <Col lg={8} sm={12} className="">
                            <Slider className="homespot-slider" {...Spotsettings}>
                                {!!bannerData.length && bannerData?.map((banner: Banner) =>
                                    <div key={banner?.id}>
                                        <div
                                            onClick={(e) => handleBannerLabelClick(e, banner)}
                                            className='homepage-banner-slide-image w-100 d-flex flex-column justify-content-center'
                                            style={{ backgroundImage: `url(${banner?.media?.url})` }}
                                        >
                                            <div className='d-flex flex-column align-items-center'>
                                                <div className='h-100'>
                                                    <p className="p-3 fw-bold rounded text-light bg-dark">
                                                        {banner?.description}
                                                    </p>
                                                    <p className="fw-bold fs-2 text-light">
                                                        {banner?.title}
                                                    </p>
                                                    <Button
                                                        onClick={(event) => handleBannerLabelClick(event, banner)}
                                                        className="fst-normal btn-fullround"
                                                        variant="success"
                                                    >
                                                        {banner?.action_label}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Slider>
                        </Col>
                        <Col lg={4} sm={12} className="align-items-center d-flex">
                            <div className="p-4">
                                <h3>Buy and sell quickly, safely and locally!</h3>
                                <p>Find just about anything using the app on your mobile.</p>
                                <Button variant="link" className="p-0 me-lg-2">
                                    <img className="d-block mw-100" width="125" src="/images/appstore.png" alt="App Store" />
                                </Button>
                                <Button variant="link" className="p-0">
                                    <img className="d-block mw-100" width="125" src="/images/googleplay.png" alt="Google Play" />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className=" pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Explore Lombaa</h2>
                    <Row>
                        <Col className="col-10 col-md-11 mx-auto">
                            <Slider className="cat-slider" {...CatCarSettings}>
                                {
                                    category?.map((cat: Category) => (
                                        <div key={cat.id}>
                                            <Link to={`/product-listing/${cat.subCategories[0].id}`} className="cat-item">
                                                <p className="w-100">
                                                    <img width="64" height="64" src={cat.icon?.url} />
                                                </p>
                                                <p className="w-100">{cat.name}</p>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="pb-5">
                <Container>
                    <h2 className="text-secondary mb-3">Hot Deals</h2>
                    <Row>
                        <Col sm={12}>
                            <Row className="post-list">
                                <Col xl={3} lg={4} md={6} className="col-12 mb-3">
                                    <Link to="/create-post" className="product-post bg-dark  p-4 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                        <p><i className="fas fa-plus-circle"></i></p>
                                        <h6>Want to see your stuff here ?</h6>
                                        <p>Sell things in your community. It's quick safe and local.</p>
                                        <Button className="btn btn-success rounded px-3" variant="fullround">
                                            Post an Ad for free!
                                        </Button>
                                    </Link>
                                </Col>
                                {loading ? (
                                    <Loader show={loading} />
                                ) : data?.product.map((product: Product) =>
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
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
