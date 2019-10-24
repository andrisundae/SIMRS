import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isGranted } from '@simrs/main/src/modules/auth';
import { FooterActions as Footer } from '@simrs/main/src/modules/master/nested';

class FooterActions extends Component {

    render() {
        return (
            <Footer {...this.props} permissions={this.props.customPermissions} />
        )
    }
}

const mapStateToProps = function (state, props) {
    const { post } = state.nested.filter;
    const isNotTempatTidur = post.selectedKlasifikasi ? (post.selectedKlasifikasi.alias !== 'tempat_tidur' ? true : false) : false;

    return {
        customPermissions: {
            canAdd: isGranted(props.permissions, 'tambah_kelompok') && isNotTempatTidur,
            canEdit: isGranted(props.permissions, 'koreksi_kelompok') && isNotTempatTidur,
            canDelete: isGranted(props.permissions, 'hapus_kelompok') && isNotTempatTidur
        },
    }
}

FooterActions.propTypes = {
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    permissions: PropTypes.array,
    customPermissions: PropTypes.object,
    post: PropTypes.object,
};

export default connect(mapStateToProps)(FooterActions);
