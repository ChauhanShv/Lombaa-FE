import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import { Media } from './types';

interface ListingTileProps {
    title: string,
    description: string,
    file: any,
    media: Media[],
};

export const ListingSuccessfulTile: React.FC<ListingTileProps> = ({
    title,
    description,
    file,
    media,
}: ListingTileProps): React.ReactElement => {

    const getPrimaryMediaObject = (media: any) => {
        for (const mediaObj of media) {
            if (mediaObj.isPrimary) {
                return mediaObj;
            }
        }
        return media[0];
    }

    const primaryMedia = getPrimaryMediaObject(media);

    return (
        <Container className="p-4 pt-lg-5">
            <Row>
                <Col>
                    <div className="shadow p-3 p-lg-5">
                        <Row>
                            <Col className="col-md-3">
                                <div className="shadow">
                                    {primaryMedia?.mime?.includes('video') ? (
                                        <video className="img-fluid" controls>
                                            <source src={primaryMedia?.url} type="video/mp4" />
                                            <source src={primaryMedia?.url} type="video/webm" />
                                        </video>
                                    ) : (
                                        <img className="img-fluid" alt={title} src={primaryMedia?.url} />
                                    )}
                                    <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                        <small className="text-white">Today</small>
                                        <button className="saved" id="fav"><FaHeart /></button>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title text-success">{title}</h4>
                                        {description &&
                                            <p className="card-text text-truncate">
                                                <strong>{description}</strong>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-8">
                                <h1 className="h2"><FaCheckCircle className="text-success fs-4" /> Successfully listed</h1>
                                <Link to="/profile">
                                    <Button variant="fullround" className="px-4 btn-outline-secondary">
                                        View Listing
                                    </Button>{' '}
                                </Link>
                                <Button variant="fullround" className="px-4 mx-3 btn-success">
                                    Share
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
