import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { ProductTab, Product } from './types';
import { useAxios } from '../../services';
import { ProductTabList, EmptyTabContent } from '.';
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

    const [{ data, loading, error }, execute] = useAxios({
        url: '/user/products',
        method: 'GET',
    }, {
        manual: false,
    });
    const [{ data: favResponse, loading: favLoading }, favExecute] = useAxios({
        url: '/user/favorite/products',
        method: 'GET',
    }, {
        manual: false,
    });

    useEffect(() => {
        if (data?.success) {
            setProducts(data?.response);
        }
        if (favResponse?.success) {
            setFavProducts(favResponse?.response?.products);
        }
    }, [data, favResponse]);

    return (
        <Container className="p-4">
            <Row className="py-4">
                <Col md={12} className="p-0">
                    <Tabs className="profile-tabs" defaultActiveKey="MyListing" id="uncontrolled-tab-example">
                        <Tab eventKey="MyListing" title="My Listing" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <Tabs defaultActiveKey="InReview" id="uncontrolled-tab-example">
                                <Tab eventKey="InReview" title="InReview" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <ProductTabList productList={products.inReview} listingTabName='In Review' />
                                </Tab>
                                <Tab eventKey="Active" title="Active" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <ProductTabList productList={products.active} listingTabName='Active' />
                                </Tab>
                                <Tab eventKey="Declined" title="Declined" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <ProductTabList productList={products.declined} listingTabName='Declined' />
                                </Tab>
                                <Tab eventKey="Expired" title="Expired" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <ProductTabList productList={products.expired} listingTabName='Expired' />
                                </Tab>
                                <Tab eventKey="Sold" title="Sold" mountOnEnter unmountOnExit={false} className='py-4 my-listing'>
                                    <ProductTabList productList={products.sold} listingTabName='Sold' />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="Reviews" title="Reviews" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <EmptyTabContent tabTitle="Reviews" />
                        </Tab>
                        <Tab eventKey="Favourite Ads" title="Favourite Ads" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <ProductTabList productList={favProducts} listingTabName='Favourites' />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};
