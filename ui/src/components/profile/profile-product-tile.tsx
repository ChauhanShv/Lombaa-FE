import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { ProfileProductTileProps } from './types';

export const ProfileProductTile: React.FC<ProfileProductTileProps> = ({
    productId,
    title,
    summary,
    description,
    postedOnDate,
    mediaType,
    mediaSrc,
}: ProfileProductTileProps): React.ReactElement => {
    return (
        <Col md={12} className="col-md-6 md-3">
            <Card>
                <Row>
                    <Col md={4}>
                        {mediaType === 'video' ? (
                            <video controls>
                                <source src={mediaSrc} type='video/mp4' />
                                <source src={mediaSrc} type='video/webm' />
                            </video>
                        ) : (
                            <Card.Img variant="top" src={mediaSrc} />
                        )}
                        <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                            <small className="text-white">{postedOnDate}</small>
                        </div>
                    </Col>
                    <Card.Body className="col-md-8">
                        <h4 className="card-title text-success">{title}</h4>
                        <p className="card-text m-0"><strong>{summary}</strong></p>
                        <p className="text-muted">{description}</p>
                        <p className="text-muted "><strong>Category:</strong> Property Sale</p>

                        <Button variant="success">View</Button>{' '}
                        <Button variant="outline-secondary">Edit</Button>{' '}
                        <Button variant="outline-danger">Delete</Button>{' '}
                    </Card.Body>
                </Row>
            </Card>
        </Col>
    );
};

/*
productId: '',
title: 'Special title treatment',
summary: 'With supporting text below as a natural lead-in...',
description: 'Ashanti, Greater Accra lorelpsum...',
postedOnDate: "Toady",
mediaType: 'image',
mediaSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23',
*/
