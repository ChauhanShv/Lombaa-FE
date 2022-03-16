import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Chip from '@mui/material/Chip';

export const Packages: React.FC = (): React.ReactElement => {
    const [selectedPackage, setSelectedPackage] = useState<any>({});

    const handlePackageOptionClicked = () => {

    };

    return (
        <Col className="col-lg-8 mx-auto package-list">
            <Card
                role="button"
                className="mb-4 border-2"
                onClick={handlePackageOptionClicked}
            >
                <Card.Header className="d-flex align-items-center bg-white fs-5 fw-bold p-3">
                    Standard Ad
                </Card.Header>
            </Card>

            <Card
                role="button"
                className="mb-4 border-2"
                onClick={handlePackageOptionClicked}
            >
                <Card.Header className="d-flex align-items-center bg-white fs-5 fw-bold p-3">
                    Top
                    <Badge className="ms-2 bg-success rounded fw-normal">
                        <small>Best Offer</small>
                    </Badge>
                </Card.Header>
                <Card body className="border-0">
                    <Chip
                        label="7 Days"
                        variant="filled"
                        color="primary"
                        className="me-2"
                        sx={{ color: '#fff' }}
                    />
                    <Chip
                        label="30 Days"
                        variant="outlined"
                        color="primary"
                    />
                    <span className="float-end h4 fw-bold">
                        2,499
                    </span>
                </Card>
            </Card>
            <Card
                role="button"
                className="mb-4 border-2"
                onClick={handlePackageOptionClicked}
            >
                <Card.Header className="d-flex align-items-center bg-white fs-5 fw-bold p-3">
                    Boost Premium
                </Card.Header>
                <Card
                    body
                    className="border-0"
                >
                    <Chip
                        className="me-2"
                        label="1 Month"
                        variant="outlined"
                        color="primary"
                    />
                    <span className="float-end h4 fw-bold">
                        12,499
                    </span>
                </Card>
            </Card>
        </Col>
    );
};