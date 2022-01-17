import React, { useState, useEffect } from 'react';
import { useAxios } from '../../services';
import { Loader } from '../loader';
import { useAppContext, ActionTypes } from '../../contexts';
import { CreatePost, Categories } from '.';

export const CreatePostContainer: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const categories = state?.category;

    return <CreatePost categories={categories} />;
};
