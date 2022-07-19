import React from 'react';
import { useQuery } from '../utils';
import { VerifyEmail } from '../components';

export const VerifyEmailPage: React.FC = (): React.ReactElement => {
    const query = useQuery();
    const getToken = query.get("token");

    return (
        <>
            {getToken && <VerifyEmail token={getToken} />}
        </>
    );
}