import React from 'react';
import { CategorySelector } from './category';
import './post-ad.css';

export const PostAdForm: React.FC = (): React.ReactElement => {
    return (
        <div className="d-flex post-ad-box">
            <h1 className="ad-post-text">Ad Post</h1>
            <CategorySelector />
        </div>
    );
};