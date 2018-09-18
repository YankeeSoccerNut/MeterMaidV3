import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => {
      console.log('isAuth in PrivateRoute>>>>', isAuth);
      return (
        <Route
          render={props =>
            isAuth ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      );
    }}
  </AuthConsumer>
);

export default PrivateRoute;
