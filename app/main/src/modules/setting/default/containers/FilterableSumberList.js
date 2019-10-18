import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import MouseTrap from 'mousetrap';
import { toastr } from 'react-redux-toastr';

import { DatatableServerSide, constDatatable, datatableActions, confirmation } from '@simrs/components';
import { validator as commonValidator } from '@simrs/common';
import { selectors, context } from '../../../setting/aturan-aplikasi';
import SearchBar from '../components/SearchBar';
import { sumberActions } from '../actions';

const MIN_CHAR_CONTEXT = context.MINCHARPENCARIANSETTING;
const TABLE_NAME = 'data_sumber';
const { getFirstError } = commonValidator;
const validator = commonValidator.default;

class FilterableSumberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 100
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);
        this._searchBarChange = this._searchBarChange.bind(this);
        this._searchBarSubmit = this._searchBarSubmit.bind(this);
        this._searchBarKeydown = this._searchBarKeydown.bind(this);
        this._onRowDoubleClick = this._onRowDoubleClick.bind(this);

        this.dataTable = createRef();
        this.search_sumber = createRef();
    }

    render() {
        let { sizeColumnsToFit, columnDefs, filterGrid, containerHeight, minCharSearch, t, resource } = this.props;

        return (
            <Fragment>
                <SearchBar
                    value={filterGrid.search}
                    onChange={this._searchBarChange}
                    name="search_sumber"
                    onSearch={this._searchBarSubmit}
                    onKeyDown={this._searchBarKeydown}
                    inputRef={this.search_sumber}
                    disabled={this._getFirstNeeded() ? false : true}
                    placeholder={`Minimal ${minCharSearch} karakter`}
                    t={t}
                    resource={resource}
                />
                <DatatableServerSide
                    ref={this.dataTable}
                    columns={columnDefs}
                    name={TABLE_NAME}
                    rowSelection={constDatatable.selectionMultiple}
                    navigateToSelect={true}
                    datasource={this._getDataSource()}
                    rowBuffer={0}
                    rowDeselection={true}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1}
                    cacheBlockSize={this.state.cacheBlockSize}
                    containerHeight={containerHeight}
                    onSelectionChanged={this._onSelectionChanged}
                    getRowNodeId={this._getRowNodeId}
                    sizeColumnsToFit={sizeColumnsToFit}
                    onRowDoubleClicked={this._onRowDoubleClick}
                    defaultColDef={{ sortable: true }}
                />
            </Fragment>
        )
    }

    _getDataSource() {
        let _this = this;

        return {
            rowCount: null,
            getRows: (params) => {
                let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    sort_name: sortModel.colId ? sortModel.colId : '',
                    sort_order: sortModel.colId ? sortModel.sort : '',
                    ..._this.props.filterGrid
                };

                if (_this._getFirstNeeded()) {
                    _this.props.action.getAll(_this.props.resource, post, params);
                } else {
                    params.successCallback([], 0);
                    if (this.props.isReloadGrid) {
                        this.props.action.onReloaded('data_sumber');
                    }
                }
            }
        }
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;
        this._bindKey();

        this.props.action.initializeDatatable(TABLE_NAME);
    }

    componentDidUpdate(prevProps) {
        let { isReloadGrid, focusElement } = this.props;

        if (isReloadGrid && !prevProps.isReloadGrid) {
            this._reload();
        }

        if (focusElement === 'sumber') {
            this._setFirstRowSelected();
        } else {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                    this[focusElement].current.select();
                }
            }
        }
    }

    _getFirstNeeded() {
        let needed = this.props.filterGrid.needed;
        
        return needed[Object.keys(needed)[0]];
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[TABLE_NAME];
    }

    _reload() {
        if (this.props.reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
            this.gridApi.deselectAll();
            this.gridApi.clearFocusedCell();
        } else if (this.props.reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
        }
    }

    _searchBarChange(e) {
        const { value } = e.target;
        this.props.action.onSearchBarChange(this.props.resource, { value });
    }
    _searchBarSubmit() {
        const { filterGrid, resource } = this.props;
        let errors = this._validation(filterGrid);

        if (_.isEmpty(errors) || filterGrid.search.length <= 0) {
            this.props.action.onSearch(resource, { ...filterGrid });
        } else {
            toastr.warning('Kesalahan filter', getFirstError(errors));
        }
    }

    _searchBarKeydown(e) {
        if (13 === e.which) {
            e.preventDefault();
            this._searchBarSubmit();
        }
    }

    _validation(post) {
        const rules = {
            [MIN_CHAR_CONTEXT]: { minlength: this.props.minCharSearch }
        }
        const messages = {
            [MIN_CHAR_CONTEXT]: { minlength: `Minimal karakter pencarian ${this.props.minCharSearch} huruf` }
        }

        let errors = validator({ [MIN_CHAR_CONTEXT]: post.search }, rules, messages);

        return errors;
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
    _onSelectionChanged(params) {
        let { action, resource } = this.props;
        let selectedRows = params.api.getSelectedRows().map(row => row.id);
        action.onSelectionChanged(resource, selectedRows);
    }

    _onRowDoubleClick({ data }) {
        const { post, action, resource, selectedRows } = this.props;
        confirmation({
            onOk: () => {
                action.onPush(resource, { id: { ...post, sumber: selectedRows } });
            },
            message: `Apakah data ${data.unit} ingin disetting ?`
        });
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bind('f2', function (e) {
            e.preventDefault();
            _this._setFirstRowSelected();
        });
    }
}

const mapStateToProps = function (state) {
    const page = state.page;
    let isReloadGrid, reloadType;
    if (state.datatable.datatables) {
        if (state.datatable.datatables[TABLE_NAME]) {
            isReloadGrid = state.datatable.datatables[TABLE_NAME].isReload;
            reloadType = state.datatable.datatables[TABLE_NAME].reloadType;
        }
    }

    return {
        filterGrid: {
            needed: { ...page.post.needed },
            optional: { ...page.post.optional },
            search: page.sumber.searchBar
        },
        isReloadGrid,
        reloadType,
        minCharSearch: parseInt(selectors.get(state, MIN_CHAR_CONTEXT)) || 0,
        selectedRows: page.sumber.selectedRows,
        focusElement: page.focusElement,
        post: page.post,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            getAll: sumberActions.getAll.request,
            onSearchBarChange: sumberActions.onChangeInput,
            onSearch: sumberActions.onSearch,
            initializeDatatable: datatableActions.onInitialize,
            onReloaded: datatableActions.onReloaded,
            onSelectionChanged: sumberActions.onSelectionChanged,
            onPush: sumberActions.push.request,
        }, dispatch)
    }
}

FilterableSumberList.propTypes = {
    action: PropTypes.object,
    columnDefs: PropTypes.array.isRequired,
    filterGrid: PropTypes.object,
    minCharSearch: PropTypes.number,
    focusElement: PropTypes.string,
    post: PropTypes.object,
    selectedRows: PropTypes.array,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    resource: PropTypes.string.isRequired,
    onRowDoubleClicked: PropTypes.func,
    onRowEntered: PropTypes.func,
    sizeColumnsToFit: PropTypes.bool,
    containerHeight: PropTypes.string,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
};

FilterableSumberList.defaultProps = {
    sizeColumnsToFit: true,
    containerHeight: '400px'
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableSumberList);
