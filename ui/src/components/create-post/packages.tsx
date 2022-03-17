import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useAxios } from '../../services';
import { Package } from './types';

export const Packages: React.FC = (): React.ReactElement => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<Package>();

    const handlePackageOptionClicked = (event: any, packageItem: Package) => {
        setSelectedPackage(packageItem);
    };
    const [{ data, loading }, execute] = useAxios({
        url: '/package',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setPackages(data?.data.filter((packageItem: Package) => packageItem.type === 'booster'));
        }
    }, [data]);

    return (
        <Col className="col-lg-8 mx-auto package-list">
            {!!packages && !!packages.length && packages.map((packageItem: Package) =>
                <Card
                    role="button"
                    className={`${selectedPackage?.id === packageItem.id ? "selected-package mb-4 border-2" : "mb-4 border-2"}`}
                    onClick={(event: any) => handlePackageOptionClicked(event, packageItem)}
                    key={packageItem?.id}
                >
                    <Card.Header className="d-flex align-items-center bg-white fs-6 fw-bold p-3">
                        {packageItem?.text}
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
    );
};