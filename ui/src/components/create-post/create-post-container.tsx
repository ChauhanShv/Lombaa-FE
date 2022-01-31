import React from 'react';
import { Loader } from '../loader';
import { useAppContext } from '../../contexts';
import { CreatePost } from '.';
import { Category } from '../../types';

export const CreatePostContainer: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const categories: Category[] = state?.category;

    return !categories ? <Loader show={true} /> : <CreatePost categories={categories} />;
};
