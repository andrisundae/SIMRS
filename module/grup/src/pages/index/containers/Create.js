import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, TextArea } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';

class Create extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.nama = createRef();
        this.keterangan = createRef();

        this.formId = 'form-create';
    }

    render() {
        let { post, isDisableForm, t } = this.props;

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
                                            onKeyDown={(e) => this._onFocusElement(e, 'keterangan')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="form-row">
                                    <Grid.Column width="4" className="field">
                                        <label>{t(this._getKey('label.field.keterangan'))}</label>
                                    </Grid.Column>
                                    <Grid.Column width="12" className="field">
                                        <TextArea
                                            name="keterangan"
                                            rows={2}
                                            ref={this.keterangan}
                                            value={post.keterangan}
                                            disabled={isDisableForm}
                                            onChange={this._handleInputChange}
                                            onKeyDown={(e) => this._onFocusElement(e, 'save')}
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
            }
        }
    }

    _handleInputChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeInput(this.props.resource, { name, value });
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            e.preventDefault();
            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { post, statusForm, focusElement, isSubmitted, submitting} = state.default.module;

    return {
        post,
        isDisableForm: isDisableForm(state.default.module),
        statusForm,
        focusElement,
        isSubmitted,
        submitting
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(actions, dispatch),
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
    t: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
