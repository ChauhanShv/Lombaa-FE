import React from 'react';
import { Loader } from '../loader';
import { useAppContext } from '../../contexts';
import { EditPost } from '.';
import { Category } from '../../types';

export const EditPostContainer: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const categories: Category[] = state?.category;

    return !categories ? <Loader show={true} /> : <EditPost categories={categories} />;
};
