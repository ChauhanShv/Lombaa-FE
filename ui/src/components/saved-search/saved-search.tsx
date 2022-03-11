import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useAxios } from '../../services';
import { SavedSearch, Filter } from './types';

export const SavedSearches: React.FC = (): React.ReactElement => {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
    const [{ data, loading }, execute] = useAxios({
        url: '/user/savedsearch',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setSavedSearches(data?.data);
        };
    }, [data]);

    return (
        <Col className="col-lg-12 my-4">
            <Card>
                <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                    <span className="d-flex align-items-center">
                        <Link to='/settings' className="btn btn-white d-md-block d-lg-none">
                            left
                        </Link>
                        My Saved Searches
                    </span>
                    <Badge pill bg="success" className="border fw-normal p-3" text="white">
                        Searches ({savedSearches.length})
                    </Badge>
                </Card.Header>
                <div className="text-end">
                    <Button variant="link" className="text-success mt-2">
                        <small>Clear All Searches</small>
                    </Button>
                </div>
                <div className="p-3">
                    {savedSearches && !!savedSearches.length && savedSearches.map((search: SavedSearch, searchIndex: number) =>
                        <Card body className="mb-3" key={searchIndex.toString()}>
                            <CloseButton className="position-absolute top-0 end-0 pt-3" />
                            <Badge bg="white" className="border me-2 mb-3 fw-normal" text="dark">
                                Search
                            </Badge>
                            <Badge bg="gray" className="border me-2 fw-normal" text="white">
                                {search.search}
                            </Badge>
                            <br />
                            {!!search.filters.length && search.filters.map((filter: Filter, index: number) =>
                                <div key={filter.key + index.toString()} className="mb-2">
                                    <Badge bg="white" className="border me-2 fw-normal" text="dark">
                                        {filter.key}
                                    </Badge>
                                    <Badge bg="gray" className="border me-2 fw-normal" text="white">
                                        {filter.values.toString()}
                                    </Badge>
                                </div>
                            )}
                        </Card>
                    )}
                </div>
            </Card>
        </Col>
    );
};