import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { remote } from 'electron';
import { Trans } from 'react-i18next';

import { Select, SearchButton } from '@simrs/components';
import { filterActions } from '../actions';

const { ipcMain } = remote;

class Filter extends Component {
    constructor(props) {
        super(props);

        this._onFocusElement = this._onFocusElement.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleFocusingField = this._handleFocusingField.bind(this);
        this._handleChangeUnitLayanan = this._handleChangeUnitLayanan.bind(this);
        this._handleChangeKelas = this._handleChangeKelas.bind(this);
        this._handleKeyDownSearch = this._handleKeyDownSearch.bind(this);

        this.unit_layanan = createRef();
        this.kelas = createRef();
        this.search = createRef();
    }

    render() {
        const {
            optionsUnitLayanan,
            optionsKelas,
            post,
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
                                            <label><Trans i18nKey={this._getKey('label.field.unit_layanan')} /></label>
                                        </Grid.Column>
                                        <Grid.Column width="13" className="field">
                                            <Select
                                                name="unit_layanan"
                                                placeholder={t(this._getKey('placeholder.field.unit_layanan'))}
                                                inputRef={this.unit_layanan}
                                                onChange={this._handleChangeUnitLayanan}
                                                value={post.selectedUnitLayanan}
                                                options={optionsUnitLayanan}
                                                onKeyDown={(e) => this._onFocusElement(e, 'kelas')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label>{t(this._getKey('label.field.kelas'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="13" className="field">
                                            <Select
                                                name="kelas"
                                                placeholder={t(this._getKey('placeholder.field.kelas'))}
                                                inputRef={this.kelas}
                                                onChange={this._handleChangeKelas}
                                                value={post.selectedKelas}
                                                options={optionsKelas}
                                                onKeyDown={(e) => this._onFocusElement(e, 'search')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="8" className="field">
                                            <SearchButton onKeyDown={this._handleKeyDownSearch} tabIndex={-1} as="a" inputRef={this.search} onClick={this._handleSubmit} />
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

        MouseTrap.bindGlobal('alt+k', function (e) {
            e.preventDefault();
            _this.unit_layanan.current.focus();
        });

        MouseTrap.bindGlobal('alt+c', function (e) {
            e.preventDefault();
            _this._search();
        });
    }

    _unbindKey() {
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

    _handleKeyDownSearch(e) {
        e.preventDefault();
        if (13 === e.which) {
            this._search();
        }   
    }

    _handleFocusingField() {
        const { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    _handleChangeUnitLayanan(selected) {
        this.props.action.onChangeUnitLayanan(this.props.resource, selected);
    }

    _handleChangeKelas(selected) {
        this.props.action.onChangeKelas(this.props.resource, selected);
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }
}

const mapStateToProps = function (state) {
    const { filter } = state.default;
    const data = filter.data;

    return {
        optionsUnitLayanan: data.options_unit_layanan,
        optionsKelas: data.options_kelas,
        post: filter.post,
        focusElement: filter.focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeUnitLayanan: filterActions.onChangeUnitLayanan,
            onChangeKelas: filterActions.onChangeKelas,
            onFocusElement: filterActions.onFocusElement,
            onSubmitFilter: filterActions.onSubmitFilter,
        }, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    optionsUnitLayanan: PropTypes.array,
    optionsKelas: PropTypes.array,
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
