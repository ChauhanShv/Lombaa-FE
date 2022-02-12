import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { ProfileProductTileProps } from './types';

export const ProfileProductTile: React.FC<ProfileProductTileProps> = ({
    productId,
    slug,
    title,
    summary,
    description,
    categoryName,
    postedOnDate,
    mediaSrc,
}: ProfileProductTileProps): React.ReactElement => {
    return (
        <Col md={12} className="col-md-6 mb-3">
            <Card>
                <Row>
                    <Col md={4}>
                        <Card.Img height="100%" variant="top" src={mediaSrc} />
                        <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                            <small className="text-white">{postedOnDate}</small>
                        </div>
                    </Col>
                    <Card.Body className="col-md-8">
                        <h4 className="card-title text-success">{title}</h4>
                        <p className="card-text m-0"><strong>{summary}</strong></p>
                        <p className="text-muted">{description}</p>
                        <p className="text-muted "><strong>Category:</strong> {categoryName}</p>
                        <Link to={`/product-detail/${productId}/${slug}`}>
                            <Button variant="success">View</Button>
                        </Link>{' '}
                        <Button variant="outline-secondary">Edit</Button>{' '}
                        <Button variant="outline-danger">Delete</Button>{' '}
                    </Card.Body>
                </Row>
            </Card>
        </Col>
    );
};
