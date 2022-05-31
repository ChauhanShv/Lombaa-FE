import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Row, Card } from 'react-bootstrap';
import { Chip, Typography, Button } from '@mui/material';
import { useAxios } from '../../services';
import { Package } from './types';

export const Packages: React.FC = (): React.ReactElement => {

    const [packages, setPackages] = useState<Package[]>([]);
    const navigate = useHistory();

    const handleBuyPackage = (event: any, packageId: string) => {
        paymentExecute({
            data: {
                package: packageId,
            },
        });
    };

    const [{ data, loading }] = useAxios({
        url: '/package',
        method: 'GET',
    }, { manual: false });
    const [{ data: paymentResponse, loading: paymentLoading }, paymentExecute] = useAxios({
        url: '/order',
        method: 'POST',
    });

    useEffect(() => {
        if (data?.success) {
            setPackages(data?.data.filter((packageItem: Package) => packageItem.type === 'booster'));
        }
    }, [data]);

    useEffect(() => {
        if (paymentResponse?.success) {
            navigate.push(`/payment/success`);
        }
    }, [paymentResponse]);

    return (
        <Row>
            <Typography
                className="mt-4 mb-3"
                variant="body1"
                color="primary"
                textAlign="center"
                fontWeight="600"
            >
                Increase your sales with Lombaa Premium Services!
            </Typography>
            <Typography
                className="mt-3 mb-4"
                variant="body2"
                textAlign="center"
            >
                Choose the right category for your ads and start selling faster
            </Typography>
            <Row className="justify-content-center">
                {!!packages && !!packages.length && packages.map((packageItem: Package) =>
                    <Col lg={4} sm={6} xs={12}>
                        <Card
                            role="button"
                            className="mb-3"
                            key={packageItem?.id}
                        >
                            <Card.Header className="d-flex align-items-center bg-white fs-6 fw-bold p-3 justify-content-between">
                                {packageItem?.title}{'  '}
                                <Button
                                    onClick={(event: any) => handleBuyPackage(event, packageItem?.id)}
                                    variant='outlined'
                                    size='large'
                                >
                                    Buy
                                </Button>
                            </Card.Header>
                            <Card body className="border-0">
                                <Chip
                                    label={`${packageItem?.validity} Days`}
                                    variant="filled"
                                    color="primary"
                                    className="me-2"
                                    sx={{ color: '#fff' }}
                                />
                                <span className="float-end h6 fst-normal">
                                    {`${packageItem?.currency} ${packageItem?.price}`}
                                </span>
                                <Typography sx={{ marginTop: '1rem' }} variant="subtitle2">
                                    {packageItem?.description}
                                </Typography>
                            </Card>
                        </Card>
                    </Col>
                )}
            </Row>
        </Row>
    );
};