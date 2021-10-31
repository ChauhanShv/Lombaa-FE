import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../../contexts';

interface PublicRouteProps extends RouteProps {
    component: React.ComponentType;
    restricted?: boolean;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({
    restricted = false,
    component,
    ...rest
}: PublicRouteProps) => {
    const { state } = useAppContext();
    const isLogin = (): boolean => !!state.isLoggedIn;
    return (
        <Route {...rest} render={(props: any) => (
            isLogin() && restricted ?
                <Redirect to="/" />
            : React.createElement(component, props)
        )} />
    );
};
