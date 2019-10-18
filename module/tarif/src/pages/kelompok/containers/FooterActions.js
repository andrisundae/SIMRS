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
    const { post } = state.nested.filter;
    const isNotTempatTidur = post.selectedKlasifikasi ? (post.selectedKlasifikasi.alias !== 'tempat_tidur' ? true : false) : false;

    return {
        permissions: {
            canAdd: isGranted(acl, 'tambah_kelompok') && isNotTempatTidur,
            canEdit: isGranted(acl, 'koreksi_kelompok') && isNotTempatTidur,
            canDelete: isGranted(acl, 'hapus_kelompok') && isNotTempatTidur
        },
    }
}

FooterActions.propTypes = {
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    permissions: PropTypes.object,
    post: PropTypes.object,
};

export default connect(mapStateToProps)(FooterActions);
