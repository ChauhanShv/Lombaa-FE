import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductCard } from '../components/product-card/product-card';

import './home-page.css';


const Spotsettings = {
    dots: true,
}
const CatCarSettings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                rows: 2,
                slidesPerRow: 2,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
export const HomePage: React.FC = (): React.ReactElement => {

    const [favourite, setFavourite] = React.useState<any>({ fav: false, productId: '' });

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
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="" className="cat-item">
                                        <p className="w-100"><img width="64" height="64" src=" https://dummyimage.com/100/007bff/efefef" /></p>
                                        <p className="w-100">Vehicles</p>
                                    </Link>
                                </div>
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
                                    <Link to="/create-post" className="ad-post bg-dark  p-4 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                                        <p><i className="fas fa-plus-circle"></i></p>
                                        <h6>Want to see your stuff here ?</h6>
                                        <p>Sell things in your community. It's quick safe and local.</p>
                                        <Button className="btn btn-success rounded px-3" variant="fullround">
                                            Post an Ad for free!
                                        </Button>
                                    </Link>
                                </Col>
                                <Col lg={3} md={6} className="mb-3">
                                    <ProductCard
                                        productId='4'
                                        title="Special title treatment"
                                        summary='With supporting text below as a natural lead-in...'
                                        description='Ashanti, Greater Accra lorelpsum...'
                                        mediaType="image"
                                        mediaSrc="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2014/04/18130043/online-gamer-threats-featured.jpg"
                                        authorName='John Smith'
                                        authorProfilePicture='/images/user-circle.svg'
                                        postedOnDate=''
                                        isFavourite={favourite.fav && favourite.productId === '4'}
                                        onFavUnfav={(fav: boolean) => setFavourite({ fav: fav, productId: '4' })}
                                    />
                                </Col>
                                <Col lg={3} md={6} className="mb-3">
                                    <ProductCard
                                        productId='6'
                                        title="Counter Strike"
                                        summary="Global Offensive"
                                        description="Counter Strike Global Offensive"
                                        mediaType="image"
                                        mediaSrc='https://www.cswarzone.com/wp-content/uploads/2020/10/fps-guide.jpg'
                                        authorName='Kenny S'
                                        authorProfilePicture='/images/user-circle.svg'
                                        postedOnDate=''
                                        isFavourite={favourite.fav && favourite.productId === '6'}
                                        onFavUnfav={(fav: boolean) => setFavourite({ fav: fav, productId: '6' })}
                                    />
                                </Col>
                                {[...Array(8)].map((n, i) =>
                                    <Col lg={3} md={6} className="mb-3">
                                        <ProductCard
                                            productId='5'
                                            title="New Title"
                                            summary='Summary Text'
                                            description='Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum Ashanti, Greater Accra lorelpsum'
                                            mediaType="image"
                                            mediaSrc="https://static3.srcdn.com/wordpress/wp-content/uploads/2021/04/Older-Games-With-Great-Graphics-Far-Cry-2.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5"
                                            authorName='John Wick'
                                            authorProfilePicture='/images/user-circle.svg'
                                            postedOnDate=''
                                            isFavourite={favourite.fav && favourite.productId === '5'}
                                            onFavUnfav={(fav: boolean) => setFavourite({ fav: fav, productId: '5' })}
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
