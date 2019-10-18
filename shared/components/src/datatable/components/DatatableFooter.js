import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { formatter } from '@simrs/common';

import alias from '../const';

class DatatableFooter extends Component {

    constructor(props, context) {
        super(props, context);

        this._onGridReady = this._onGridReady.bind(this);
        this._handleResizeWindow = this._handleResizeWindow.bind(this);
    }

    render() {
        const {
            data,
            name,
            columns,
            containerHeight,
            containerWidth,
            disabled,
            messageDisabled,
            ...gridOptions
        } = this.props;

        let containerStyle = {
            height: containerHeight,
            width: containerWidth
        };

        let options = {
            onGridReady: this._onGridReady,
            components: {
                loadingRenderer: this._renderLoading,
                dateRenderer: this._renderDate,
                currencyRenderer: this._renderCurrency,
            },
            overlayNoRowsTemplate: this._renderNoRowsTemplate(),
            overlayLoadingTemplate: this._renderLoadingTemplate()
        }

        options = {
            ...gridOptions,
            ...options,
        }

        return (
            <Segment
                loading={disabled}
                className="ag-grid-segment footer"
            >
                <div
                    style={containerStyle}
                    className={`${this.props.theme}`}
                >
                    <AgGridReact
                        ref={name}
                        columnDefs={columns}
                        {...options}
                    />
                </div>
            </Segment>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResizeWindow);
    }

    _onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        if (this.props.sizeColumnsToFit) {
            this.gridApi.sizeColumnsToFit();
        }

        window.addEventListener("resize", this._handleResizeWindow);
    }

    _handleResizeWindow() {
        let _this = this;
        setTimeout(function () {
            _this.gridApi.sizeColumnsToFit();
        });
    }

    _renderDate(params) {
        if (params.value) {
            return formatter.dateFormatClient(params.value);
        } else {
            return params.value;
        }
    }

    _renderCurrency(params) {
        if (params.value) {
            return formatter.currency(params.value);
        } else {
            return params.value;
        }
    }

    _renderNoRowsTemplate() {
        return (
            "<h4>Tidak ada data</h4>"
        )
    }

    _renderLoadingTemplate() {
        return (
            '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
        )
    }
}

DatatableFooter.propTypes = {
    name: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    theme: PropTypes.string,
    disabled: PropTypes.bool,
    containerHeight: PropTypes.string,
    messageDisabled: PropTypes.string,
    containerWidth: PropTypes.string,
    headerHeight: PropTypes.string,
    sizeColumnsToFit: PropTypes.bool,
    onModelUpdated: PropTypes.func,
    rowStyle: PropTypes.object,
    suppressHorizontalScroll: PropTypes.bool,
}

DatatableFooter.defaultProps = {
    theme: alias.theme.balham,
    containerHeight: '30px',
    containerWidth: '100%',
    disabled: false,
    messageDisabled: '',
    sizeColumnsToFit: true,
    headerHeight:"0",
    rowStyle:{ fontWeight: 'bold' },
    suppressHorizontalScroll:true
}

export default DatatableFooter;
