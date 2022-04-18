import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useAxios } from '../../services';
import { Package } from './types';

export const Packages: React.FC = (): React.ReactElement => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [buyedPackages, setBuyedPackages] = useState<Package[]>([]);
    const navigate = useHistory();

    const [{ data, loading }] = useAxios({
        url: '/package',
        method: 'GET',
    }, { manual: false });
    const [{ data: paymentResponse, loading: paymentLoading }, paymentExecute] = useAxios({
        url: '/order',
        method: 'POST',
    });
    const [{ data: buyedPackagesRes, loading: buyedPackagesLoading }] = useAxios({
        url: '/user/packages',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setPackages(data?.data.filter((packageItem: Package) => packageItem.type === 'booster'));
        }
    }, [data]);
    useEffect(() => {
        if (buyedPackagesRes?.success) {
            setBuyedPackages(buyedPackagesRes?.data);
        }
    }, [buyedPackagesRes])
    useEffect(() => {
        if (paymentResponse?.success) {
            navigate.push(`/payment/success`);
        }
    }, [paymentResponse]);

    const handleBuyPackage = (event: any, packageId: string) => {
        paymentExecute({
            data: {
                package: packageId,
            },
        });
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center my-lg-1 settings-font-header">
                    <Link to="/settings" className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </Link>Package
                </span>
            </Card.Header>
            <Col className="col-lg-8 mx-auto package-list mt-4 p-3">
                {buyedPackages && !!buyedPackages.length && (
                    <Typography
                        className="mb-3"
                        variant="h6"
                        color="primary"
                    >
                        Brought Packages
                    </Typography>
                )}
                {buyedPackages && !!buyedPackages.length && buyedPackages.map((packageItem: Package) =>
                    <Card
                        role="button"
                        className="mb-4 border-2"
                        key={packageItem?.id}
                    >
                        <Card.Header className="d-flex align-items-center bg-white fs-6 fw-bold p-3">
                            {packageItem?.title}
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
                )}
                <Typography
                    className="mb-3"
                    variant="h6"
                    color="primary"
                >
                    Other Packages
                </Typography>
                {!!packages && !!packages.length && packages.map((packageItem: Package) =>
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
                )}
            </Col>
        </Card>
    );
};