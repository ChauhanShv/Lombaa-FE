import React, { useState, useEffect } from 'react';
import { useAxios } from '../../services';
import { Loader } from '../loader';
import { CreatePost, Categories } from '.';

export const CreatePostContainer: React.FC = (): React.ReactElement => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [{ data, loading }, execute] = useAxios({
        url: '/category',
        method: 'GET',
    });

    useEffect(() => {
        execute();
    }, []);
    useEffect(() => {
        if (data?.code === 200) {
            setCategories(data.response);
        }
    }, [data]);

    return loading ? <Loader show={loading} /> : <CreatePost categories={categories} />;
};
