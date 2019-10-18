import React, {Component,createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { Grid } from 'semantic-ui-react';

import { Import as ImportTemplate, actionTypes } from '@simrs/main/src/modules/import';
import { Radio, Select } from '@simrs/components';

import api from '../../../services/models/importTarifModel';
import actions from '../actions';

class Import extends Component {
    constructor(props) {
        super(props);

        this._handleChangeInput = this._handleChangeInput.bind(this);
        this._handleChangeVersi = this._handleChangeVersi.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.versi_tarif = createRef();
        this.jenis_baru = createRef();
        this.jenis_revisi = createRef();
        this.file = createRef();
        this.fileRef = createRef();
    }

    render() {
        const { post, data, t, isStartedUpload } = this.props;

        return (
            <ImportTemplate
                resource={this.props.resource}
                caption="Import Pasien"
                helpBlockFile={this.props.t(this._getKey('help.field.file'))}
                onUpload={api.upload}
                fileRef={this.fileRef}
                inputRef={this.file}
                t={this.props.t}
                {...this.props}
            >
                <Grid.Row className="form-row">
                    <Grid.Column width="4" className="required field">
                        <label>{t(this._getKey('label.field.versi_tarif'))}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                        <Select
                            name="versi_tarif"
                            placeholder={t(this._getKey('placeholder.field.versi_tarif'))}
                            inputRef={this.versi_tarif}
                            value={post.selectedVersi}
                            onChange={this._handleChangeVersi}
                            onKeyDown={(e) => this._onFocusElement(e, 'jenis_tarif')}
                            options={data.versi}
                            isDisabled={isStartedUpload}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                    <Grid.Column width="4" className="required field">
                        <label>{t(this._getKey('label.field.jenis_tarif'))}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="inline field">
                        <Radio
                            value="baru"
                            name="jenis_tarif"
                            checked={post.jenis_tarif === 'baru' ? true : false}
                            onChange={this._handleChangeInput}
                            inputRef={this.jenis_baru}
                            onKeyDown={(e) => this._onFocusElement(e, 'import')}
                            label={t(this._getKey('sublabel.field.jenis_baru'))}
                            disabled={isStartedUpload}
                        />
                        <Radio
                            value="revisi"
                            name="jenis_tarif"
                            checked={post.jenis_tarif === 'revisi' ? true : false}
                            onChange={this._handleChangeInput}
                            inputRef={this.jenis_revisi}
                            onKeyDown={(e) => this._onFocusElement(e, 'import')}
                            label={t(this._getKey('sublabel.field.jenis_revisi'))}
                            disabled={isStartedUpload}
                        />
                    </Grid.Column>
                </Grid.Row>
            </ImportTemplate>
        )
    }

    componentDidUpdate() {
        let { statusForm, focusElement } = this.props;

        if (statusForm === actionTypes.READY) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                }
            } else {
                if (focusElement === 'jenis_tarif') {
                    this.jenis_baru.current.focus();
                }
            }
        }
    }

    _handleChangeInput(e) {
        const { name, value } = e.target;
        this.props.action.onChangeInput(this.props.resource, { name, value });
    }

    _handleChangeVersi(selected) {
        this.props.action.onChangeVersi(this.props.resource, selected);
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
    const { data, post, statusForm, focusElement, isStartedUpload} = state.module;

    return {
        data,
        post,
        statusForm,
        focusElement,
        isStartedUpload
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onChangeInput: actions.onChangeInput,
            onChangeVersi: actions.onChangeVersi,
            onFocusElement: actions.onFocusElement,
        }, dispatch),
    }
}

Import.propTypes = {
    resource: PropTypes.string,
    statusForm: PropTypes.string,
    focusElement: PropTypes.string,
    t: PropTypes.func.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    data: PropTypes.object,
    versi: PropTypes.array,
    isStartedUpload: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Import);