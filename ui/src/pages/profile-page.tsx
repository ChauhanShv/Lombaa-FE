import React from 'react';
import { useAppContext, ActionTypes } from '../contexts';
import { useAxios } from '../services/base-service';
import { Container } from 'react-bootstrap';
import { ProfileHeaderCard, ProfileVerificationCard, ProfileTabs } from '../components';

export const ProfilePage: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    /**
     * Sample API call:
     * 
     * Get request:
     * Refetch is a fuction when called will call the same API again
     * const [{ data, loading, error }, refetch] = useAxios('/someurl');
     * 
     * Post request:
     * const [{ data, loading, error }] = useAxios({
     *      url: '/someurl',
     *      method: 'POST',
     *      data: {
     *          key: 'value',
     *      }
     * });
     * 
     * Post request with manual true:
     * Manual true will not call instantly, it will only call when execute function is called
     * const [{ data, loading, error }, execute] = useAxios({
     *      url: '/someurl',
     *      method: 'POST',
     * });
     * 
     * const onSubmit = () => execute({
     *      data: {
     *          key: 'value',
     *      }
     * });
     * 
     */

    const doLogout = () => {
        dispatch({
            type: ActionTypes.LOGOUT,
        });
    };

    const [{ data, loading, error }] = useAxios({
        url: '/someurl',
        method: 'POST',
        data: {
            key: 'value',
        }
    });
    return (
        <Container fluid>
            <ProfileHeaderCard />
            <ProfileVerificationCard />
            <ProfileTabs />
        </Container>
    )
};