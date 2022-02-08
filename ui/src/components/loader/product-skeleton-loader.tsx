import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

export const ProductSkeletonLoader: React.FC = () => {
    return (
        <>
            {[...Array(12)].map(() =>
                <Grid lg={3} sm={12} mb={2} spacing={2}>
                    <Skeleton animation="wave" variant="rectangular" height={170} />
                    <Skeleton animation="wave" variant="text" height={35} />
                    <Skeleton animation="wave" variant="text" height={25} />
                    <Skeleton animation="wave" variant="text" height={20} />
                    <Grid item lg={4}>
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                    </Grid>
                    <Grid lg={8}>
                        <Skeleton animation="wave" variant="rectangular" height={15} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}