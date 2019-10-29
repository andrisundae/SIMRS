import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';
import { Input, Select, FormField, Grid } from 'semantic-ui-react';

import { Select as Select2 } from '@simrs/components';
import { Filter as FilterContainer, filterActions } from '@simrs/main/src/modules/master/nested';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import actions from '../actions';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterIndex = createRef();
        this.filterValue = createRef();
        this.klasifikasi = createRef();
        this.versi_tarif = createRef();

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSelectionChange = this._handleSelectionChange.bind(this);
        this._onClickNext = this._onClickNext.bind(this);
        this._handleChangeKlasifikasi = this._handleChangeKlasifikasi.bind(this);
        this._handleChangeVersiTarif = this._handleChangeVersiTarif.bind(this);
    }

    render() {
        const {
            optionsVersiTarif,
            optionsKlasifikasi,
            isDisableNext,
            isDisablePrev,
            subResource,
            postFilter,
            isDisabledFilter,
            resource,
            minCharSearch,
            t
        } = this.props;

        return (
            <Fragment>
                <Grid className="form-grid">
                    <Grid.Row className="form-row">
                        <Grid.Column width="7" className="field" style={{marginTop: 5}}>
                            <Select2
                                name="versi_tarif"
                                placeholder={t(this._getKey('placeholder.filter.versi_tarif'))}
                                inputRef={this.versi_tarif}
                                onChange={this._handleChangeVersiTarif}
                                value={postFilter.selectedVersiTarif}
                                options={optionsVersiTarif}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <FilterContainer
                    resource={resource}
                    subResource={subResource}
                    isDisableNext={isDisableNext}
                    isDisablePrev={isDisablePrev}
                    onNext={this._onClickNext}
                    rowStyle={{paddingTop: 5}}
                    {...this.props}
                >
                    <FormField>
                        <Select2
                            className="filter-select"
                            name="klasifikasi"
                            placeholder={t(this._getKey('placeholder.filter.klasifikasi'))}
                            inputRef={this.klasifikasi}
                            isDisabled={isDisabledFilter}
                            onChange={this._handleChangeKlasifikasi}
                            value={postFilter.selectedKlasifikasi}
                            options={optionsKlasifikasi}
                        />
                    </FormField>
                    <FormField>
                        <label>
                            <Trans i18nKey={this._getKey('label.filter')} />
                        </label>
                        <Select
                            name="filter_index"
                            onChange={this._handleSelectionChange}
                            value={postFilter.filter_index}
                            disabled={isDisabledFilter}
                            options={this._getFilterColumns()}
                            placeholder="Pilih Filter"
                        />
                    </FormField>
                    <FormField width="4">
                        <Input
                            name="filter_value"
                            ref={this.filterValue}
                            value={postFilter.filter_value}
                            onChange={this._handleFilterChange}
                            disabled={isDisabledFilter}
                            placeholder={t(this._getKey('placeholder.filter'), { minCharSearch })}
                        />
                    </FormField>
                </FilterContainer>
            </Fragment>
        )
    }

    componentDidUpdate() {
        this._bindKey();
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bind('alt+f', function (e) {
            e.preventDefault();
            if (!_this.props.isDisableForm) {
                if (_this.filterValue) {
                    _this.filterValue.current.focus();
                }
            }
        });
    }

    _unbindKey() {
        MouseTrap.unbind('alt+f');
    }

    _handleFilterChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeFilter(this.props.resource, this.props.subResource, { name, value });
    }

    _handleSelectionChange(e, { value }) {
        this.props.action.onChangeFilter(this.props.resource, this.props.subResource, { name: 'filter_index', value });
    }

    _handleChangeKlasifikasi(selected) {
        this.props.action.onChangeKlasifikasi(this.props.resource, this.props.subResource, selected);
    }

    _handleChangeVersiTarif(selected) {
        this.props.action.onChangeVersiTarif(this.props.resource, this.props.subResource, selected);
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getFilterColumns() {
        return [
            { key: 'nama', value: 'nama', text: this.props.t(this._getKey('header.column.nama')) }
        ];
    }

    _onClickNext(e) {
        e.preventDefault();
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
}

const mapStateToProps = function (state, props) {
    const { filter, module } = state.nested;
    const selectedRow = module.selectedRow;
    const minCharSearch = props.settings.find(setting => setting.aturan === context.MINCHARPENCARIANMASTER);

    return {
        optionsKlasifikasi: filter.data.options_klasifikasi,
        optionsVersiTarif: filter.data.options_versi_tarif,
        postFilter: filter.post,
        post: module.post,
        isDisabledFilter: !filter.post.versi_tarif ? true : false,
        isDisableNext: selectedRow < 1,
        isDisablePrev: true,
        selectedRow,
        minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0)
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            ...filterActions,
            onChangeKlasifikasi: actions.onChangeKlasifikasi,
            onChangeVersiTarif: actions.onChangeVersiTarif,
        }, dispatch),
    }
}

Filter.propTypes = {
    postFilter: PropTypes.object,
    post: PropTypes.object,
    optionsKlasifikasi: PropTypes.array,
    onChangeVersiTarif: PropTypes.array,
    action: PropTypes.object,
    isDisabledFilter: PropTypes.bool,
    isDisableNext: PropTypes.bool,
    isDisablePrev: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    selectedRow: PropTypes.number,
    history: PropTypes.object,
    minCharSearch: PropTypes.number,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
