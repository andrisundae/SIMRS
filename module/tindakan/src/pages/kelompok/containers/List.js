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
                containerHeight="390px"
                {...this.props}
            />
        )
    }

    _next() {
        const { history, selectedRow, post, postFilter } = this.props;
        history.push({
            pathname: `/layanan/${selectedRow}`,
            state: {
                layanan: true,
                id_kelompok: selectedRow,
                nama_kelompok: post.nama,
                selectedVersiTarif: postFilter.selectedVersiTarif,
                selectedKlasifikasi: postFilter.selectedKlasifikasi,
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
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama_cetak`),
                field: "nama_cetak",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.st_cito`),
                field: "string_st_cito",
                width: 60
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
    const { module, filter } = state.nested;

    return {
        selectedRow: module.selectedRow,
        post: module.post,
        postFilter: filter.post,
    }
}

List.propTypes = {
    selectedRow: PropTypes.number,
    post: PropTypes.object,
    postFilter: PropTypes.object,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    history: PropTypes.object,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(List);
