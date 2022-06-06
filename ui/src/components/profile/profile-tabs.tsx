import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
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

    const [products, setProducts] = useState<ProductTab>({
        inReview: [],
        sold: [],
        expired: [],
        active: [],
        declined: [],
    });
    const [favProducts, setFavProducts] = useState<Product[]>([]);
    const [tabValue, setTabValue] = useState<string>('MyListing');
    const [listingTabValue, setListingTabValue] = React.useState('');

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

    return (
        <Container className="p-4">
            <Row className="py-4">
                <Box className="shadow border w-100 p-0" sx={{ borderRadius: '10px' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList className="profile-tabs" onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="My Listing" value="MyListing" />
                                <Tab label="Reviews" value="Reviews" />
                                <Tab label="Favourites" value="Favourites" />
                            </TabList>
                        </Box>
                        <TabPanel value="MyListing">
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
                                    <TabPanel value="InReview">
                                        <ProductTabList
                                            productList={products.inReview || []}
                                            listingTabName='In Review'
                                        />
                                    </TabPanel>
                                    <TabPanel value="Active">
                                        <ProductTabList
                                            productList={products.active || []}
                                            listingTabName="Active"
                                        />
                                    </TabPanel>
                                    <TabPanel value="Declined">
                                        <ProductTabList
                                            productList={products.declined || []}
                                            listingTabName="Declined"
                                        />
                                    </TabPanel>
                                    <TabPanel value="Expired">
                                        <ProductTabList
                                            productList={products.expired || []}
                                            listingTabName="Expired"
                                        />
                                    </TabPanel>
                                    <TabPanel value="Sold">
                                        <ProductTabList
                                            productList={products.sold || []}
                                            listingTabName="Sold"
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </TabPanel>
                        <TabPanel value="Reviews">
                            <Reviews />
                        </TabPanel>
                        <TabPanel value="Favourites">
                            <ProductTabList
                                productList={favProducts}
                                listingTabName="Favourites"
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Row>
        </Container>
    );
};
