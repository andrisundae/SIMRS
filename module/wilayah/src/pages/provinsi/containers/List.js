import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List as ListNested } from '@simrs/main/src/modules/master/nested';

class List extends Component {
    constructor(props) {
        super(props);

        this._onRowDoubleClick = this._onRowDoubleClick.bind(this);
        this._onRowEntered = this._onRowEntered.bind(this);
    }

    render() {
        let { resource, subResource } = this.props;

        return (
            <ListNested
                onRowDoubleClicked={this._onRowDoubleClick}
                onRowEntered={this._onRowEntered}
                resource={resource}
                subResource={subResource}
                columnDefs={this._getColumnDefs()}
                {...this.props}
            />
        )
    }

    _next() {
        this.props.history.push({
            pathname: `/kota/${this.props.selectedRow}`,
            state: {
                kota: true,
                id_provinsi: this.props.selectedRow,
                nama_provinsi: this.props.post.nama
            }
        });
    }

    _onRowDoubleClick() {
        return this._next();
    }

    _onRowEntered() {
        this._next();
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kode`),
                field: "kode_provinsi",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status`),
                field: "string_aktif",
                width: 60
            },
        ]
    }
}

const mapStateToProps = function (state) {
    const { module } = state.nested;

    return {
        selectedRow: module.selectedRow,
        post: module.post,
    }
}

List.propTypes = {
    selectedRow: PropTypes.number,
    post: PropTypes.object,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    history: PropTypes.object,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(List);
