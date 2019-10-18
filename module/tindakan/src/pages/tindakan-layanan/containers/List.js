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
        const { history, selectedRow, post } = this.props;
        history.push({
            pathname: `/tindakan-komponen/${selectedRow}`,
            state: {
                ...this.props.location.state,
                tindakanKomponen: true,
                tindakan: selectedRow,
                tarif: post.tarif,
                nama_layanan: post.nama_layanan,
                nama_kelas: post.nama_kelas,
                is_edit_tindakan: false
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
                headerName: this.props.t(`${this.props.resource}:header.column.kode_panggil`),
                field: "kode_panggil",
                width: 150,
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kelas`),
                field: "nama_kelas",
                width: 80,
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tgl_aktif_tarif`),
                field: "tgl_aktif_tarif",
                cellRenderer: 'dateRenderer',
                cellClass: "ag-date-cell",
                width: 100,
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status`),
                field: "string_aktif",
                width: 60
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tarif`),
                field: "tarif",
                cellRenderer: 'currencyRenderer',
                width: 100,
                cellClass: "ag-number-cell"
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
