import React from 'react';
import { useLocation } from 'react-router-dom';
import { VerifyEmail } from '../components';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const VerifyEmailPage: React.FC = (): React.ReactElement => {
    const query = useQuery();
    const getToken = query.get("token")

    return (
        <>
            {getToken && <VerifyEmail token={getToken} />}
        </>
    );
}