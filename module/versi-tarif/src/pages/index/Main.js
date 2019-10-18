import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

class Main extends Component {
    render() {
        return (
            <Module
                {...this.props}
                filter={<Filter {...this.props} />}
                list={<List containerHeight="214px" columnDefs={this._getColumnDefs()} {...this.props} />}
                create={<Create {...this.props} />}
                footerActions={<FooterActions {...this.props} />}
            />
        );
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tgl_aktif_tarif`),
                field: "tgl_aktif_tarif",
                cellRenderer: 'dateRenderer',
                width: 150
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status_aktif_kunjungan`),
                field: "status_aktif_kunjungan",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status`),
                field: "string_aktif",
                width: 60
            },
        ]
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default Main;
