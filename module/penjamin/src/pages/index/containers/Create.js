import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, TextArea, Divider } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';
import { Checkbox, Select, Radio } from '@simrs/components';
import indexActions from '../actions';

class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleKelasChange = this._handleKelasChange.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.nama = createRef();
        this.alamat = createRef();
        this.aktif = createRef();
        this.kelas = createRef();
        this.telp = createRef();
        this.jaminan_penuh = createRef();
        this.input_jaminan = createRef();
        this.st_naik_satu_tingkat = createRef();

        this.formId = 'form-create';
    }

    render() {
        let { optionsKelas, post, isDisableForm, t } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
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
                                            onKeyDown={(e) => this._onFocusElement(e, 'alamat')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.alamat'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <TextArea
                                            name="alamat"
                                            rows={2}
                                            ref={this.alamat}
                                            value={post.alamat}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'telp')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="required field">
                                        <label>{t(this._getKey('label.field.telp'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <Input
                                            name="telp"
                                            ref={this.telp}
                                            value={post.telp}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'kelas')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid>
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
                                            value={this._getKelasValue()}
                                            onChange={this._handleKelasChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'jaminan_penuh')}
                                            options={optionsKelas}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.jaminan_penuh'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="inline field">
                                        <Radio
                                            value="penuh"
                                            name="status_jaminan"
                                            checked={post.status_jaminan === 'penuh' ? true : false}
                                            onChange={this._handleInputChange}
                                            inputRef={this.jaminan_penuh}
                                            onKeyDown={(e) => this._onFocusElement(e, 'input_jaminan')}
                                            label={t(this._getKey('label.field.jaminan_penuh'))}
                                            disabled={isDisableForm}
                                        />
                                        <Radio
                                            value="input"
                                            name="status_jaminan"
                                            checked={post.status_jaminan === 'input' ? true : false}
                                            onChange={this._handleInputChange}
                                            inputRef={this.input_jaminan}
                                            onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                                            label={t(this._getKey('label.field.input_jaminan'))}
                                            disabled={isDisableForm}
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
                                            onKeyDown={(e) => this._onFocusElement(e, 'st_naik_satu_tingkat')}
                                            inputRef={this.aktif}
                                            label={t(this._getKey('sublabel.field.status'))}
                                        />
                                        <Divider fitted style={{ marginTop: 5, marginBottom: 4 }} />
                                        <Checkbox
                                            value={post.st_naik_satu_tingkat}
                                            name="st_naik_satu_tingkat"
                                            checked={post.st_naik_satu_tingkat ? true : false}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'save')}
                                            inputRef={this.st_naik_satu_tingkat}
                                            label={t(this._getKey('sublabel.field.st_naik_satu_tingkat'))}
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

    componentDidUpdate() {
        let { statusForm, focusElement } = this.props;

        if (statusForm === moduleActionTypes.ADD || statusForm === moduleActionTypes.EDIT) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                }
            } else {
                if (focusElement === 'status_jaminan') {
                    this.jaminan_penuh.current.focus();
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

    _handleKelasChange(selected) {
        this.props.action.onChangeSelect2(this.props.resource, 'kelas', selected);
    }

    _getKelasValue() {
        let { post } = this.props;
        let value = null;
        if (post.kelas && post.nama_kelas) {
            value = { value: post.kelas, label: post.nama_kelas };
        }

        return value;
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
        optionsKelas: data.options_kelas
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                ...actions,
                populateForm: indexActions.populateForm,
                onChangeSelect2: indexActions.onChangeSelect2
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
    optionsKelas: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
