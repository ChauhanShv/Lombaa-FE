import React from 'react';
import Container from 'react-bootstrap/Container';
import { SavedSearches } from '../components';

export const SavedSearchesPage: React.FC = (): React.ReactElement => {
    return (
        <Container>
            <SavedSearches />
        </Container>
    );
};