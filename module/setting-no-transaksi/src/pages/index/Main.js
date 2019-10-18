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
                list={<List containerHeight="244px" columnDefs={this._getColumnDefs()} {...this.props} />}
                create={<Create {...this.props} />}
                footerActions={<FooterActions {...this.props} />}
            />
        );
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.alias`),
                field: "alias",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.prefix`),
                field: "prefix",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.format_tanggal`),
                field: "format_tanggal",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.type_reset`),
                field: "type_reset"
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.jumlah_digit`),
                field: "jumlah_digit"
            },
        ]
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default Main;
