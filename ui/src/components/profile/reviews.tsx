import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts';
import { useAxios } from '../../services';
import { EmptyTabContent } from './product-tab-list';

export const Reviews: React.FC = (): React.ReactElement => {

    const { state } = useAppContext();

    const [{ data, loading, error }, execute] = useAxios({
        url: `/user/${state.user?.metaData?.id}/reviews`,
        method: 'GET',
    }, { manual: false });
    const [{ data: reviewMetaRes, loading: reviewMetaLoading }, executeReviewMeta] = useAxios({
        url: `/user/${state.user?.metaData?.id}/review/meta`,
        method: 'GET',
    }, { manual: false });
    const [{ data: reviewedRes, loading: reviewedLoading }, executeReviewed] = useAxios({
        url: '/user/reviewed?offset=0&limit=4',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
    }, [data]);

    return (
        <>
            <EmptyTabContent tabTitle="Reviews" />
        </>
    );
};