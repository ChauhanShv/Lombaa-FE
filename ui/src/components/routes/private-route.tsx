import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../../contexts';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component,
    ...rest
}: PrivateRouteProps) => {
    const { state } = useAppContext();
    const isLogin = (): boolean => !! state.user;
    return (
        <Route {...rest} render={(props: any) => (
            isLogin() ?
            React.createElement(component, props)
            : <Redirect to="/login" />
        )} />
    );
};