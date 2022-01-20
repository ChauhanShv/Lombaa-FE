import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useAxios } from '../../services';
import { ProductCardProps } from './types';
import './product-card.css';

export const ProductCard: React.FC<ProductCardProps> = ({
    productId,
    slug,
    title,
    summary,
    description,
    mediaSrc,
    authorName,
    postedOnDate,
    authorProfilePicture,
    isFavourite,
    onFavUnfav,
}: ProductCardProps): React.ReactElement => {

    const [favourite, setFavourite] = useState<boolean>(isFavourite);
    const [{ data }, favExecute] = useAxios({
        url: '/user/favorite/product',
        method: 'PUT',
    });
    const [{ data: deleteFavourite }, unfavExecute] = useAxios({
        url: '/user/favorite/product',
        method: 'DELETE',
    });

    const handleFavUnfav = () => {
        setFavourite(!favourite);
        onFavUnfav(!favourite);
        if (!favourite) {
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
        <div className="ad-card card">
            <Link to={`/product-detail/${productId}/${slug}`}>
                <Card.Img variant="top" src={mediaSrc} />
            </Link>
            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                <small className="text-white">{postedOnDate}</small>
                {favourite ?
                    <button className="saved" id="fav" onClick={handleFavUnfav}><FaHeart /></button> :
                    <button className="saved" id="fav" onClick={handleFavUnfav}><FiHeart /></button>
                }
            </div>
            <Link to={`/product-detail/${productId}/${slug}`}>
                <div className="card-body">
                    <Card.Header className="card-title text-success product-card-header">
                        {title}
                    </Card.Header>
                    <p className="card-text">
                        <strong>{summary}</strong>
                    </p>
                    <p className="text-muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                        {description}
                    </p>
                </div>
            </Link>
            <Link to={`/product-detail/${productId}/${slug}`} className="p-0 ms-3 mb-3 usermeta">
                <img
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                    src={authorProfilePicture}
                    alt="Htmlstream"
                />
                {authorName}
            </Link>
        </div>
    );
};
