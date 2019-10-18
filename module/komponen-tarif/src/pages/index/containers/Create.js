import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, TextArea } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';
import { Checkbox, Select } from '@simrs/components';
import indexActions from '../actions';

class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleChangePenanggungJawab = this._handleChangePenanggungJawab.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.nama = createRef();
        this.aktif = createRef();
        this.keterangan = createRef();
        this.penanggung_jawab = createRef();

        this.formId = 'form-create';
    }

    render() {
        let { optionsPenanggungJawab, post, isDisableForm, t } = this.props;

        return (
            <Form id={this.formId} size="small">
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="5" className="required field">
                                        <label>{t(this._getKey('label.field.nama'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="11" className="field">
                                        <Input
                                            name="nama"
                                            ref={this.nama}
                                            value={post.nama}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'penanggung_jawab')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="5" className="required field">
                                        <label>{t(this._getKey('label.field.penanggung_jawab'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="11" className="field">
                                        <Select
                                            name="penanggung_jawab"
                                            placeholder={t(this._getKey('placeholder.field.penanggung_jawab'))}
                                            inputRef={this.penanggung_jawab}
                                            isDisabled={isDisableForm}
                                            value={this._getPenanggungJawabValue()}
                                            onChange={this._handleChangePenanggungJawab}
                                            onKeyDown={(e) => this._onFocusElement(e, 'keterangan')}
                                            options={optionsPenanggungJawab}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="5" className="field">
                                        <label>{t(this._getKey('label.field.keterangan'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="11" className="field">
                                        <TextArea
                                            name="keterangan"
                                            ref={this.keterangan}
                                            value={post.keterangan}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                                            rows={2}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="5" className="field">
                                        <label>{t(this._getKey('label.field.status'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="11" className="field">
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

    _handleChangePenanggungJawab(selected) {
        this.props.action.onChangePenanggungJawab(this.props.resource, selected);
    }

    _getPenanggungJawabValue() {
        let { post } = this.props;
        let value = null;
        if (post.penanggung_jawab && post.nama_penanggung_jawab) {
            value = { value: post.penanggung_jawab, label: post.nama_penanggung_jawab };
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
        optionsPenanggungJawab: data.options_penanggung_jawab
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                ...actions,
                populateForm: indexActions.populateForm,
                onChangePenanggungJawab: indexActions.onChangePenanggungJawab
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
    optionsPenanggungJawab: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
