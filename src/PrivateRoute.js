import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Sign from "./components/sign/Sign";

/*function PrivateRoute(props) {
  if (props.authUser === "") {
    return <Redirect to="/" exact render={() => <Sign />} />;
  }

  return <Route {...props} />;
}

const mapStateToProps = (state) => ({
  authUser: state.authUser
});

export default connect(mapStateToProps)(PrivateRoute);

import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authed = !!rest.authUser;
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps)(PrivateRoute);