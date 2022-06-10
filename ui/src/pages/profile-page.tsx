import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAxios } from '../services/base-service';
import { ProfileHeaderCard, ProfileVerificationCard, ProfileTabs } from '../components';

export const ProfilePage: React.FC = (): React.ReactElement => {

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
                    <ProfileTabs />
                </>
            )}
        </Container>
    )
};