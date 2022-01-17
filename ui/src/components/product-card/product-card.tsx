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
    title,
    summary,
    description,
    mediaSrc,
    mediaType,
    authorName,
    postedOnDate,
    authorProfilePicture,
    isFavourite,
    onFavUnfav,
}: ProductCardProps): React.ReactElement => {

    const [favourite, setFavourite] = useState<boolean>(isFavourite);
    const [{ data, loading, error }, execute] = useAxios({
        url: '/dummyurl',
        method: 'PUT',
    });

    const handleFavUnfav = () => {
        setFavourite(!favourite);
        onFavUnfav(!favourite);
        // execute({});
    }

    return (
        <div className="ad-card card">
            <Link to={`/product-detail/${productId}`}>
                {mediaType === 'video' ? (
                    <video controls>
                        <source src={mediaSrc} type="video/mp4" />
                        <source src={mediaSrc} type="video/webm" />
                    </video>
                ) : (
                    <Card.Img variant="top" src={mediaSrc} />
                )}
            </Link>
            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                <small className="text-white">{postedOnDate}</small>
                {favourite ?
                    <button className="saved" id="fav" onClick={handleFavUnfav}><FaHeart /></button> :
                    <button className="saved" id="fav" onClick={handleFavUnfav}><FiHeart /></button>
                }
            </div>
            <Link to={`/product-detail/${productId}`}>
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
            <Link to='/' className="p-0 ms-3 mb-3 usermeta">
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
