import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';
import { Input, Select, FormField, Grid } from 'semantic-ui-react';

import { Select as Select2 } from '@simrs/components';
import { Filter as FilterContainer, isDisableForm as checkForm, filterActions } from '@simrs/main/src/modules/master/nested';
import { selectors, context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterIndex = createRef();
        this.filterValue = createRef();

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSelectionChange = this._handleSelectionChange.bind(this);
        this._onClickNext = this._onClickNext.bind(this);
        this._onClickPrev = this._onClickPrev.bind(this);
    }

    render() {
        const { isDisableNext, isDisablePrev, subResource, postFilter, isDisableForm, resource, minCharSearch, t } = this.props;

        return (
            <Fragment>
                <Grid className="form-grid">
                    <Grid.Row className="form-row">
                        <Grid.Column width="7" className="field" style={{ marginTop: 5 }}>
                            <Select2
                                name="versi_tarif"
                                isDisabled={true}
                                value={this.props.location.state.selectedVersiTarif}
                                options={[]}
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
                    onPrev={this._onClickPrev}
                    {...this.props}
                >
                    <FormField>
                        <Select2
                            className="filter-select"
                            name="klasifikasi"
                            isDisabled={true}
                            value={this.props.location.state.selectedKlasifikasi}
                            options={[]}
                        />
                    </FormField>
                    <FormField>
                        <label>
                            <Trans i18nKey={this._getKey('label.filter')} />
                        </label>
                        <Select
                            name="filter_index"
                            // ref={this.filterIndex}
                            onChange={this._handleSelectionChange}
                            value={postFilter.filter_index}
                            disabled={isDisableForm}
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
                            disabled={isDisableForm}
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

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getFilterColumns() {
        return [
            { key: 'kode_panggil', value: 'kode_panggil', text: this.props.t(this._getKey('header.column.kode_panggil')) }
        ];
    }

    _onClickNext(e) {
        e.preventDefault();
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

    _onClickPrev(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: `/layanan/${this.props.location.state.id_kelompok}`,
            state: {
                ...this.props.location.state,
            }
        });
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.nested;
    const selectedRow = module.selectedRow;

    return {
        data: filter.data,
        postFilter: filter.post,
        post: module.post,
        isDisableForm: !checkForm(module),
        isDisableNext: selectedRow < 1,
        isDisablePrev: false,
        selectedRow,
        minCharSearch: parseInt(selectors.get(state, context.MINCHARPENCARIANMASTER)) || 0
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(filterActions, dispatch),
    }
}

Filter.propTypes = {
    postFilter: PropTypes.object,
    post: PropTypes.object,
    data: PropTypes.object,
    action: PropTypes.object,
    isDisableForm: PropTypes.bool,
    isDisableNext: PropTypes.bool,
    isDisablePrev: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    selectedRow: PropTypes.number,
    history: PropTypes.object,
    minCharSearch: PropTypes.number,
    t: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
