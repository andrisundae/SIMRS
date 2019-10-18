import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

import Filter from './containers/Filter';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import List from './containers/List';
import { Main as Module, moduleActions } from '@simrs/main/src/modules/master/nested';

class Main extends Component {
    constructor(props) {
        super(props);

        this.subResource = '_billing_master_wilayah_kota';
    }

    render() {
        return (
            <Module
                subResource={this.subResource}
                filter={<Filter subResource={this.subResource} {...this.props} />}
                list={<List subResource={this.subResource} {...this.props} />}
                create={<Create subResource={this.subResource} {...this.props} />}
                footerActions={<FooterActions subResource={this.subResource} {...this.props} />}
                caption={this.props.t(`${this.props.resource}:kota.title`) + ` Provinsi ${this.props.location.state.nama_provinsi}`}
                isChildren={true}
                isLoading={this.props.isLoading}
                loaderMessage={this.props.loaderMessage}
                {...this.props}
            />
        );
    }

    componentDidMount() {
        this.props.action.openForm(this.props.resource, this.subResource, { provinsi: this.props.match.params.provinsi });
    }

    componentWillUnmount() {
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
};

const mapStateToProps = function (state) {

    return {
        isLoading: state.loader.count > 0,
        loaderMessage: state.loader.message,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            openForm: moduleActions.openForm,
            toastrRemoveByType: toastrActions.removeByType
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
