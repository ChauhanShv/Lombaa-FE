import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { ProductTab, Product } from './types';
import { useAxios } from '../../services';
import { ProductTabList, Reviews } from '.';
import './profile.css';

export const ProfileTabs: React.FC = (): React.ReactElement => {

    const { userId } = useParams<{ userId: string }>();
    const [products, setProducts] = useState<ProductTab>({
        inReview: [],
        sold: [],
        expired: [],
        active: [],
        declined: [],
    });
    const [favProducts, setFavProducts] = useState<Product[]>([]);
    const [tabValue, setTabValue] = useState<string>('MyListing');
    const [listingTabValue, setListingTabValue] = React.useState('InReview');
    const [userProfileTabValue, setUserProfileTabValue] = useState('Listings');

    const [{ data, loading }, execute] = useAxios({
        url: '/user/products',
        method: 'GET',
    });
    const [{ data: favResponse, loading: favLoading }, favExecute] = useAxios({
        url: '/user/favorite/products',
        method: 'GET',
    });

    useEffect(() => {
        execute({});
        favExecute({});
    }, []);
    useEffect(() => {
        if (data?.success) {
            setProducts(data?.response);
        }
        if (favResponse?.success) {
            setFavProducts(favResponse?.response?.products);
        }
    }, [data, favResponse]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    const handleListingTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setListingTabValue(newValue);
    };
    const handleUserProfileTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setUserProfileTabValue(newValue);
    };

    return (
        <Container className="p-4">
            <Row className="py-4">
                {userId ? (
                    <Box className="shadow border w-100 p-0" sx={{ borderRadius: '10px' }}>
                        <TabContext value={userProfileTabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList className="profile-tabs" onChange={handleUserProfileTabChange}>
                                    <Tab label="Products Listing" value="Listings" />
                                    <Tab label="Reviews" value="Reviews" />
                                </TabList>
                            </Box>
                            <TabPanel value="Listings">
                                <ProductTabList
                                    productList={products.active || []}
                                    listingTabName="Active"
                                    loading={loading}
                                />
                            </TabPanel>
                            <TabPanel value="Reviews">
                                <Reviews />
                            </TabPanel>
                        </TabContext>
                    </Box>
                ) : (
                    <Box className="shadow border w-100 p-0" sx={{ borderRadius: '10px' }}>
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList className="profile-tabs" onChange={handleTabChange} aria-label="lab API tabs example">
                                    <Tab label="My Listing" value="MyListing" />
                                    <Tab label="Reviews" value="Reviews" />
                                    <Tab label="Favourites" value="Favourites" />
                                </TabList>
                            </Box>
                            <TabPanel sx={{ p: 2 }} value="MyListing">
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={listingTabValue}>
                                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                            <TabList onChange={handleListingTabChange} aria-label="lab API tabs example">
                                                <Tab label="In Review" value="InReview" />
                                                <Tab label="Active" value="Active" />
                                                <Tab label="Declined" value="Declined" />
                                                <Tab label="Expired" value="Expired" />
                                                <Tab label="Sold" value="Sold" />
                                            </TabList>
                                        </Box>
                                        <TabPanel sx={{ p: 1 }} value="InReview">
                                            <ProductTabList
                                                productList={products.inReview || []}
                                                listingTabName='In Review'
                                                loading={loading}
                                            />
                                        </TabPanel>
                                        <TabPanel sx={{ p: 1 }} value="Active">
                                            <ProductTabList
                                                productList={products.active || []}
                                                listingTabName="Active"
                                                loading={loading}
                                            />
                                        </TabPanel>
                                        <TabPanel sx={{ p: 1 }} value="Declined">
                                            <ProductTabList
                                                productList={products.declined || []}
                                                listingTabName="Declined"
                                                loading={loading}
                                            />
                                        </TabPanel>
                                        <TabPanel sx={{ p: 1 }} value="Expired">
                                            <ProductTabList
                                                productList={products.expired || []}
                                                listingTabName="Expired"
                                                loading={loading}
                                            />
                                        </TabPanel>
                                        <TabPanel sx={{ p: 1 }} value="Sold">
                                            <ProductTabList
                                                productList={products.sold || []}
                                                listingTabName="Sold"
                                                loading={loading}
                                            />
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </TabPanel>
                            <TabPanel value="Reviews">
                                <Reviews />
                            </TabPanel>
                            <TabPanel sx={{ p: 1 }} value="Favourites">
                                <ProductTabList
                                    productList={favProducts}
                                    listingTabName="Favourites"
                                    loading={loading}
                                />
                            </TabPanel>
                        </TabContext>
                    </Box>
                )}
            </Row>
        </Container>
    );
};
