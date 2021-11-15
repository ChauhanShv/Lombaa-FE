import React from 'react';
import {Col, Row, Card, Button} from 'react-bootstrap';

export const ProfileProductTile: React.FC = (): React.ReactElement => {
    return (
        <Col md={12} className="col-6 mb-3">
            <Card>
                <Row>
                    <Col md={4}>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                        <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                            <small className="text-white">Today</small>
                        </div>
                    </Col>
                    <Card.Body className="col-md-8">
                        <h4 className="card-title text-success">Special title treatment</h4>
                        <p className="card-text m-0"><strong>With supporting text below as a natural lead-in...</strong></p>
                        <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
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
