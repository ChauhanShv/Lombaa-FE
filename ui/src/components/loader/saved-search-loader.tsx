import React from 'react';
import Card from 'react-bootstrap/Card';
import { Skeleton } from '@mui/material';

export const SavedSearchLoader: React.FC = (): React.ReactElement => {
    return (
        <div className='p-3'>
            {[...Array(8)].map(() =>
                <Card body className="mb-3">
                    <Skeleton animation="wave" sx={{ width: '30%' }} />
                    <Skeleton animation="wave" sx={{ width: '30%' }} />
                    <Skeleton animation="wave" sx={{ width: '30%' }} />
                </Card>
            )}
        </div>
    );
};