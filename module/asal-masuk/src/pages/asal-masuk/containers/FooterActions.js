import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isGranted } from '@simrs/main/src/modules/auth';
import { FooterActions as Footer } from '@simrs/main/src/modules/master/nested';

class FooterActions extends Component {
  render() {
    return (
      <Footer {...this.props} permissions={this.props.customPermissions} />
    );
  }
}

const mapStateToProps = function (state, props) {
  return {
    customPermissions: {
      canAdd: isGranted(props.permissions, 'tambah_master'),
      canEdit: isGranted(props.permissions, 'koreksi_master'),
      canDelete: isGranted(props.permissions, 'hapus_master'),
    },
  };
};

FooterActions.propTypes = {
  resource: PropTypes.string.isRequired,
  subResource: PropTypes.string.isRequired,
  permissions: PropTypes.array,
  customPermissions: PropTypes.object,
};

export default connect(mapStateToProps)(FooterActions);
