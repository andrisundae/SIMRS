import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import Filter from './containers/Filter';
import FooterActions from './containers/FooterActions';
import List from './containers/List';
import { Main as Module, moduleActions } from '@simrs/main/src/modules/master/nested';
import actions from './actions';

class Main extends Component {
    constructor(props) {
        super(props);

        this.subResource = '_billing_master_tarif_tindakan_komponen';
    }

    render() {
        const { location, redirectTindakan } = this.props;
        const {nama_layanan, nama_kelas} = location.state.selectedData;
        return (
            redirectTindakan ? <Redirect to={{
                pathname: '/tindakan',
                state: {is_edit_tindakan: true}
            }} /> :
            <Module
                subResource={this.subResource}
                filter={<Filter subResource={this.subResource} {...this.props} />}
                list={<List subResource={this.subResource} {...this.props} />}
                footerActions={<FooterActions subResource={this.subResource} {...this.props} />}
                caption={
                    this.props.t(`${this.props.resource}:komponen.title`,
                    {
                        layanan: nama_layanan,
                        kelas: nama_kelas,
                    }
                )}
                isChildren={true}
                isLoading={this.props.isLoading}
                loaderMessage={this.props.loaderMessage}
                {...this.props}
            />
        );
    }

    componentDidMount() {
        const { match, location } = this.props;
        const { selectedData, is_edit_tindakan } = location.state;

        this.props.action.openForm(
            this.props.resource,
            this.subResource,
            {
                tindakan: match.params.tindakan,
                klasifikasi: selectedData.klasifikasi,
                tarif: selectedData.tarif,
                is_edit_tindakan
            }
        );
    }

    componentWillUnmount() {
        this.props.action.onRedirectTindakan(this.props.resource, this.subResource, { isRedirect: false });
        this.props.action.toastrRemoveByType('success');
        this.props.action.toastrRemoveByType('error');
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    loaderMessage: PropTypes.string,
    action: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    t: PropTypes.func,
    redirectTindakan: PropTypes.bool,
};

const mapStateToProps = function (state) {

    return {
        isLoading: state.loader.count > 0,
        loaderMessage: state.loader.message,
        redirectTindakan: state.nested.module.redirectTindakan
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            openForm: moduleActions.openForm,
            toastrRemoveByType: toastrActions.removeByType,
            onRedirectTindakan: (resource, subResource, data) => dispatch(actions.onRedirectTindakan(resource, subResource, data)),
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
