import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid } from 'semantic-ui-react';
import {remote} from 'electron';

import { isDisableForm as checkForm, moduleActions, moduleActionTypes } from '@simrs/main/src/modules/master/nested';
import { Checkbox, Select, CurrencyInput, DatePicker, confirmation } from '@simrs/components';
import ImportKelas from './ImportKelas';
import actions from '../actions';

const {ipcMain} = remote;

class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleCurrencyChange = this._handleCurrencyChange.bind(this);
        this._handleChangeKelas = this._handleChangeKelas.bind(this);
        this._handleChangeTanggalAktif = this._handleChangeTanggalAktif.bind(this);
        this._handleChangeJamAktif = this._handleChangeJamAktif.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);
        this._handleStatusNotBalance = this._handleStatusNotBalance.bind(this);

        this.kode_panggil = createRef();
        this.kelas = createRef();
        this.aktif = createRef();
        this.tgl_aktif_tarif = createRef();
        this.jam_aktif_tarif = createRef();
        this.tarif = createRef();
        this.form = `form-${props.subResource}`;
    }

    render() {
        let { data, post, isDisableForm, t, isShowImportKelas } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.kode_panggil'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="kode_panggil"
                                            ref={this.kode_panggil}
                                            value={post.kode_panggil}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'kelas')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.kelas'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="kelas"
                                            placeholder={t(this._getKey('placeholder.field.kelas'))}
                                            inputRef={this.kelas}
                                            isDisabled={isDisableForm}
                                            onChange={this._handleChangeKelas}
                                            value={this._getKelasValue()}
                                            onKeyDown={(e) => this._onFocusElement(e, 'tarif')}
                                            options={data.options_kelas}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.tarif'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <CurrencyInput
                                            name="tarif"
                                            inputRef={this.tarif}
                                            value={post.tarif}
                                            disabled={isDisableForm}
                                            onChangeEvent={this._handleCurrencyChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'tgl_aktif_tarif')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid className="form-grid">
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.tgl_aktif_tarif'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="5" className="field">
                                        <DatePicker
                                            name="tgl_aktif_tarif"
                                            inputRef={this.tgl_aktif_tarif}
                                            selected={post.tgl_aktif_tarif}
                                            disabled={isDisableForm}
                                            onChange={this._handleChangeTanggalAktif}
                                            onKeyDown={(e) => this._onFocusElement(e, 'jam_aktif_tarif')}
                                            dateFormat="dd/MM/yyyy"
                                            isClearable={isDisableForm ? false : true}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width="4" className="field">
                                        <DatePicker
                                            inputRef={this.jam_aktif_tarif}
                                            selected={post.jam_aktif_tarif}
                                            disabled={isDisableForm}
                                            onChange={this._handleChangeJamAktif}
                                            onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="HH:mm"
                                            timeCaption="Jam"
                                            isClearable={isDisableForm ? false : true}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.status'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Checkbox
                                            value={post.aktif}
                                            name="aktif"
                                            checked={post.aktif ? true : false}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'save')}
                                            inputRef={this.aktif}
                                            label={t(this._getKey('sublabel.field.status'))}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {isShowImportKelas &&
                    <ImportKelas t={t} resource={this.props.resource} subResource={this.props.subResource} />
                }
            </Form>
        )
    }

    componentDidMount() {
        ipcMain.on('status-not-balance', this._handleStatusNotBalance);
    }

    componentDidUpdate() {
        let { statusForm, focusElement, location, action, resource, subResource, selectedRow } = this.props;

        if (statusForm === moduleActionTypes.ADD || statusForm === moduleActionTypes.EDIT) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    if (focusElement === 'tgl_aktif_tarif' || focusElement === 'jam_aktif_tarif') {
                        this[focusElement].current.setFocus();
                    } else if (focusElement === 'tarif') {
                        this[focusElement].current.theInput.focus();
                    } else {
                        this[focusElement].current.focus();
                    }
                }
            }
        }

        if (location.state.is_edit_tindakan && statusForm === moduleActionTypes.EDIT) {
            this.props.history.replace({
                pathname: `/tindakan/${this.props.match.params.layanan}`,
                state: {
                    id_kelompok: location.state.id_kelompok,
                    nama_kelompok: location.state.nama_kelompok,
                    id_layanan: location.state.id_layanan,
                    nama_layanan: location.state.nama_layanan,
                    selectedKlasifikasi: location.state.selectedKlasifikasi,
                    selectedVersiTarif: location.state.selectedVersiTarif,
                    tindakan: location.state.tindakan,
                    layanan: location.state.id_kelompok,
                    is_edit_tindakan: false
                }
            });
            action.onSaveSuccess(resource, subResource, { message: 'Data berhasil disimpan.', data: { id: selectedRow } });
        }
    }

    componentWillUnmount() {
        ipcMain.removeListener('status-not-balance', this._handleStatusNotBalance);
    }

    _handleStatusNotBalance() {
        confirmation({
            message: this.props.t(this._getKey('tindakan.not_balance.confirmation')),
            onCancel: () => this.props.action.onFocusElement(this.props.resource, this.props.subResource, 'tarif'),
            onOk: () => this._next(),
        });
    }

    _next() {
        const { history, selectedRow, post, location } = this.props;
        history.push({
            pathname: `/tindakan-komponen/${selectedRow}`,
            state: {
                ...location.state,
                tindakanKomponen: true,
                tindakan: selectedRow,
                tarif: post.tarif,
                nama_layanan: post.nama_layanan,
                nama_kelas: post.nama_kelas,
                is_edit_tindakan: true
            }
        });
    }

    _handleInputChange(e) {
        const { name, value, checked, type } = e.target;
        let val = '';
        if (type === 'checkbox') {
            val = checked ? true : ''
        } else {
            val = value;
        }
        this.props.action.onChangeInput(this.props.resource, this.props.subResource, { name, value: val });
    }

    _handleCurrencyChange(e, maskedValue, floatValue) {
        this.props.action.onChangeInput(this.props.resource, this.props.subResource, { name: 'tarif', value: floatValue });
    }

    _handleChangeKelas(selected) {
        this.props.action.onChangeKelas(this.props.resource, this.props.subResource, selected);
    }

    _handleChangeTanggalAktif(date) {
        this.props.action.onChangeTanggalAktif(this.props.resource, this.props.subResource, date);
    }

    _handleChangeJamAktif(date) {
        this.props.action.onChangeJamAktif(this.props.resource, this.props.subResource, date);
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            this.props.action.onFocusElement(this.props.resource, this.props.subResource, nameRef);
        }
    }

    _getKelasValue() {
        let { post } = this.props;
        let value = null;
        if (post.kelas && post.nama_kelas) {
            value = { value: post.kelas, label: post.nama_kelas };
        }

        return value;
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { post, statusForm, focusElement, isSubmitted, submitting, data, importKelas, selectedRow } = state.nested.module;

    return {
        post,
        isDisableForm: checkForm(state.nested.module),
        statusForm,
        focusElement,
        isSubmitted,
        submitting,
        data,
        isShowImportKelas: importKelas.show,
        selectedRow
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeInput: moduleActions.onChangeInput,
            onSaveSuccess: moduleActions.save.requestSuccess,
            onFocusElement: moduleActions.onFocusElement,
            onChangeKelas: actions.onChangeKelas,
            onChangeTanggalAktif: actions.onChangeTanggalAktif,
            onChangeJamAktif: actions.onChangeJamAktif,
            onChangeStatusNotBalance: actions.onChangeStatusNotBalance,
        }, dispatch),
    }
}

Create.propTypes = {
    action: PropTypes.object,
    isDisableForm: PropTypes.bool,
    post: PropTypes.object,
    statusForm: PropTypes.string,
    focusElement: PropTypes.string,
    isSubmitted: PropTypes.bool,
    submitting: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func,
    data: PropTypes.object,
    selectedRow: PropTypes.number,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
