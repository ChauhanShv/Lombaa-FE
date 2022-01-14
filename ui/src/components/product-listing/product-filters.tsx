import React, { useState } from 'react';
import { Container, Breadcrumb, Dropdown, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { MoreFiltersModal } from '.';

export const ProductFilters: React.FC = (): React.ReactElement => {

    const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);

    return (
        <>
            <MoreFiltersModal
                showMoreFilters={showMoreFilters}
                onCloseMoreFilters={() => setShowMoreFilters(false)}
            />

            <Container className="pt-4 pt-lg-4">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="h4 text-secondary mb-1">Get The Best Deals On Used Cars in Ghana</h1>
                <p className="mb-2">Thousands of cars to choose from Kia, Honda, Volkswagen, Toyota and more under $70,000 in Ghana</p>
            </Container>

            <div className="fixed-filters mb-3">
                <Container className="">
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="outline-success btn-success rounded btn-fullround" id="dropdown-autoclose-true">
                            Used Cars
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="pre-scrollable">
                            <InputGroup placeholder="Type your search" className="border-bottom">
                                <FormControl className="border-0"
                                    placeholder="Type your search"
                                    aria-label="Type your search"
                                />
                                <button className="btn-link btn">
                                    <FaSearch />
                                </button>
                            </InputGroup>
                            {[...Array(15)].map((index: number) =>
                                <Dropdown.Item className="py-2" href="#" key={index}>Menu Item</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                            Link Dropdown:
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="pre-scrollable">
                            {[...Array(5)].map((index: number) =>
                                <Dropdown.Item href="#" className="py-2" key={index}>Menu Item</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                            Sort by:
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="pre-scrollable">
                            <div className="px-3 py-1">
                                <Form.Check type="radio" id="dc" label="Best Match" name="sortby" />
                                <Form.Check type="radio" id="dc2" label="Recent" name="sortby" />
                                <Form.Check type="radio" id="dc3" label="Price - High to Low" name="sortby" />
                                <Form.Check type="radio" id="dc4" label="Recent" name="sortby" />
                                <Form.Check type="radio" id="dc5" label="Price - Low to High" name="sortby" />
                                <Form.Check type="radio" id="dc6" label="Reg. Year - New to Old" name="sortby" />
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button className="outline-dark rounded btn-fullround" onClick={() => setShowMoreFilters(true)}>More Filters</Button>
                </Container>
            </div>
        </>
    );
}