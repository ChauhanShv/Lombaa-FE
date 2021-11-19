import React from 'react';
import { Tabs, Tab, Container, Row, Col, Image, Button } from 'react-bootstrap';
import { ProfileProductTile } from './profile-product-tile';
import '../../pages/profile-page.css';


/**Have declared the interface here itself since not sure whether this component will be used or not
in future, these are temporary changes in order to render the basic design*/
interface TabContentProps {
    tabTitle: string,
};

const TabContent: React.FC<TabContentProps> = ({ tabTitle }: TabContentProps): React.ReactElement => {
    return (
        <div style={{ textAlign: 'center'  }} className="pt-15 pb-15">
            <svg style={{ width: '20%' }} viewBox="0 0 24 24">
                <path fill="#888" d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.47L22.54 16.88L20.41 19" />
            </svg>
            <p className="tab-placeholder-text">{`We could not fetch anything for ${tabTitle} tab. There is no data available.`}</p>
            <Button className='' variant="success">Sell Your Item</Button>
        </div>
    );
}

export const ProfileTabs = () => {
    return (
        <Container className="p-4">
            <Row className="py-4">
                <Col md={12} className="p-0">
                    <Tabs className="profile-tabs" defaultActiveKey="MyListing" id="uncontrolled-tab-example">
                        <Tab eventKey="MyListing" title="My Listing" mountOnEnter unmountOnExit={false} className="py-4 px-3 border">
                            <Tabs defaultActiveKey="Active" id="uncontrolled-tab-example">
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
