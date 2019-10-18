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
                filter={<Filter {...this.props} />}
                list={<List containerHeight="214px" columnDefs={this._getColumnDefs()} {...this.props} />}
                create={<Create {...this.props} />}
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
                headerName: this.props.t(`${this.props.resource}:header.column.penanggung_jawab`),
                field: "nama_penanggung_jawab",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.keterangan`),
                field: "keterangan",
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
