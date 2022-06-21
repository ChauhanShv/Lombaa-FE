import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios } from '../../../services/base-service';
import { useAppContext, ActionTypes } from '../../../contexts';
import { Header, Footer } from '..';

interface AppContainerProps {
    children: React.ReactElement;
};
export const AppContainer = ({ children }: AppContainerProps) => {
    const { state, dispatch } = useAppContext();
    const [{ data: response, error }, refetch] = useAxios({
        url: '/user/isActive',
        method: 'GET',
    });
    const token = localStorage.getItem('token');
    const location = useLocation();

    const getLocation = (): void => {
        navigator.geolocation.getCurrentPosition((position) => {
            navigator.permissions.query({
                name: 'geolocation',
            }).then((result) => {
                if (result.state == 'granted') {
                    dispatch({
                        type: ActionTypes.SETLATLNG,
                        payload: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    });
                }
            });
        });
    };

    useEffect(() => {
        if (token) {
            refetch();
        } else {
            dispatch({
                type: ActionTypes.LOGOUT,
            });
            dispatch({
                type: ActionTypes.APP_READY,
            });
        }
    }, []);

    useEffect(() => {
        getLocation();
    }, [state.user?.metaData]);

    useEffect(() => {
        if (error) {
            dispatch({
                type: ActionTypes.LOGOUT,
            });
            dispatch({
                type: ActionTypes.APP_READY,
            });
        } else if (response?.success) {
            dispatch({
                type: ActionTypes.LOGIN,
                payload: {
                    metaData: response?.response?.user,
                    token: response?.response?.token || token,
                }
            });
            dispatch({
                type: ActionTypes.APP_READY,
            });
        }
    }, [response, error]);

    const showFooter = () => {
        const footerHiddenRoutes: string[] = [
            '/create-post',
            location.pathname.match('/chat')?.input || '/chat',
        ];
        return !footerHiddenRoutes.includes(location.pathname);
    };

    const renderChildren = () => {
        return (
            <>
                <Header />
                {children}
                {showFooter() && <Footer />}
            </>
        );
    };
    return !state.app?.appReady ? <div>Loading...</div> : renderChildren();
};