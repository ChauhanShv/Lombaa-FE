import React from 'react';

import { CategoryList, HomeBanner, ImageCarousel } from '../components/layout';

export const HomePage: React.FC = ():React.ReactElement => {
    return (
        <>
            <HomeBanner />
            <CategoryList />
            <ImageCarousel />
        </>
    );
};
