import React from 'react';

import { CategoryList, HomeBanner } from '../components/layout';

export const HomePage: React.FC = ():React.ReactElement => {
    return (
        <>
            <HomeBanner />
            <CategoryList />
        </>
    );
};
