import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Form as FormContainer, Grid, Segment } from 'semantic-ui-react';
import { remote } from 'electron';
import { Trans } from 'react-i18next';

import { Select } from '@simrs/components';
import SelectOrder from '../componenst/SelectOrder';
import actions from '../actions';

const { ipcMain } = remote;

class Form extends Component {
    constructor(props) {
        super(props);

        this._handleChangeVersiTarif = this._handleChangeVersiTarif.bind(this);
        this._handleChangeJenisEkspor = this._handleChangeJenisEkspor.bind(this);
        this._handleChangeColumnOrder = this._handleChangeColumnOrder.bind(this);
        this._handleChangeJenisEkspor = this._handleChangeJenisEkspor.bind(this);
        this._handleFocusingField = this._handleFocusingField.bind(this);

        this.versi_tarif = createRef();
        this.jenis_ekspor = createRef();
        this.column_order = createRef();
    }

    render() {
        const {
            optionsVersiTarif,
            optionsColumnOrder,
            post,
            t
        } = this.props;

        return (
            <Segment padded>
                <FormContainer id={this.formId} size="mini">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Grid className="form-grid">
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label><Trans i18nKey={this._getKey('label.field.versi_tarif')} /></label>
                                        </Grid.Column>
                                        <Grid.Column width="8" className="field">
                                            <Select
                                                name="versi_tarif"
                                                placeholder={t(this._getKey('placeholder.field.versi_tarif'))}
                                                inputRef={this.versi_tarif}
                                                onChange={this._handleChangeVersiTarif}
                                                value={post.selectedVersiTarif}
                                                options={optionsVersiTarif}
                                                onKeyDown={(e) => this._onFocusElement(e, 'jenis_ekspor')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label>{t(this._getKey('label.field.jenis_ekspor'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="8" className="field">
                                            <Select
                                                name="jenis_ekspor"
                                                placeholder={t(this._getKey('placeholder.field.jenis_ekspor'))}
                                                inputRef={this.jenis_ekspor}
                                                onChange={this._handleChangeJenisEkspor}
                                                value={post.selectedJenisEkspor}
                                                options={this._getJenisEkspor()}
                                                onKeyDown={(e) => this._onFocusElement(e, 'column_order')}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="form-row">
                                        <Grid.Column width="3" className="field">
                                            <label>{t(this._getKey('label.field.column_order'))}</label>
                                        </Grid.Column>
                                        <Grid.Column width="10" className="field">
                                            <SelectOrder
                                                name="column_order"
                                                placeholder={t(this._getKey('placeholder.field.column_order'))}
                                                inputRef={this.column_order}
                                                onChange={this._handleChangeColumnOrder}
                                                options={optionsColumnOrder}
                                                onKeyDown={(e) => this._onFocusElement(e, 'preview')}
                                                value={post.selectedColumnOrder}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </FormContainer>
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

        MouseTrap.bindGlobal('alt+v', function (e) {
            e.preventDefault();
            _this.versi_tarif.current.focus();
        });
    }

    _unbindKey() {
        MouseTrap.unbind('alt+v');
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _handleFocusingField() {
        const { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
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

    _handleChangeVersiTarif(selected) {
        this.props.action.onChangeVersiTarif(this.props.resource, selected);
    }

    _handleChangeJenisEkspor(selected) {
        this.props.action.onChangeJenisEkspor(this.props.resource, selected);
    }

    _handleChangeColumnOrder(selected) {
        this.props.action.onChangeColumnOrder(this.props.resource, selected);
    }

    _getJenisEkspor() {
        const {t} = this.props;

        return [
            { value: 'tarif_aktif', label: t(this._getKey('jenis_ekspor.option.tarif_aktif')) },
            { value: 'tarif_aktif_setting', label: t(this._getKey('jenis_ekspor.option.tarif_aktif_setting')) },
            { value: 'tarif_aktif_setting_transaksi', label: t(this._getKey('jenis_ekspor.option.tarif_aktif_setting_transaksi')) },
        ];
    }
}

const mapStateToProps = function (state) {
    const { form, focusElement } = state.default;
    const {data, post} = form;

    return {
        optionsVersiTarif: data.options_versi_tarif,
        optionsColumnOrder: data.options_column_order,
        post,
        focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeVersiTarif: actions.onChangeVersiTarif,
            onChangeJenisEkspor: actions.onChangeJenisEkspor,
            onChangeColumnOrder: actions.onChangeColumnOrder,
            onFocusElement: actions.onFocusElement,
        }, dispatch),
    }
}

Form.propTypes = {
    post: PropTypes.object,
    optionsVersiTarif: PropTypes.array,
    optionsColumnOrder: PropTypes.array,
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
