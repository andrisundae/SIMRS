import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';

import { Input, Select, FormField } from 'semantic-ui-react';
import { Filter as FilterContainer, isDisableForm, filterActions } from '@simrs/main/src/modules/master/default';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { filterIndexActions } from '../actions';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterIndex = createRef();
        this.filterValue = createRef();
        this.search_id_status_aplikasi = createRef();

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSelectionChange = this._handleSelectionChange.bind(this);
        this._handleFilterStatusAplikasiChange = this._handleFilterStatusAplikasiChange.bind(this);
    }

    render() {
        const { post, isDisableForm, resource, minCharSearch, t, optionsStatusAplikasi } = this.props;

        return (
            <FilterContainer resource={resource}>
                <FormField>
                    <label>
                        Status Aplikasi
                    </label>
                    <Select
                        name="search_id_status_aplikasi"
                        onChange={this._handleFilterStatusAplikasiChange}
                        value={post.search_id_status_aplikasi}
                        disabled={isDisableForm}
                        options={optionsStatusAplikasi}
                        placeholder="Semua status aplikasi"
                        style={{width: '200px'}}
                    />
                </FormField>
                <FormField>
                    <label>
                        <Trans i18nKey={this._getKey('label.filter')} />
                    </label>
                    <Select
                        name="filter_index"
                        onChange={this._handleSelectionChange}
                        value={post.filter_index}
                        disabled={isDisableForm}
                        options={this._getFilterColumns()}
                        placeholder="Pilih Filter"
                    />
                </FormField>
                <FormField width="4">
                    <Input
                        name="filter_value"
                        ref={this.filterValue}
                        value={post.filter_value}
                        onChange={this._handleFilterChange}
                        disabled={isDisableForm}
                        placeholder={t(this._getKey('placeholder.filter'), { minCharSearch })}
                    />
                </FormField>
            </FilterContainer>
        )
    }

    componentDidMount() {
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

    _handleFilterChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeFilter(this.props.resource, { name, value });
    }

    _handleSelectionChange(e, { value }) {
        this.props.action.onChangeFilter(this.props.resource, { name: 'filter_index', value });
    }

    _handleFilterStatusAplikasiChange(e, { value }) {
        this.props.action.onChangeFilterStatusAplikasi(this.props.resource, {
            name: 'search_id_status_aplikasi',
            value, post: {
                ...this.props.post,
                search_id_status_aplikasi: value
            }
        });
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getFilterColumns() {
        return [
            { key: 'nama', value: 'nama', text: this.props.t(this._getKey('header.column.nama')) }
        ];
    }
}

const mapStateToProps = function (state, props) {
    const { filter, module } = state.default;
    const optionsStatusAplikasi = filter.data.options_status_aplikasi.map(row => ({
        text: row.label,
        value: row.id,
        key: row.id
    }));
    const minCharSearch = props.settings.find(setting => setting.aturan === context.MINCHARPENCARIANMASTER);

    return {
        post: filter.post,
        optionsStatusAplikasi: [
            {key: 'pilih-semua', value: '', text: 'Semua status aplikasi'},
            ...optionsStatusAplikasi
        ],
        isDisableForm: !isDisableForm(module),
        minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0)
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeFilter: filterActions.onChangeFilter,
            onChangeFilterStatusAplikasi: filterIndexActions.onChangeFilterStatusAplikasi
        }, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    optionsStatusAplikasi: PropTypes.array.isRequired,
    action: PropTypes.object,
    isDisableForm: PropTypes.bool,
    minCharSearch: PropTypes.number,
    resource: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
