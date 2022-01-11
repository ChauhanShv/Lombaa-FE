import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Container, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ProfileProductTile } from './profile-product-tile';
import './profile.css';
interface TabContentProps {
    tabTitle: string,
};

const EmptyTabContent: React.FC<TabContentProps> = ({ tabTitle }: TabContentProps): React.ReactElement => {
    return (
        <div style={{ textAlign: 'center' }} className="pt-15 pb-15">
            <img src="/images/placeholder-image.jpg" className='placeholder-image' />
            <p className="tab-placeholder-text">{`We could not fetch anything for ${tabTitle} tab. There is no data available.`}</p>
            <Link to="create-post">
                <Button variant="success">Sell Your Item</Button>
            </Link>
        </div>
    );
}

export const ProfileTabs = () => {

    const cardContents = {
        productId: '',
        title: 'Special title treatment',
        summary: 'With supporting text below as a natural lead-in...',
        description: 'Ashanti, Greater Accra lorelpsum...',
        postedOnDate: "Toady",
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23',
    }

    return (
        <Container className="p-4">
            <Row className="py-4">
                <Col md={12} className="p-0">
                    <Tabs className="profile-tabs" defaultActiveKey="MyListing" id="uncontrolled-tab-example">
                        <Tab eventKey="MyListing" title="My Listing" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <Tabs defaultActiveKey="InReview" id="uncontrolled-tab-example">
                                <Tab eventKey="InReview" title="InReview" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <Row className="row">
                                        <ProfileProductTile {...cardContents} />
                                        <ProfileProductTile {...cardContents} />
                                        <ProfileProductTile {...cardContents} />
                                    </Row>
                                </Tab>
                                <Tab eventKey="Active" title="Active" mountOnEnter unmountOnExit={false}>
                                    <EmptyTabContent tabTitle="Reviewing" />
                                </Tab>
                                <Tab eventKey="Declined" title="Declined" mountOnEnter unmountOnExit={false}>
                                    <EmptyTabContent tabTitle="Declined" />
                                </Tab>
                                <Tab eventKey="Expired" title="Expired" mountOnEnter unmountOnExit={false}>
                                    <EmptyTabContent tabTitle="Expired" />
                                </Tab>
                                <Tab eventKey="Sold" title="Sold" mountOnEnter unmountOnExit={false}>
                                    <EmptyTabContent tabTitle="Sold" />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="Reviews" title="Reviews" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <EmptyTabContent tabTitle="Reviews" />
                        </Tab>
                        <Tab eventKey="Favourite Ads" title="Favourite Ads" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <EmptyTabContent tabTitle="Favourite Ads" />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};
