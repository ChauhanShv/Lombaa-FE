import React, { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Rating, Typography } from '@mui/material';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts';
import { useAxios } from '../../services';
import { EmptyTabContent } from './product-tab-list';
import { Review } from './types';

export const Reviews: React.FC = (): React.ReactElement => {

    const { state } = useAppContext();
    const [reviews, setReviews] = useState<Review[]>();
    const { userId } = useParams<{ userId: string }>();

    const [{ data, loading, error }] = useAxios({
        url: `/user/${userId ?? state.user?.metaData?.id}/reviews`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setReviews(data?.data);
        }
    }, [data]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            {(loading) ? (
                <LinearProgress />
            ) : (
                <Grid container>
                    {reviews && !!reviews?.length && (
                        <Grid item container mb={2}>
                            <h1 className="fw-bold">
                                {(data?.meta?.averageReviewScore / 10) || 0}{' '}
                                <h4 className='d-inline'>
                                    <h4 className='text-muted d-inline'>out of 5 </h4>
                                    <h5 className='fw-lighter d-inline'>
                                        ({data?.meta?.totalReviewCount} {data?.meta?.totalReviewCount === 1 ? 'review' : 'reviews'})
                                    </h5>
                                </h4>
                            </h1>
                        </Grid>
                    )}
                    {reviews && !!reviews.length && reviews?.map((review: Review) =>
                        <Grid item md={12} xs={12} p={3} mb={3} className="border" key={review?.id}>
                            <Grid container>
                                <Grid item md={5} xs={12}>
                                    <Grid container display="flex" alignItems="center">
                                        <Grid item pr={2}>
                                            <Image
                                                rounded
                                                width='35px'
                                                height='35px'
                                                src={review?.by?.profilePicture || "/images/user-circle.svg"}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="caption">
                                                {review?.by?.name || ""}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} mt={2}>
                                        <Rating
                                            name={review?.id}
                                            value={review.score / 10}
                                            readOnly
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item md={7} xs={12}>
                                    <p>{review?.comment}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
            {!!!reviews?.length && !loading && (
                <EmptyTabContent tabTitle="Reviews" />
            )}
        </Box>
    );
};