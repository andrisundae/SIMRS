import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';

import { Input, Select, FormField } from 'semantic-ui-react';
import { Filter as FilterContainer, isDisableForm, filterActions } from '@simrs/main/src/modules/master/default';
import { selectors, context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterIndex = createRef();
        this.filterValue = createRef();

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSelectionChange = this._handleSelectionChange.bind(this);
    }

    render() {
        const { post, isDisableForm, resource, minCharSearch, t } = this.props;

        return (
            <FilterContainer resource={resource}>
                <FormField>
                    <label>
                        <Trans i18nKey={this._getKey('label.filter')}/>
                    </label>
                    <Select
                        name="filter_index"
                        // ref={this.filterIndex}
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
                        placeholder={t(this._getKey('placeholder.filter'), {minCharSearch})}
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

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getFilterColumns() {
        return [
            { key: 'nama', value: 'nama', text: this.props.t(this._getKey('header.column.nama')) }
        ];
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.default;

    return {
        post: filter.post,
        isDisableForm: !isDisableForm(module),
        minCharSearch: parseInt(selectors.get(state, context.MINCHARPENCARIANMASTER)) || 0
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(filterActions, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    action: PropTypes.object,
    isDisableForm: PropTypes.bool,
    minCharSearch: PropTypes.number,
    resource: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
