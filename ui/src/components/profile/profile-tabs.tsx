import React from 'react';
import { Tabs, Tab, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ProfileProductTile } from './profile-product-tile';
import '../../pages/profile-page.css';


/**Have declared the interface here itself since not sure whether this component will be used or not
in future, these are temporary changes in order to render the basic design*/
interface TabContentProps {
    tabTitle: string,
};

const TabContent: React.FC<TabContentProps> = ({tabTitle} : TabContentProps): React.ReactElement => {
    return (
        <>
            {`tab: ${tabTitle}`}
        </>
    );
}

export const ProfileTabs = () => {
    return(
        <Container className="p-4">
            <Row className="py-4">
                <Col md={12} className="p-0">
                    <Tabs className="profile-tabs" defaultActiveKey="MyListing" id="uncontrolled-tab-example">
                        <Tab eventKey="MyListing" title="My Listing" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <Tabs defaultActiveKey="myads" id="uncontrolled-tab-example">
                                <Tab eventKey="Active" title="Active" mountOnEnter unmountOnExit={false} className="py-4 my-listing">
                                    <Row className="row">
                                        <ProfileProductTile />
                                        <ProfileProductTile />
                                        <ProfileProductTile />
                                    </Row>
                                </Tab>
                                <Tab eventKey="Inactive" title="Inactive" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="Inactive" />
                                </Tab>
                                <Tab eventKey="Reviewing" title="Reviewing" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="Reviewing" />
                                </Tab>
                                <Tab eventKey="Declined" title="Declined" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="Declined" />
                                </Tab>
                                <Tab eventKey="Draft" title="Draft" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="Draft" />
                                </Tab>
                                <Tab eventKey="Closed" title="Closed" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="Closed" />
                                </Tab>
                                <Tab eventKey="All" title="All" mountOnEnter unmountOnExit={false}>
                                    <TabContent tabTitle="All" />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="Reviews" title="Reviews" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <TabContent tabTitle="Reviews" />
                        </Tab>
                        <Tab eventKey="Favourite Ads" title="Favourite Ads" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <TabContent tabTitle="Favourite Ads" />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};
