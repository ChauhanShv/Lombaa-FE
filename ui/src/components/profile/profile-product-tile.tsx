import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { ProfileProductTileProps } from './types';
import { useAxios } from '../../services';

export const ProfileProductTile: React.FC<ProfileProductTileProps> = ({
    productId,
    slug,
    title,
    summary,
    description,
    categoryName,
    postedOnDate,
    mediaSrc,
    isFavouritesTab,
    onDelete,
}: ProfileProductTileProps): React.ReactElement => {

    const [{ data: deleteFavourite }, unfavExecute] = useAxios({
        url: '/user/favorite/product',
        method: 'DELETE',
    });
    const [{ data: deleteProductRes }, deleteExecute] = useAxios({
        url: '/product/delete',
        method: 'DELETE',
    });

    const handleUnfavProduct = () => {
        unfavExecute({
            data: {
                productId: productId,
            },
        });
    };

    const handleDeleteProduct = () => {
        deleteExecute({
            data: {
                id: productId,
            }
        });
    };

    useEffect(() => {
        if (deleteFavourite?.success || deleteProductRes?.success) {
            onDelete(productId);
        }
    }, [deleteFavourite, deleteProductRes]);

    return (
        <Col md={12} className="col-md-6 mb-3">
            <Card>
                <Row>
                    <Col md={4}>
                        <Card.Img
                            className="profile-product-img-background"
                            height="100%"
                            variant="top"
                            src={mediaSrc}
                        />
                        <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                            <small className="text-white">
                                {postedOnDate}
                            </small>
                        </div>
                    </Col>
                    <Card.Body className="col-md-8">
                        <h4 className="card-title text-success">
                            {title}
                        </h4>
                        <p className="card-text m-0">
                            <strong>{summary}</strong>
                        </p>
                        <p className="text-muted">
                            {description}
                        </p>
                        <p className="text-muted ">
                            <strong>Category:</strong> {categoryName}
                        </p>
                        <Link to={`/product-detail/${productId}/${slug}`}>
                            <Button variant="success"><FaEye /> View</Button>
                        </Link>{' '}
                        {!isFavouritesTab ? (
                            <>
                                <Button variant="outline-secondary">
                                    <FaEdit /> Edit
                                </Button>{' '}
                                <Button variant="outline-danger">
                                    <FaTrashAlt /> Delete
                                </Button>{' '}
                            </>
                        ) : (
                            <Button onClick={handleUnfavProduct} variant="danger">
                                <FaTrashAlt /> Remove from favourites
                            </Button>
                        )}
                    </Card.Body>
                </Row>
            </Card>
        </Col>
    );
};
