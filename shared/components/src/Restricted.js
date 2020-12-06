import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'querystring';

import { request } from '@simrs/common';
import { PageLoader } from '@simrs/components';
import { withModuleConsumer } from './provider';

const getGranted = async (route) => {
  let response = await request.post('/acl/tabel/fitur/granted', {
    menu: route,
  });
  return response;
};

class Restriced extends Component {
  constructor(props) {
    super(props);

    this.state = { isCheck: false, isGranted: false, permission: [] };
  }

  async _checkPermission() {
    try {
      // let res = isGranted(this.props.route || this._getCurrentRoute(), this.props.role);
      // res.then(isGranted => {
      //     this.setState({ isCheck: true, isGranted: isGranted })
      // })

      let response = await getGranted(
        this.props.route || this._getCurrentRoute()
      );
      if (response.status) {
        const isGranted = response.data.find(
          (permission) => permission === this.props.role
        );
        this.setState(
          { isCheck: true, isGranted, permission: response.data },
          () => {
            const moduleActions = this.props.moduleActions(
              this.props.moduleDispatch
            );
            moduleActions.setPermissions(response.data);
          }
        );
      } else {
        this.setState({ isCheck: true, isGranted: false });
      }
    } catch (error) {
      this.setState({ isCheck: true, isGranted: false });
    }
  }

  render() {
    const { render } = this.props;

    if (!this.state.isCheck) {
      this._checkPermission();

      return <PageLoader active={true} />;
    }

    return (() => {
      if (this.state.isGranted) {
        return <Fragment>{render(this.state.permission)}</Fragment>;
      } else {
        return <Redirect to="/permission-denied" />;
      }
    })();
  }

  _getCurrentRoute() {
    let params = parse(this.props.location.search.substr(1));

    return params.route ? params.route : '_billing_master';
  }
}

Restriced.propTypes = {
  route: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
};

Restriced.defaultProps = {
  role: 'view',
};

export default withModuleConsumer(Restriced);
