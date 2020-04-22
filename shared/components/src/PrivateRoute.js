import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { PageLoader } from '@simrs/components';
import { request } from '@simrs/common';

const validateToken = async () => {
  let response = await request.post('/auth/personel/validate/login');
  return response;
};

class PrivateRoute extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { loading: false, isAuth: false };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true });
    let response = await validateToken();
    if (this._isMounted) {
      if (response.data.isValidToken) {
        this.setState({ isAuth: true });
      } else {
        this.setState({ isAuth: false });
      }
      this.setState({ loading: false });
    }
  }

  render() {
    const { component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (this.state.loading) {
            return <PageLoader active={true} />;
          }

          return (() => {
            if (this.state.isAuth) {
              return Component ? (
                <Component {...routeProps} />
              ) : (
                render(routeProps)
              );
            } else {
              return null;
            }
          })();
        }}
      />
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

PrivateRoute.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  component: PropTypes.node,
  render: PropTypes.func,
};

export default PrivateRoute;
