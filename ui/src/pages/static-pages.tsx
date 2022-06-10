import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAxios } from '../services';

export const StaticPages: React.FC = (): React.ReactElement => {

    const { page } = useParams<{ page: string }>();

    const [{ data, loading, error }] = useAxios({
        url: `/page/${page}`,
        method: 'GET',
    }, { manual: false });

    return (
        <Container>
            {loading ? (
                <CircularProgress />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: data?.data?.content }}>
                </div>
            )}
        </Container>
    );
}