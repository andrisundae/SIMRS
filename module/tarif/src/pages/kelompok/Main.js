import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Filter from './containers/Filter';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import List from './containers/List';
import { Main as Module, moduleActions } from '@simrs/main/src/modules/master/nested';

class Main extends Component {
    constructor(props) {
        super(props);

        this.subResource = '_billing_master_tarif_kelompok';
    }

    render() {
        let namaKlasifikasi = this.props.selectedKlasifikasi ? this.props.selectedKlasifikasi.label : '';

        return (
            <Module
                {...this.props}
                subResource={this.subResource}
                filter={<Filter subResource={this.subResource} {...this.props} />}
                list={<List subResource={this.subResource} {...this.props} />}
                create={<Create subResource={this.subResource} {...this.props} />}
                footerActions={<FooterActions subResource={this.subResource} {...this.props} />}
                caption={this.props.t(`${this.props.resource}:kelompok.title`, {klasifikasi: namaKlasifikasi})}
                isLoading={this.props.isLoading}
                loaderMessage={this.props.loaderMessage}
            />
        );
    }

    componentDidMount() {
        this.props.openForm(this.props.resource, this.subResource);
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    loaderMessage: PropTypes.string,
    selectedKlasifikasi: PropTypes.object,
    openForm: PropTypes.func
};

const mapStateToProps = function (state) {
    return {
        isLoading: state.loader.count > 0,
        loaderMessage: state.loader.message,
        selectedKlasifikasi: state.nested.filter.post.selectedKlasifikasi
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        openForm: (resource, subResource) => dispatch(moduleActions.openForm(resource, subResource)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
