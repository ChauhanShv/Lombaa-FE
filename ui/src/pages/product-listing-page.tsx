import React from 'react';
import { ProductList, ProductFilters } from '../components';

export const ProductListingPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <div>
                <ProductFilters />
                <ProductList />
            </div>
        </>
    );
};
