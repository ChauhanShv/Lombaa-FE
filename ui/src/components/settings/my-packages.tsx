import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { LoadingButton } from '@mui/lab';
import {
    Chip,
    Typography,
    FormControl,
    List,
    ListItemButton,
    FormHelperText,
    LinearProgress,
    Button,
    Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { Package, SelectedPackageWithCategory } from './types';
import { Category, SubCategory } from '../../types';
import { getAPIErrorMessage } from '../../utils';

export const MyPackages: React.FC = (): React.ReactElement => {

    const { state } = useAppContext();
    const [buyedPackages, setBuyedPackages] = useState<Package[]>([]);
    const [selectedPackages, setSelectedPackages] = useState<SelectedPackageWithCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>();
    const [showError, setShowError] = useState<boolean>(false);

    const [{ data: buyedPackagesRes, loading: buyedPackagesLoading }, refetchPackages] = useAxios({
        url: '/userPackage',
        method: 'GET',
    }, { manual: false });

    const [{ data: activatePackageRes, loading: loadingActivatePackage, error: activationError }, activatePackage] = useAxios({
        url: '/userPackage/update',
        method: 'PUT',
    });

    useEffect(() => {
        if (buyedPackagesRes?.success) {
            setBuyedPackages(buyedPackagesRes?.data);
        }
    }, [buyedPackagesRes]);
    useEffect(() => {
        if (activatePackageRes?.success) {
            setShowError(false);
            refetchPackages({});
        }
        if (activationError) {
            setShowError(true);
        }
    }, [activatePackageRes, activationError]);
    useEffect(() => {
        if (buyedPackages?.length) {
            const newSelectedPackages: SelectedPackageWithCategory[] = [];
            for (const buyedPackage of buyedPackages) {
                newSelectedPackages.push({
                    userPackageId: buyedPackage?.id,
                    categoryId: '',
                    categoryName: '',
                    error: '',
                });
            }
            setSelectedPackages([...newSelectedPackages]);
        }
    }, [buyedPackages]);

    const handleSubCategoryChange = (e: any, subCat: SubCategory, packageIndex: number) => {
        setSelectedSubCategory(subCat?.id);
        const newSelectedPackages: SelectedPackageWithCategory[] = [...selectedPackages];
        newSelectedPackages[packageIndex].categoryId = subCat?.id;
        newSelectedPackages[packageIndex].categoryName = subCat?.name;
        newSelectedPackages[packageIndex].error = "";
        setSelectedPackages([...newSelectedPackages]);
    };

    const handleActivation = (e: any, packageIndex: number, packageItem: Package) => {
        if (selectedPackages[packageIndex]?.categoryId) {
            activatePackage({
                data: {
                    packageId: packageItem?.package?.id,
                    categoryId: selectedPackages[packageIndex]?.categoryId,
                },
            });
        } else {
            const newSelectedPackages: SelectedPackageWithCategory[] = [...selectedPackages];
            newSelectedPackages[packageIndex].error = "Please select category first";
            setSelectedPackages([...newSelectedPackages]);
        }
    }

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center my-lg-1 settings-font-header">
                    <Link to="/settings" className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </Link>My Packages
                </span>
            </Card.Header>
            <Col lg={8} md={10} sm={10} xs={11} className="mx-auto package-list mt-4">
                {buyedPackagesLoading && (
                    <LinearProgress />
                )}
                {showError && (
                    <Alert
                        variant='filled'
                        severity='error'
                        sx={{ mb: 3 }}
                        onClose={() => setShowError(false)}
                    >
                        {getAPIErrorMessage(activationError) || 'A package is already activated with the same category'}
                    </Alert>
                )}
                {buyedPackages && !!buyedPackages.length && buyedPackages.map((packageItem: Package, packageIndex: number) =>
                    <Card
                        role="button"
                        className="mb-4 border-2"
                        key={packageItem?.id}
                    >
                        <Card.Header className="d-flex justify-content-between align-items-center p-2 bg-white">
                            <Card.Header className="bg-white fs-6 fw-bold border-0">
                                {packageItem?.packageName}
                            </Card.Header>
                            <div>
                                {packageItem?.status === 'queued' && (
                                    <LoadingButton
                                        variant="outlined"
                                        loading={loadingActivatePackage}
                                        onClick={(e) => handleActivation(e, packageIndex, packageItem)}
                                    >
                                        Activate
                                    </LoadingButton>
                                )}
                                {packageItem?.status === 'activated' && (
                                    <Button color="warning" disableRipple disableFocusRipple>
                                        Active
                                    </Button>
                                )}
                                {packageItem?.status === 'expired' && (
                                    <Button color="error" disableRipple disableFocusRipple>
                                        Expired
                                    </Button>
                                )}
                            </div>
                        </Card.Header>
                        <Card body className="border-0">
                            <Chip
                                label={`${packageItem?.package?.validity} Days`}
                                variant="filled"
                                color="primary"
                                className="me-2"
                                sx={{ color: '#fff' }}
                            />
                            <span className="float-end h6 fst-normal">
                                {`${packageItem?.package?.currency} ${packageItem?.package?.price}`}
                            </span>
                            <Typography sx={{ my: '1rem' }} variant="subtitle2">
                                {packageItem?.packageDescription}
                            </Typography>
                            {packageItem.status === 'queued' ? (
                                <FormControl fullWidth>
                                    <Dropdown className="d-inline mx-2">
                                        <Dropdown.Toggle variant="outline-dark rounded btn-fullround mb-2">
                                            <span className="no-wrap text-truncate">
                                                Category: <strong>{selectedPackages[packageIndex]?.categoryName ?? ""}</strong>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='pre-scrollable'>
                                            {state?.category?.map((category: Category) =>
                                                <List key={category?.id} sx={{ marginTop: '-15px' }}>
                                                    <ListItemButton onClick={() => setSelectedCategory(category?.id)}>
                                                        {category?.name}
                                                    </ListItemButton>
                                                    {selectedCategory === category?.id && category?.subCategories?.map((subCat: SubCategory) =>
                                                        <Dropdown.Item
                                                            onClick={(e) => handleSubCategoryChange(e, subCat, packageIndex)}
                                                            className="px-2 py-2"
                                                            key={subCat?.id}
                                                        >
                                                            <Form.Group>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label={subCat?.name}
                                                                    value={subCat?.id}
                                                                    checked={subCat?.id === selectedSubCategory}
                                                                    onChange={(e) => handleSubCategoryChange(e, subCat, packageIndex)}
                                                                />
                                                            </Form.Group>
                                                        </Dropdown.Item>
                                                    )}
                                                </List>
                                            )}
                                        </Dropdown.Menu>
                                        <FormHelperText error>
                                            {selectedPackages[packageIndex]?.error ?? ''}
                                        </FormHelperText>
                                    </Dropdown>
                                </FormControl>
                            ) : (
                                <p>
                                    Category: <strong>{packageItem?.category?.name}</strong>
                                </p>
                            )}
                        </Card>
                    </Card>
                )}
            </Col>
        </Card >
    );
};