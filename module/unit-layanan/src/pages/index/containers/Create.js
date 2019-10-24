import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, Divider, Label } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';
import { Checkbox, Select } from '@simrs/components';
import indexActions from '../actions';

class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleInstalasiChange = this._handleInstalasiChange.bind(this);
        this._handleKategoriChange = this._handleKategoriChange.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.nama = createRef();
        this.aktif = createRef();
        this.instalasi = createRef();
        this.kategori = createRef();
        this.inisial = createRef();
        this.kode_mapping_bpjs = createRef();
        this.umur1 = createRef();
        this.umur2 = createRef();
        this.st_asal_kunjungan = createRef();

        this.RAWAT_INAP = 2;

        this.formId = 'form-create';
    }

    render() {
        let { optionsInstalasi, optionsKategori, post, isDisableForm, t } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2" divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.instalasi'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="instalasi"
                                            placeholder={t(this._getKey('placeholder.field.instalasi'))}
                                            inputRef={this.instalasi}
                                            isDisabled={isDisableForm}
                                            onChange={this._handleInstalasiChange}
                                            value={this._getInstalasiValue()}
                                            onKeyDown={(e) => this._onFocusElement(e, 'nama')}
                                            options={optionsInstalasi}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.nama'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="nama"
                                            ref={this.nama}
                                            value={post.nama}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'inisial')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.inisial'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="inisial"
                                            ref={this.inisial}
                                            value={post.inisial}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
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
                                            onKeyDown={(e) => this._onFocusElement(e, this._isRawatInap() ? 'st_asal_kunjungan' : 'kategori')}
                                            inputRef={this.aktif}
                                            label={t(this._getKey('sublabel.field.status'))}
                                        />
                                        {this._isRawatInap() &&
                                            <Fragment>
                                            <Divider fitted style={{ marginTop: 5, marginBottom: 4 }} />
                                            <Checkbox
                                                value={post.st_asal_kunjungan}
                                                name="st_asal_kunjungan"
                                                checked={post.st_asal_kunjungan ? true : false}
                                                disabled={isDisableForm}
                                                onChange={this._handleInputChange}
                                                onKeyDown={(e) => this._onFocusElement(e, 'kode_mapping_bpjs')}
                                                inputRef={this.st_asal_kunjungan}
                                                label={t(this._getKey('sublabel.field.asal_kunjungan'))}
                                            />
                                            </Fragment>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid className="form-grid">
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.kode_mapping_bpjs'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="kode_mapping_bpjs"
                                            ref={this.kode_mapping_bpjs}
                                            value={post.kode_mapping_bpjs || ''}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'kategori')}
                                            maxLength={5}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.kategori'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Select
                                            name="kategori"
                                            placeholder={t(this._getKey('placeholder.field.kategori'))}
                                            inputRef={this.kategori}
                                            isDisabled={isDisableForm}
                                            onChange={this._handleKategoriChange}
                                            value={this._getKategoriValue()}
                                            onKeyDown={(e) => this._onFocusElement(e, this._isKategoriAnak() ? 'umur1' : 'save')}
                                            options={optionsKategori}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                {this._isKategoriAnak() === true &&
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="4" className="field">
                                            <label>{t(this._getKey('label.field.rentang_umur'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="4" className="field">
                                            <Input
                                                type="number"
                                                name="umur1"
                                                ref={this.umur1}
                                                value={post.umur1}
                                                disabled={isDisableForm}
                                                onChange={this._handleInputChange}
                                                onKeyDown={(e) => this._onFocusElement(e, 'umur2')}
                                            />
                                        </Grid.Column>
                                        <Label circular horizontal>
                                            {t(this._getKey('label.field.sd'))}
                                        </Label>
                                        <Grid.Column width="4" className="field">
                                            <Input
                                                type="number"
                                                name="umur2"
                                                ref={this.umur2}
                                                value={post.umur2}
                                                disabled={isDisableForm}
                                                onChange={this._handleInputChange}
                                                onKeyDown={(e) => this._onFocusElement(e, 'save')}
                                            />
                                            <Label floating>
                                                {post.kategori === 'ANAK' &&
                                                    "Tahun"
                                                }
                                                {post.kategori === 'BAYI' &&
                                                    "Hari"
                                                }
                                            </Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                }
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        let { statusForm, focusElement } = this.props;

        if (statusForm === moduleActionTypes.ADD || statusForm === moduleActionTypes.EDIT) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                }
            }
        }
    }

    _isKategoriAnak() {
        const { post } = this.props;
        return post.kategori !== 'UMUM' && post.kategori !== 'GERIYATRI' && post.kategori !== '' ? true : false;
    }

    _isRawatInap() {
        const { post } = this.props;
        return post.jenis_layanan === this.RAWAT_INAP ? true : false;
    }

    _handleInputChange(e) {
        const { name, value, checked, type } = e.target;
        let val = '';
        if (type === 'checkbox') {
            val = checked ? true : ''
        } else {
            val = value;
        }
        this.props.action.onChangeInput(this.props.resource, { name, value: val });
    }

    _handleInstalasiChange(selected) {
        this.props.action.onChangeInstalasi(this.props.resource, selected);
    }

    _handleKategoriChange(selected) {
        this.props.action.onChangeKategori(this.props.resource, selected);
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            if (e.target.name) {
                e.preventDefault();
            }
            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }

    _getInstalasiValue() {
        let { post } = this.props;
        let value = null;
        if (post.instalasi && post.nama_instalasi) {
            value = { value: post.instalasi, label: post.nama_instalasi };
        }

        return value;
    }

    _getKategoriValue() {
        let { post } = this.props;
        let value = null;
        if (post.kategori) {
            value = { value: post.kategori, label: post.kategori };
        }

        return value;
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { post, statusForm, focusElement, isSubmitted, submitting, data} = state.default.module;

    return {
        post,
        isDisableForm: isDisableForm(state.default.module),
        statusForm,
        focusElement,
        isSubmitted,
        submitting,
        optionsInstalasi: data.options_instalasi,
        optionsKategori: data.options_kategori
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                ...actions,
                populateForm: indexActions.populateForm,
                onChangeInstalasi: indexActions.onChangeInstalasi,
                onChangeKategori: indexActions.onChangeKategori
            },
            dispatch
        ),
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
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func,
    optionsInstalasi: PropTypes.array,
    optionsKategori: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
