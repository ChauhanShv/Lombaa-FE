import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useAxios } from '../../services';
import { Package } from './types';

export const MyPackages: React.FC = (): React.ReactElement => {
    const [buyedPackages, setBuyedPackages] = useState<Package[]>([]);

    const [{ data: buyedPackagesRes, loading: buyedPackagesLoading }] = useAxios({
        url: '/user/packages',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (buyedPackagesRes?.success) {
            setBuyedPackages(buyedPackagesRes?.data);
        }
    }, [buyedPackagesRes])

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
                        My Packages
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
            </Col>
        </Card>
    );
};