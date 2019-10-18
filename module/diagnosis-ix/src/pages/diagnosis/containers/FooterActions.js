import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isGranted } from '@simrs/main/src/modules/auth';
import { FooterActions as Footer } from '@simrs/main/src/modules/master/nested';

class FooterActions extends Component {

    render() {
        return (
            <Footer {...this.props} />
        )
    }
}

const mapStateToProps = function (state) {
    const { acl } = state;

    return {
        permissions: {
            canAdd: isGranted(acl, 'tambah_diagnosis_ix'),
            canEdit: isGranted(acl, 'koreksi_diagnosis_ix'),
            canDelete: isGranted(acl, 'hapus_diagnosis_ix')
        },
    }
}

FooterActions.propTypes = {
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    permissions: PropTypes.object,
};

export default connect(mapStateToProps)(FooterActions);
