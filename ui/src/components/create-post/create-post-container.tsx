import React, { useState, useEffect } from 'react';
import { useAxios } from '../../services';
import { Loader } from '../loader';
import { useAppContext, ActionTypes } from '../../contexts';
import { CreatePost, Categories } from '.';

export const CreatePostContainer: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const categories = state?.category;
    // const [categories, setCategories] = useState<Categories[]>([]);
    // const [{ data, loading }, execute] = useAxios({
    //     url: '/category',
    //     method: 'GET',
    // });

    // useEffect(() => {
    //     execute();
    // }, []);
    // useEffect(() => {
    //     if (data?.code === 200) {
    //         setCategories(data.response);
    //     }
    // }, [data]);

    return <CreatePost categories={categories} />;
};
