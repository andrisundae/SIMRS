import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

class Main extends Component {
    render() {
        return (
            <Module
                {...this.props}
                icon={`address book icon`}
                filter={<Filter {...this.props} />}
                list={<List columnDefs={this._getColumnDefs()} {...this.props} sizeColumnsToFit={false}/>}
                create={<Create {...this.props} />}
            />
        );
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.alamat`),
                field: "alamat",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.telp`),
                field: "telp",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.email`),
                field: "email",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.npwp`),
                field: "npwp",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.alias`),
                field: "alias",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama_cp`),
                field: "namaContactPerson",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.telp_cp`),
                field: "telpContactPerson",
                width: 300
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status`),
                field: "str_aktif",
                width: 60
            },
        ]
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default Main;
