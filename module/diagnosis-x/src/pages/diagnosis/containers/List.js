import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List as ListNested } from '@simrs/main/src/modules/master/nested';

class List extends Component {

    render() {
        let { resource, subResource } = this.props;

        return (
            <ListNested
                resource={resource}
                subResource={subResource}
                columnDefs={this._getColumnDefs()}
                {...this.props}
            />
        )
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kode_dx`),
                field: "kode_dx",
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
