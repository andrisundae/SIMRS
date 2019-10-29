import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';

import { Input, Select, FormField } from 'semantic-ui-react';
import { Filter as FilterContainer, isDisableForm as checkForm, filterActions } from '@simrs/main/src/modules/master/nested';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterIndex = createRef();
        this.filterValue = createRef();

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSelectionChange = this._handleSelectionChange.bind(this);
        this._onClickNext = this._onClickNext.bind(this);
    }

    render() {
        const { isDisableNext, isDisablePrev, subResource, postFilter, isDisableForm, resource, minCharSearch, t } = this.props;

        return (
            <FilterContainer
                resource={resource}
                subResource={subResource}
                isDisableNext={isDisableNext}
                isDisablePrev={isDisablePrev}
                onNext={this._onClickNext}
                {...this.props}
            >
                <FormField>
                    <label>
                        <Trans i18nKey={this._getKey('label.filter')}/>
                    </label>
                    <Select
                        name="filter_index"
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
                        placeholder={t(this._getKey('placeholder.filter'), {minCharSearch})}
                    />
                </FormField>
            </FilterContainer>
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
            { key: 'nama', value: 'nama', text: this.props.t(this._getKey('header.column.nama')) }
        ];
    }

    _onClickNext(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: `/asal-masuk-detail/${this.props.selectedRow}`,
            state: {
                asal_masuk_detail: true,
                id_asal_masuk: this.props.selectedRow,
                nama_asal_masuk: this.props.post.nama
            }
        });
    }
}

const mapStateToProps = function (state, props) {
    const { filter, module } = state.nested;
    const selectedRow = module.selectedRow;
    const minCharSearch = props.settings.find(setting => setting.aturan === context.MINCHARPENCARIANMASTER);

    return {
        data: filter.data,
        postFilter: filter.post,
        post: module.post,
        isDisableForm: !checkForm(module),
        isDisableNext: selectedRow < 1,
        isDisablePrev: true,
        selectedRow,
        minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0)
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
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
