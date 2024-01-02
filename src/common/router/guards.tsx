import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuthentication} from "../hooks/use-authentication";

type Props = {
    component: React.ComponentType<any>;
    path: string;
    exact: boolean;
}

export const PrivateGuard: React.FC<Props> = ({ component: Component, path, exact }) => {
    const { isAuthenticated } = useAuthentication();

    return (
        <Route exact={exact} path={path} render={() => isAuthenticated() ? <Component /> : <Redirect to="/login" />} />
    )
};

export const PublicGuard: React.FC<Props> = ({ component: Component, path, exact }) => {
    const { isAuthenticated } = useAuthentication();

    return (
        <Route exact={exact} path={path} render={() => !isAuthenticated() ? <Component /> : <Redirect to="/home" />} />
    )
};
