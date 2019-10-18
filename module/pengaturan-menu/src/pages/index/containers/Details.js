import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Input, Segment, Button, Icon, Header } from 'semantic-ui-react';

import {
    DatatableServerSide,
    constDatatable,
    confirmation
} from '@simrs/components';
import actions from '../actions';
import actionTypes from '../actionTypes';
import { isDisableFormDetail } from '../reducer';


class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 25
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._onRowSelected = this._onRowSelected.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);
        this._handleInputDetailChange = this._handleInputDetailChange.bind(this);
        this._onAddDetail = this._onAddDetail.bind(this);
        this._onCancelDetail = this._onCancelDetail.bind(this);
        this._onSaveDetail = this._onSaveDetail.bind(this);
        this._onDeleteDetail = this._onDeleteDetail.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.dataTable = createRef();
        this.nama_detail = createRef();
        this.add_detail = createRef();
        this.delete_detail = createRef();
        this.cancel_detail = createRef();
        this.save_detail = createRef();
    }

    render() {
        let {
            postDetail,
            post,
            resource,
            sizeColumnsToFit,
            containerHeight,
            statusFormDetail,
            t
        } = this.props;

        return (
            <Fragment>
                <Header as='h5' attached='top' block style={{marginTop: 0}}>
                    <Icon name="list alternate" />
                    Data Actions
                </Header>
                <Segment attached size="mini">
                    <Form size="small">
                        <Grid>
                            <Grid.Row className="form-row">
                                <Grid.Column>
                                    <DatatableServerSide
                                        ref={this.dataTable}
                                        columns={this.getColumnDefs()}
                                        name={resource}
                                        navigateToSelect={statusFormDetail !== actionTypes.ADD_DETAIL}
                                        datasource={this._getDataSource()}
                                        rowBuffer={0}
                                        maxConcurrentDatasourceRequests={1}
                                        infiniteInitialRowCount={1}
                                        cacheBlockSize={this.state.cacheBlockSize}
                                        containerHeight={containerHeight}
                                        onRowSelected={this._onRowSelected}
                                        suppressRowClickSelection={statusFormDetail === actionTypes.ADD_DETAIL}
                                        suppressCellSelection={statusFormDetail === actionTypes.ADD_DETAIL}
                                        getRowNodeId={this._getRowNodeId}
                                        disabled={statusFormDetail === actionTypes.ADD_DETAIL}
                                        sizeColumnsToFit={sizeColumnsToFit}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className="form-row">
                                <Grid.Column width="4" className="required field">
                                    <label>{t(this._getKey('label.field.nama_detail'))}</label>
                                </Grid.Column>
                                <Grid.Column width="12" className="field">
                                    <Input
                                        onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                                        name="nama_detail"
                                        ref={this.nama_detail}
                                        value={postDetail.nama}
                                        disabled={!(statusFormDetail === actionTypes.ADD_DETAIL)}
                                        onChange={this._handleInputDetailChange}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
                {post.id > 0 &&
                    <Segment attached size="mini">
                        {(statusFormDetail === actionTypes.READY_DETAIL || statusFormDetail === actionTypes.CANCEL_DETAIL || statusFormDetail === actionTypes.SELECTED_DETAIL) &&
                            <Button
                                name="add_detail"
                                onClick={this._onAddDetail}
                                ref={this.add_detail}
                                onKeyDown={this._onFocusElement}
                                size="mini"
                                primary
                            >
                                <Icon name="plus square" /> Tambah
                            </Button>
                        }

                        {statusFormDetail === actionTypes.ADD_DETAIL &&
                            <Fragment>
                                <Button
                                    name="save_detail"
                                    size="mini"
                                    onClick={this._onSaveDetail}
                                    ref={this.save_detail}
                                    onKeyDown={this._onFocusElement}
                                    positive
                                >
                                    <Icon name='save' /> Simpan
                                </Button>
                                <Button
                                    name="cancel_detail"
                                    size="mini"
                                    onClick={this._onCancelDetail}
                                    ref={this.cancel_detail}
                                    onKeyDown={this._onFocusElement}
                                >
                                    <Icon name='undo' /> Batal
                                </Button>
                            </Fragment>
                        }

                        {(postDetail.id > 0) && (statusFormDetail === actionTypes.SELECTED_DETAIL || statusFormDetail === actionTypes.CANCEL_DETAIL) &&
                            <Button
                                name="delete_detail"
                                size="mini"
                                onClick={this._onDeleteDetail}
                                ref={this.delete_detail}
                                onKeyDown={this._onFocusElement}
                                negative
                            >
                                <Icon name='trash' /> Hapus
                            </Button>
                        }
                    </Segment>
                }
            </Fragment>
        )
    }

    _getDataSource() {
        let _this = this;

        return {
            rowCount: null,
            getRows: (params) => {
                let post = {
                    id: _this.props.post.id
                };

                _this.props.action.loadDetail(_this.props.resource, post, params);
            }
        }
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;
    }

    componentDidUpdate(prevProps) {
        let { isDisableFormDetail, statusFormDetail, isReloadGrid, postDetail, reloadType, focusElement } = this.props;

        if (isReloadGrid) {
            this._reload(reloadType);
        } else {
            switch (statusFormDetail) {
                case actionTypes.ADD_DETAIL:
                    if (isDisableFormDetail) {
                        this.gridApi.deselectAll();
                        // this.gridApi.clearFocusedCell();
                    }
                    break;
                case actionTypes.CANCEL_DETAIL:
                    if (prevProps.postDetail.id) {
                        this._selectRow(prevProps.postDetail.id);
                    }
                    break;
                case actionTypes.AFTER_SAVE:
                    this._selectRow(postDetail.id);
                    break;
                case actionTypes.READY_DETAIL:
                    if (this.props.postDetail.id) {
                        this._selectRow(this.props.postDetail.id);
                    } else {
                        this.gridApi.deselectAll();
                        this.gridApi.clearFocusedCell();
                    }

                    break;
                default:
                    break;
            }
        }

        if (statusFormDetail === actionTypes.ADD_DETAIL) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                }
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[this.props.resource];
    }

    _reload(reloadType) {
        if (reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
        } else if (reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
        }
    }

    _selectRow(id) {
        this.gridApi.deselectAll();
        this.gridApi.clearFocusedCell();

        let node = this.gridApi.getRowNode(id);
        if (node) {
            node.setSelected(true, true);
        }
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

    _onRowSelected(params) {
        if (params.node.isSelected()) {
            this.props.action.onSelectedDetail(this.props.resource, params.data);
        }
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _handleInputDetailChange(e) {
        const { value } = e.target;
        this.props.action.onInputDetailChange(this.props.resource, { name: 'nama', value });
    }

    _onAddDetail() {
        this.props.action.onAddDetail(this.props.resource);
    }

    _onCancelDetail() {
        this.props.action.onCancelDetail(this.props.resource);
    }

    _onSaveDetail() {
        this.props.action.onSaveDetail(this.props.resource, { id: this.props.post.id, nama: this.props.postDetail.nama });
    }

    _onDeleteDetail() {
        confirmation({
            onOk: () => this.props.action.onDeleteDetail(this.props.resource, { id: this.props.postDetail.id })
        });
    }

    _onFocusElement(e) {
        let nextElement = '';
        let { name, type } = e.target;
        if (type === 'button') {
            if (e.which === 37 || e.which === 39) {
                e.preventDefault();

                switch (name) {
                    case 'add_detail':
                        nextElement = 'delete_detail';
                        break;
                    case 'delete_detail':
                        nextElement = 'add_detail';
                        break;
                    case 'save_detail':
                        nextElement = 'cancel_detail';
                        break;
                    case 'cancel_detail':
                        nextElement = 'save_detail';
                        break;
                    default:
                        break;
                }
                this.props.action.onFocusElement(this.props.resource, nextElement);
            }
        } else {
            if (type === 'text' && 13 === e.which) {
                e.preventDefault();
                nextElement = 'save_detail';
                this.props.action.onFocusElement(this.props.resource, nextElement);
            }
        }
    }

    getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.no`),
                field: "no",
                cellRenderer: "loadingRenderer",
                sortable: false,
                width: 70,
                cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' }
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama_action`),
                field: "nama",
            },
        ]
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { post, statusForm, columnDefs, postDetail, statusFormDetail, focusElement } = state.module;

    return {
        post,
        postDetail,
        isDisableFormDetail: isDisableFormDetail(statusForm, post.id),
        statusForm,
        statusFormDetail,
        columnDefs,
        isReloadGrid: state.datatable.isReload,
        reloadType: state.datatable.reloadType,
        focusElement
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadDetail: actions.loadDetail,
            onSelectedDetail: actions.onSelectedDetail,
            onInputDetailChange: actions.onInputDetailChange,
            onFocusElement: actions.onFocusElement,
            onAddDetail: actions.onAddDetail,
            onCancelDetail: actions.onCancelDetail,
            onSaveDetail: actions.saveDetail.request,
            onDeleteDetail: actions.deleteDetail.request,
        }, dispatch)
    }
}

Details.propTypes = {
    action: PropTypes.object,
    columnDefs: PropTypes.array,
    post: PropTypes.object,
    postDetail: PropTypes.object,
    isDisableFormDetail: PropTypes.bool,
    statusForm: PropTypes.string,
    statusFormDetail: PropTypes.string,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    resource: PropTypes.string.isRequired,
    sizeColumnsToFit: PropTypes.bool,
    containerHeight: PropTypes.string,
    focusElement: PropTypes.string,
};

Details.defaultProps = {
    sizeColumnsToFit: true,
    containerHeight: '200px'
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
