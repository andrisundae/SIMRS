import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';
import { Checkbox, Select, DatePicker } from '@simrs/components';
import indexActions from '../actions';
import Duplication from './Duplication';


class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleChangeStatusAktifKunjungan = this._handleChangeStatusAktifKunjungan.bind(this);
        this._handleChangeTanggalAktif = this._handleChangeTanggalAktif.bind(this);
        this._handleChangeJamAktif = this._handleChangeJamAktif.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.nama = createRef();
        this.aktif = createRef();
        this.tgl_aktif_tarif = createRef();
        this.jam_aktif_tarif = createRef();
        this.id_st_aktif_kunjungan = createRef();

        this.formId = 'form-create';
    }

    render() {
        let { optionsStatusAktifKunjungan, post, isDisableForm, isShowDuplication, t } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="6" className="required field">
                                        <label>{t(this._getKey('label.field.nama'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="10" className="field">
                                        <Input
                                            name="nama"
                                            ref={this.nama}
                                            value={post.nama}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'id_st_aktif_kunjungan')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="6" className="required field">
                                        <label>{t(this._getKey('label.field.status_aktif_kunjungan'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="10" className="field">
                                        <Select
                                            name="id_st_aktif_kunjungan"
                                            placeholder={t(this._getKey('placeholder.field.status_aktif_kunjungan'))}
                                            inputRef={this.id_st_aktif_kunjungan}
                                            isDisabled={isDisableForm}
                                            onChange={this._handleChangeStatusAktifKunjungan}
                                            value={this._getStatusAktifKunjunganValue()}
                                            onKeyDown={(e) => this._onFocusElement(e, 'tgl_aktif_tarif')}
                                            options={optionsStatusAktifKunjungan}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="6" className="required field">
                                        <label>{t(this._getKey('label.field.tgl_aktif_tarif'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="4" className="field">
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
                                    <Grid.Column width="3" className="field">
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
                                    <Grid.Column width="6" className="field">
                                        <label>{t(this._getKey('label.field.status'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="10" className="field">
                                        <Checkbox
                                            value={post.aktif}
                                            name="aktif"
                                            checked={post.aktif ? true : false}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'save')}
                                            inputRef={this.aktif}
                                            label={ t(this._getKey('sublabel.field.status'))}
                                    />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {isShowDuplication &&
                    <Duplication resource={this.props.resource} t={t}/>
                }
            </Form>
        )
    }

    componentDidUpdate() {
        let { statusForm, focusElement } = this.props;

        if (statusForm === moduleActionTypes.ADD || statusForm === moduleActionTypes.EDIT) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    if (focusElement === 'tgl_aktif_tarif' || focusElement === 'jam_aktif_tarif') {
                        this[focusElement].current.setFocus();
                    } else {
                        this[focusElement].current.focus();
                    }
                }
            }
        }
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

    _handleChangeStatusAktifKunjungan(selected) {
        this.props.action.onChangeStatusAktifKunjungan(this.props.resource, selected);
    }

    _handleChangeTanggalAktif(date) {
        this.props.action.onChangeTanggalAktif(this.props.resource, date);
    }

    _handleChangeJamAktif(date) {
        this.props.action.onChangeJamAktif(this.props.resource, date);
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            if (e.target.name) {
                e.preventDefault();
            }
            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getStatusAktifKunjunganValue() {
        let { post } = this.props;
        let value = null;
        if (post.id_st_aktif_kunjungan && post.status_aktif_kunjungan) {
            value = { value: post.id_st_aktif_kunjungan, label: post.status_aktif_kunjungan };
        }

        return value;
    }
}

const mapStateToProps = function (state) {
    const { post, statusForm, focusElement, isSubmitted, submitting, data, duplication} = state.default.module;

    return {
        post,
        isDisableForm: isDisableForm(state.default.module),
        statusForm,
        focusElement,
        isSubmitted,
        submitting,
        optionsStatusAktifKunjungan: data.options_status_aktif_kunjungan,
        isShowDuplication: duplication.show
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                ...actions,
                populateForm: indexActions.populateForm,
                onChangeStatusAktifKunjungan: indexActions.onChangeStatusAktifKunjungan,
                onChangeTanggalAktif: indexActions.onChangeTanggalAktif,
                onChangeJamAktif: indexActions.onChangeJamAktif,
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
    isShowDuplication: PropTypes.bool,
    optionsStatusAktifKunjungan: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
