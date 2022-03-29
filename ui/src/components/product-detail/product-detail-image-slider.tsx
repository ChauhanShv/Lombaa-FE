import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShare, FaHeart, FaImages, FaRegHeart } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './product-detail.css';
import { ProductShareModal } from '.';
import { useAxios } from '../../services';
import { useAppContext, ActionTypes } from '../../contexts';
import { ProductDetailImageSliderProps, ProductMedia } from './types';
import { ModalType } from '../../types';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export const ProductDetailImageSlider: React.FC<ProductDetailImageSliderProps> = ({
    productMedia,
    productId,
    isFavourite,
}: ProductDetailImageSliderProps): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const [favourite, setFavourite] = useState<boolean>(isFavourite ? true : false);
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
    const [{ }, favExecute] = useAxios({
        url: '',
        method: 'PUT',
    });
    const [{ }, unfavExecute] = useAxios({
        url: '',
        method: 'DELETE',
    });

    const handleFavUnfav = () => {
        if (!state.session.isLoggedIn) {
            dispatch({
                type: ActionTypes.OPEN_MODAL,
                payload: {
                    modal: ModalType.LOGIN,
                }
            });
            return;
        }
        setFavourite(!favourite);
        if (!isFavourite) {
            favExecute({
                data: {
                    productId: productId,
                }
            });
        } else {
            unfavExecute({
                data: {
                    productId: productId,
                }
            });
        }
    }

    return (
        <Container>
            {isShareModalOpen && (
                <ProductShareModal onClose={() => setIsShareModalOpen(false)} />
            )}
            <Row className="mt-auto">
                <Col lg={12} sm={12} className="position-relative">
                    <Slider className="product-slider" {...sliderSettings}>
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
                        <button onClick={handleFavUnfav} className="icon-btn btn-like" id="fav">
                            {favourite ? (
                                <>
                                    <FaHeart /> Liked
                                </>
                            ) : (
                                <>
                                    <FaRegHeart /> Like
                                </>
                            )}
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