import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
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
}: ProductCardProps): React.ReactElement => {
    return (
        <div className="ad-card card">
            <Link to='/'>
                {mediaType === 'video' ? (
                    <video controls>
                        <source src={mediaSrc} type="video/mp4" />
                        <source src={mediaSrc} type="video/webm" />
                    </video>
                ) : (
                    <Card.Img variant="top" src={mediaSrc} />
                )}
                <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                    <small className="text-white">{postedOnDate}</small>
                    {isFavourite ?
                        <button className="saved" id="fav"><FiHeart /></button> :
                        <button className="saved" id="fav"><FaHeart /></button>
                    }
                </div>
                <div className="card-body">
                    <Card.Header className="card-title text-success">
                        {title}
                    </Card.Header>
                    <p className="card-text">
                        <strong>{summary}</strong>
                    </p>
                    <p className="text-muted">
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
