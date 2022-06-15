import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Card } from 'react-bootstrap';
import { Chip, Typography, Box, LinearProgress } from '@mui/material';
import { useAxios } from '../../services';
import { Package } from './types';

export const Packages: React.FC = (): React.ReactElement => {

    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<Package>();
    const navigate = useHistory();

    const [{ data, loading }] = useAxios({
        url: '/package',
        method: 'GET',
    }, { manual: false });
    const [{ data: insertInvoiceRes, loading: laodingInvoice }, generateInvoice] = useAxios({
        url: '/invoice/insert',
        method: 'POST',
    });

    const handleBuyPackage = (event: any) => {
        generateInvoice({
            data: {
                packageId: selectedPackage?.id,
            },
        });
    };

    useEffect(() => {
        if (data?.success) {
            setPackages(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (insertInvoiceRes?.success) {
            navigate.push(`/package/${insertInvoiceRes?.data?.id}/order`);
        }
    }, [insertInvoiceRes]);

    useEffect(() => {
        setSelectedPackage(packages[0]);
    }, [packages]);

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
            {loading ? (
                <Box sx={{ mt: 8, mb: 30 }}>
                    <LinearProgress color='primary' />
                </Box>
            ) : (
                <Box>
                    <Row className="justify-content-center">
                        {!!packages && !!packages.length && packages.map((packageItem: Package) =>
                            <Col lg={4} sm={6} xs={12} key={packageItem?.id}>
                                <Card
                                    role="button"
                                    className={`${selectedPackage?.id === packageItem.id ? 'border border-3 border-success' : ''} mb-3`}
                                    key={packageItem?.id}
                                    onClick={() => setSelectedPackage(packageItem)}
                                >
                                    <Card.Header className="d-flex align-items-center bg-white fs-6 fw-bold p-3">
                                        {packageItem?.title}
                                    </Card.Header>
                                    <Card body className="border-0 d-flex justify-space-between">
                                        <span className="float-end h6 fst-normal">
                                            {`${packageItem?.currency} ${packageItem?.price}`}
                                        </span>
                                        <Typography variant="subtitle2">
                                            {packageItem?.description}
                                        </Typography>
                                    </Card>
                                </Card>
                            </Col>
                        )}
                    </Row>
                    <Col lg={5} className='text-center container pb-5'>
                        <Chip
                            label={`${selectedPackage?.validity} Days`}
                            variant="filled"
                            color='primary'
                            className='mb-3'
                            sx={{ color: '#fff' }}
                        />
                        <Box
                            role="button"
                            onClick={handleBuyPackage}
                            display="flex"
                            justifyContent="space-between"
                            sx={{ p: 1, backgroundColor: '#00af3c', color: '#fff' }}
                        >
                            <Typography>Buy</Typography>
                            <Typography>
                                {`${selectedPackage?.currency} ${selectedPackage?.price}`}
                            </Typography>
                        </Box>
                    </Col>
                </Box>
            )}
        </Row>
    );
};