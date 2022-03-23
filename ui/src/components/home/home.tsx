import React from 'react';
import { Link } from 'react-router-dom';
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
    const category: Category[] = state?.category.filter((cat: Category) => cat.subCategories.length);
    const [{ data, loading }] = useAxios({
        url: '/product',
        method: 'GET',
    }, { manual: false });

    return (
        <>
            <section className="pt-4 pb-5 mt-0 align-items-center">
                <Container>
                    <Row className="mt-auto">
                        <Col lg={8} sm={12} className="">
                            <Slider className="homespot-slider" {...Spotsettings}>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
                                <div>
                                    <img className="d-block w-100" src="/images/slide.png" alt="First slide" />
                                </div>
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
                                <Col lg={3} className="col-12 mb-3">
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
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
