import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Input, Form, Grid } from 'semantic-ui-react';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { remote } from 'electron';
import { Trans } from 'react-i18next';

import { Select, SearchButton } from '@simrs/components';
import { filterActions } from '@simrs/main/src/modules/master/nested';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import actions from '../actions';

const { ipcMain } = remote;

class Filter extends Component {
    constructor(props) {
        super(props);

        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleChangeKlasifikasi = this._handleChangeKlasifikasi.bind(this);
        this._handleChangeVersiTarif = this._handleChangeVersiTarif.bind(this);
        this._handleChangeKelompok = this._handleChangeKelompok.bind(this);
        this._handleChangeKelas = this._handleChangeKelas.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleKeyDownFilterValue = this._handleKeyDownFilterValue.bind(this);
        this._handleFocusingField = this._handleFocusingField.bind(this);

        this.versi_tarif = createRef();
        this.klasifikasi = createRef();
        this.kelompok = createRef();
        this.kelas = createRef();
        this.nama_layanan = createRef();
        this.search = createRef();
    }

    render() {
        const {
            optionsVersiTarif,
            optionsKlasifikasi,
            optionsKelompok,
            optionsKelas,
            post,
            minCharSearch,
            t
        } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label><Trans i18nKey={this._getKey('label.field.versi_tarif')} /></label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="versi_tarif"
                                            placeholder={t(this._getKey('placeholder.field.versi_tarif'))}
                                            inputRef={this.versi_tarif}
                                            onChange={this._handleChangeVersiTarif}
                                            value={post.selectedVersiTarif}
                                            options={optionsVersiTarif}
                                            onKeyDown={(e) => this._onFocusElement(e, 'klasifikasi')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.klasifikasi'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
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
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.kelompok'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="kelompok"
                                            placeholder={t(this._getKey('placeholder.field.kelompok'))}
                                            inputRef={this.kelompok}
                                            onChange={this._handleChangeKelompok}
                                            value={post.selectedKelompok}
                                            options={optionsKelompok}
                                            onKeyDown={(e) => this._onFocusElement(e, 'kelas')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid className="form-grid">
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.kelas'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="kelas"
                                            placeholder={t(this._getKey('placeholder.field.kelas'))}
                                            inputRef={this.kelas}
                                            onChange={this._handleChangeKelas}
                                            value={post.selectedKelas}
                                            options={optionsKelas}
                                            onKeyDown={(e) => this._onFocusElement(e, 'nama_layanan')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.layanan'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="nama_layanan"
                                            ref={this.nama_layanan}
                                            value={post.nama_layanan}
                                            onChange={this._handleFilterChange}
                                            onKeyDown={this._handleKeyDownFilterValue}
                                            placeholder={t(this._getKey('placeholder.filter'), { minCharSearch })}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid className="form-grid">
                                <Grid.Row className="form-row">
                                    <Grid.Column width="8" className="field">
                                        <SearchButton
                                            as="a"
                                            inputRef={this.search}
                                            onClick={this._handleSubmit}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }

    componentDidMount() {
        ipcMain.on('focusing-field', this._handleFocusingField);
    }

    componentDidUpdate() {
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
            _this.nama_layanan.current.focus();
        });

        MouseTrap.bindGlobal('alt+v', function (e) {
            e.preventDefault();
            _this.versi_tarif.current.focus();
        });

        MouseTrap.bindGlobal('alt+c', function (e) {
            e.preventDefault();
            _this._search();
        });
    }

    _unbindKey() {
        MouseTrap.unbind('alt+f');
        MouseTrap.unbind('alt+v');
        MouseTrap.unbind('alt+c');
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _search() {
        let { resource, subResource, post } = this.props;
        this.props.action.onSubmitFilter(resource, subResource, post);
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._search();
    }

    _handleKeyDownFilterValue(e) {
        if (13 === e.which) {
            e.preventDefault();
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

    _handleChangeVersiTarif(selected) {
        this.props.action.onChangeVersiTarif(this.props.resource, this.props.subResource, selected);
    }

    _handleChangeKlasifikasi(selected) {
        this.props.action.onChangeKlasifikasi(this.props.resource, this.props.subResource, selected);
    }

    _handleChangeKelompok(selected) {
        this.props.action.onChangeKelompok(this.props.resource, this.props.subResource, selected);
    }

    _handleChangeKelas(selected) {
        this.props.action.onChangeKelas(this.props.resource, this.props.subResource, selected);
    }

    _handleFilterChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeFilter(this.props.resource, this.props.subResource, { name, value });
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            this.props.action.onFocusElement(this.props.resource, this.props.subResource, nameRef);
        }
    }
}

const mapStateToProps = function (state, props) {
    const { filter } = state.nested;
    const data = filter.data;
    const minCharSearch = props.settings.find(setting => setting.aturan === context.MINCHARPENCARIANMASTER);

    return {
        optionsVersiTarif: data.options_versi_tarif,
        optionsKlasifikasi: data.options_klasifikasi,
        optionsKelompok: data.options_kelompok,
        optionsKelas: data.options_kelas,
        post: filter.post,
        focusElement: filter.focusElement,
        minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0)
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onSubmitFilter: actions.filter.onSubmit,
            onChangeKlasifikasi: actions.onChangeKlasifikasi,
            onChangeVersiTarif: actions.onChangeVersiTarif,
            onChangeKelompok: actions.onChangeKelompok,
            onChangeKelas: actions.onChangeKelas,
            onFocusElement: actions.onFocusElement,
            onChangeFilter: filterActions.onChangeFilter,
        }, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    optionsVersiTarif: PropTypes.array,
    optionsKlasifikasi: PropTypes.array,
    optionsKelompok: PropTypes.array,
    optionsKelas: PropTypes.array,
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    minCharSearch: PropTypes.number,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
