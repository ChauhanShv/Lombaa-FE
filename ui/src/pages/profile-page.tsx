import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { useAxios } from '../services/base-service';
import { ProfileHeaderCard, ProfileVerificationCard, ProfileTabs } from '../components';

export const ProfilePage: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const { userId } = useParams<{ userId: string }>();

    const [{ data, loading, error }, execute] = useAxios({
        url: `/user/seller/${userId}`,
        method: 'GET',
    });

    useEffect(() => {
        if (userId)
            execute({});
    }, []);

    return (
        <Container fluid>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <ProfileHeaderCard otherUser={data?.data?.userData} />
                    {!userId && <ProfileVerificationCard />}
                    {userId ?
                        <ProfileTabs
                            inReviewUserProducts={data?.data?.inReview}
                            soldUserProducts={data?.data?.sold}
                            expiredUserProducts={data?.data?.expired}
                            activeUserProducts={data?.data?.active}
                            declinedUserProducts={data?.data?.declined}
                        /> :
                        <ProfileTabs />
                    }
                </>
            )}
        </Container>
    )
};