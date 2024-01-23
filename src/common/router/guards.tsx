import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/services/auth.slice";

type Props = {
  component: React.ComponentType<any>;
  path: string;
  exact: boolean;
};

export const PrivateGuard: React.FC<Props> = ({
  component: Component,
  path,
  exact,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export const PublicGuard: React.FC<Props> = ({
  component: Component,
  path,
  exact,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        !isAuthenticated ? <Component /> : <Redirect to="/home" />
      }
    />
  );
};
