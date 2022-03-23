import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

export const ProductSkeletonLoader: React.FC = () => {
    return (
        <Grid container spacing={3}>
            {[...Array(12)].map(() =>
                <Grid item lg={3} md={3} sm={6} xs={12} mb={2}>
                    <Skeleton animation="wave" variant="rectangular" height={170} />
                    <Skeleton animation="wave" variant="text" height={40} />
                    <Skeleton animation="wave" variant="text" height={25} />
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={3}>
                            <Skeleton animation="wave" variant="circular" width={35} height={35} />
                        </Grid>
                        <Grid item xs={9}>
                            <Skeleton animation="wave" variant="text" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}