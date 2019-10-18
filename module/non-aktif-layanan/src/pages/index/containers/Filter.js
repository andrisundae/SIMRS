import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Input, Form, Grid, Segment } from 'semantic-ui-react';
import { remote } from 'electron';
import { Trans } from 'react-i18next';

import { Select, SearchButton } from '@simrs/components';
import { selectors, context } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import {filterActions} from '../actions';

const { ipcMain } = remote;

class Filter extends Component {
    constructor(props) {
        super(props);

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleChangeKlasifikasi = this._handleChangeKlasifikasi.bind(this);
        this._handleChangeKelompok = this._handleChangeKelompok.bind(this);
        this._handleChangeFilterIndex = this._handleChangeFilterIndex.bind(this);
        this._handleChangeStatus = this._handleChangeStatus.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleKeyDownFilterValue = this._handleKeyDownFilterValue.bind(this);
        this._handleFocusingField = this._handleFocusingField.bind(this);

        this.filter_index = createRef();
        this.klasifikasi = createRef();
        this.kelompok = createRef();
        this.status = createRef();
        this.filter_value = createRef();
        this.search = createRef();
    }

    render() {
        const {
            optionsKlasifikasi,
            optionsKelompok,
            post,
            minCharSearch,
            t
        } = this.props;

        return (
            <Segment padded>
                <Form id={this.formId} size="mini">
                    <Grid columns="2">
                        <Grid.Row>
                            <Grid.Column>
                                <Grid className="form-grid">
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label><Trans i18nKey={this._getKey('label.field.klasifikasi')} /></label>
                                        </Grid.Column>
                                        <Grid.Column width="13" className="field">
                                            <Select
                                                name="klasifikasi"
                                                placeholder={t(this._getKey('placeholder.field.klasifikasi'))}
                                                inputRef={this.klasifikasi}
                                                onChange={this._handleChangeKlasifikasi}
                                                value={post.selectedKlasifikasi}
                                                options={optionsKlasifikasi}
                                                onKeyDown={(e) => this._onFocusElement(e, 'kelompok')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label>{t(this._getKey('label.field.kelompok'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="13" className="field">
                                            <Select
                                                name="kelompok"
                                                placeholder={t(this._getKey('placeholder.field.kelompok'))}
                                                inputRef={this.kelompok}
                                                onChange={this._handleChangeKelompok}
                                                value={post.selectedKelompok}
                                                options={optionsKelompok}
                                                onKeyDown={(e) => this._onFocusElement(e, 'status')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid className="form-grid">
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label>{t(this._getKey('label.field.status'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="13" className="field">
                                            <Select
                                                name="status"
                                                placeholder={t(this._getKey('placeholder.field.status'))}
                                                inputRef={this.status}
                                                onChange={this._handleChangeStatus}
                                                value={post.selectedStatus}
                                                options={this._getStatusOptions()}
                                                onKeyDown={(e) => this._onFocusElement(e, 'filter_index')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label><Trans i18nKey={this._getKey('label.field.filter_index')} /></label>
                                        </Grid.Column>
                                        <Grid.Column width="7" className="field">
                                            <Select
                                                name="filter_index"
                                                inputRef={this.filter_index}
                                                onChange={this._handleChangeFilterIndex}
                                                value={post.selectedFilterIndex}
                                                options={this._getFilterIndexOptions()}
                                                onKeyDown={(e) => this._onFocusElement(e, 'filter_value')}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width="6" className="field">
                                            <Input
                                                name="filter_value"
                                                ref={this.filter_value}
                                                value={post.filter_value}
                                                onChange={this._handleFilterChange}
                                                onKeyDown={this._handleKeyDownFilterValue}
                                                placeholder={t(this._getKey('placeholder.filter'), { minCharSearch })}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Grid>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="8" className="field">
                                            <SearchButton inputRef={this.search} onClick={this._handleSubmit}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        )
    }

    componentDidMount() {
        ipcMain.on('focusing-field', this._handleFocusingField);
        this._bindKey();
    }

    componentWillUnmount() {
        ipcMain.removeListener('focusing-field', this._handleFocusingField);
        this._unbindKey();
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+f', function (e) {
            e.preventDefault();
            _this.filter_value.current.focus();
        });

        MouseTrap.bindGlobal('alt+k', function (e) {
            e.preventDefault();
            _this.klasifikasi.current.focus();
        });

        MouseTrap.bindGlobal('alt+c', function (e) {
            e.preventDefault();
            _this._search();
        });
    }

    _unbindKey() {
        MouseTrap.unbind('alt+f');
        MouseTrap.unbind('alt+k');
        MouseTrap.unbind('alt+c');
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _search() {
        let { resource, post } = this.props;
        this.props.action.onSubmitFilter(resource, post);
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._search();
    }

    _handleFocusingField() {
        const { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    _handleChangeStatus(selected) {
        this.props.action.onChangeStatus(this.props.resource, selected);
    }

    _handleChangeKlasifikasi(selected) {
        this.props.action.onChangeKlasifikasi(this.props.resource, selected);
    }

    _handleChangeKelompok(selected) {
        this.props.action.onChangeKelompok(this.props.resource, selected);
    }

    _handleChangeFilterIndex(selected) {
        this.props.action.onChangeFilterIndex(this.props.resource, selected);
    }

    _handleFilterChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeFilter(this.props.resource, { name, value });
    }

    _handleKeyDownFilterValue(e) {
        if (13 === e.which) {
            e.preventDefault();
            this._search();
        }
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }

    _getFilterIndexOptions() {
        return [
            { value: 'nama', label: this.props.t(this._getKey('header.column.nama')) },
            { value: 'nama_kelompok', label: this.props.t(this._getKey('header.column.nama_kelompok')) },
            { value: 'nama_klasifikasi', label: this.props.t(this._getKey('header.column.nama_klasifikasi')) },
        ];
    }

    _getStatusOptions() {
        return [
            { value: 'true', label: this.props.t(this._getKey('status.option.aktif')) },
            { value: 'false', label: this.props.t(this._getKey('status.option.non_aktif')) },
        ];
    }
}

const mapStateToProps = function (state) {
    const { filter } = state.default;
    const data = filter.data;

    return {
        optionsKlasifikasi: data.options_klasifikasi,
        optionsKelompok: data.options_kelompok,
        post: filter.post,
        focusElement: filter.focusElement,
        minCharSearch: parseInt(selectors.get(state, context.MINCHARPENCARIANMASTER)) || 0,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeKlasifikasi: filterActions.onChangeKlasifikasi,
            onChangeStatus: filterActions.onChangeStatus,
            onChangeKelompok: filterActions.onChangeKelompok,
            onChangeFilter: filterActions.onChangeFilter,
            onChangeFilterIndex: filterActions.onChangeFilterIndex,
            onSubmitFilter: filterActions.filter.onSubmit,
            onFocusElement: filterActions.onFocusElement,
        }, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    optionsKlasifikasi: PropTypes.array,
    optionsKelompok: PropTypes.array,
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    minCharSearch: PropTypes.number,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
