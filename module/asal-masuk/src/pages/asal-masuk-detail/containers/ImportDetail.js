import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Modal, Grid, Icon, Form } from 'semantic-ui-react';
import { AddButton, CancelButton, DatatableServerSide, constDatatable } from '@simrs/components';
import { Trans } from 'react-i18next';
import { components } from 'react-select';

import { Select } from '@simrs/components';

import action from '../actions';

const TABLE_DETAIL = 'data_detail';

class ImportDetail extends Component {
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onAdd = this._onAdd.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._handleInstalasiChange = this._handleInstalasiChange.bind(this);

        this.state = {
            cacheBlockSize: 100
        }

        this.dataTable = createRef();
        this.instalasi = createRef();
    }

    render() {
        const { show, t, optionsInstalasi, filter } = this.props;

        return (
            <Modal open={show} onClose={this._onCancel} size="small" closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header><Icon name="list alternate outline" />{t(this._getKey('import_detail.title'))}</Modal.Header>
                <Modal.Content>
                    <Form size="small">
                        <Grid className="content-grid" >
                            <Grid.Row>
                                <Grid.Column width="3" className="field">
                                    <label><Trans i18nKey={this._getKey('label.field.instalasi')} /></label>
                                </Grid.Column>
                                <Grid.Column width="13" className="field">
                                    <Select
                                        name="instalasi"
                                        placeholder={t(this._getKey('placeholder.field.instalasi'))}
                                        inputRef={this.instalasi}
                                        onChange={this._handleInstalasiChange}
                                        value={filter.selectedInstalasi}
                                        options={optionsInstalasi}
                                        components={{ Option: OptionInstalasi }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <DatatableServerSide
                                        ref={this.dataTable}
                                        columns={this._getColumnDefs()}
                                        name={TABLE_DETAIL}
                                        rowSelection={constDatatable.selectionMultiple}
                                        rowDeselection={true}
                                        suppressRowClickSelection={true}
                                        datasource={this._getDataSource()}
                                        rowBuffer={0}
                                        maxConcurrentDatasourceRequests={1}
                                        infiniteInitialRowCount={1}
                                        cacheBlockSize={this.state.cacheBlockSize}
                                        containerHeight="250px"
                                        onSelectionChanged={this._onSelectionChanged}
                                        getRowNodeId={this._getRowNodeId}
                                        sizeColumnsToFit={true}
                                        enableColResize={false}
                                        isRowSelectable={(rowNode) => {
                                            return rowNode.data ? (rowNode.data.exist ? false : true) : false;
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated='right'>
                                <CancelButton
                                    onClick={this._onCancel}
                                />
                                <AddButton
                                    onClick={this._onAdd}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Actions>
            </Modal>
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;

        this.props.action.getInstalasi(this.props.resource, this.props.subResource)
    }

    componentDidUpdate() {
        let { isReloadGrid } = this.props;
        this._bindKey();
        if (isReloadGrid) {
            this._reload();
        }
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("f2");
        MouseTrap.unbind("alt+r");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bind('f2', function (e) {
            e.preventDefault();
            _this._setFirstRowSelected();
        });

        MouseTrap.bind('alt+r', function (e) {
            e.preventDefault();
            _this._reload();
        });
    }

    _getDataSource() {
        let _this = this;

        return {
            rowCount: null,
            getRows: (params) => {
                let filter = {
                    instalasi: _this.props.filter.selectedInstalasi ? _this.props.filter.selectedInstalasi.value : 0,
                    asal_masuk: _this.props.post.asal_masuk ? _this.props.post.asal_masuk : 0,
                }
                let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    sort_name: sortModel.colId ? sortModel.colId : '',
                    sort_order: sortModel.colId ? sortModel.sort : '',
                    ...filter
                };
                _this.props.action.loadAllOnImportDetail(_this.props.resource, _this.props.subResource, post, params);
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[TABLE_DETAIL];
    }

    _reload() {
        this.gridApi.setInfiniteRowCount(1);
        this.gridApi.purgeInfiniteCache();
    }

    _setFirstRowSelected() {
        this.gridApi.ensureIndexVisible(0);
        let firstCol = this.columnApi.getAllDisplayedColumns()[0];
        this.gridApi.ensureColumnVisible(firstCol);
        this.gridApi.setFocusedCell(0, firstCol);
        let cell = this.gridApi.getFocusedCell();
        if (cell) {
            let node = this.gridApi.getModel().getRow(cell.rowIndex);
            if (node) {
                node.setSelected(true, true);
            }
        }
    }

    _onSelectionChanged(params) {
        let { action, resource, subResource } = this.props;
        let selectedRows = params.api.getSelectedRows().map(row => {
            return {
                id: row.id,
                nama: row.nama,
                aktif: row.aktif
            }
        });
        action.onSelectionChangedDetail(resource, subResource, selectedRows);
    }

    _handleInstalasiChange(selected) {
        this.props.action.onChangeInstalasi(this.props.resource, this.props.subResource, selected);
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _onCancel() {
        this.props.action.onCancelImportDetail(this.props.resource, this.props.subResource);
    }

    _onAdd() {
        const { post, resource, subResource } = this.props;
        this.props.action.onImportDetail(resource, subResource, post)
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.instalasi`),
                field: "nama_instalasi",
                checkboxSelection: true,
                cellRenderer: "loadingRenderer",
                headerComponent: "headerCheckboxRenderer",
                sortable: true
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.unit_layanan`),
                field: "nama",
                sortable: true
            }
        ]
    }
}

const mapStateToProps = function (state) {
    const { importDetail, selectedRow, reference } = state.nested.module;

    return {
        show: importDetail.show,
        columnDefs: importDetail.columnDefs,
        selectedRow,
        post: {
            ...reference,
            list_unit_layanan: importDetail.selectedRows
        },
        optionsInstalasi: importDetail.data.options_instalasi,
        filter: importDetail.filter,
        isReloadGrid: importDetail.isReloadGrid,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadAllOnImportDetail: action.loadAllOnImportDetail,
            onImportDetail: action.importDetail.request,
            onSelectionChangedDetail: action.onSelectionChangedDetail,
            onCancelImportDetail: action.onCancelImportDetail,
            getInstalasi: action.getInstalasi.request,
            onChangeInstalasi: action.onChangeInstalasi,
        }, dispatch)
    }
}

ImportDetail.propTypes = {
    show: PropTypes.bool,
    selectedRow: PropTypes.number,
    columnDefs: PropTypes.array,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    filter: PropTypes.object,
    optionsInstalasi: PropTypes.array,
    isReloadGrid: PropTypes.bool,
    t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDetail);

const OptionInstalasi = (props) => {
    let { data } = props;
    return (
        <components.Option {...props}>
            <div className="react-select__option-label">{data.label}</div>
            <div className="react-select__option-caption">
                {`${data.nama_jenis_layanan} | ${data.nama_kelompok_jenis_layanan}`}
            </div>
        </components.Option>
    );
};

OptionInstalasi.propTypes = {
    data: PropTypes.object.isRequired
};
