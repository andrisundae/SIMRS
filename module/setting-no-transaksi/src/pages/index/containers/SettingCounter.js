import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Modal, Grid, Icon, Form } from 'semantic-ui-react';

import { SaveButton, CancelButton, CurrencyInput } from '@simrs/components';
import { moduleActions } from '@simrs/main/src/modules/master/default';
import action from '../actions';

class SettingCounter extends Component {
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onSave = this._onSave.bind(this);
        this._handleCounterChange = this._handleCounterChange.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.start_counter = createRef();
        this.save_setting = createRef();
        this.cancel_setting = createRef();
    }

    render() {
        const { show, t, post } = this.props;

        return (
            <Modal open={show} onClose={this._onCancel} size="tiny" closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header><Icon name="setting" />{t(this._getKey('setting_counter.title'))}</Modal.Header>
                <Modal.Content>
                    <Grid className="content-grid" >
                        <Grid.Row>
                            <Grid.Column>
                                <Form id={this.formId} size="small">
                                    <Grid className="form-grid">
                                        <Grid.Row className="form-row">
                                            <Grid.Column width="4" className="required field">
                                                <label>{t(this._getKey('label.field.start_counter'))}</label>
                                            </Grid.Column>
                                            <Grid.Column width="8" className="field">
                                                <CurrencyInput
                                                    name="start_counter"
                                                    inputRef={this.start_counter}
                                                    value={post.start_counter}
                                                    onChangeEvent={this._handleCounterChange}
                                                    onKeyDown={(e) => this._onFocusElement(e, 'save_setting')}
                                                    decimalSeparator=""
                                                    thousandSeparator=""
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <CancelButton
                        name="cancel_setting"
                        inputRef={this.cancel_setting}
                        onClick={this._onCancel}
                        onKeyDown={(e) => this._onFocusElement(e, 'save_setting')}
                    />
                    <SaveButton
                        name="save_setting"
                        inputRef={this.save_setting}
                        onClick={this._onSave}
                        onKeyDown={(e) => this._onFocusElement(e, 'cancel_setting')}
                    />
                </Modal.Actions>
            </Modal>
        )
    }

    componentDidMount() {
        this.props.action.onFocusElement(this.props.resource, 'start_counter');
    }

    componentDidUpdate() {
        let { show, focusElement } = this.props;

        if (show) {
            if (this[focusElement]) {
                if (focusElement === 'start_counter') {
                    this[focusElement].current.theInput.focus();
                    this[focusElement].current.theInput.select();
                } else {
                    this[focusElement].current.focus();
                }
            }
        }
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            e.preventDefault();
            this.props.action.onFocusElement(this.props.resource, nameRef);
        } else {
            if (e.which === 37 || e.which === 39) {
                e.preventDefault();

                let { name } = e.target;

                let nextElement = '';
                switch (name) {
                    case 'save_setting':
                        nextElement = 'cancel_setting';
                        break;
                    case 'cancel_setting':
                        nextElement = 'save_setting';
                        break;
                    default:
                    break;
                }

                this.props.action.onFocusElement(this.props.resource, nextElement);
            }
        }

    }

    _onCancel() {
        this.props.action.onCancelSettingCounter(this.props.resource);
    }

    _onSave() {
        const { post, resource } = this.props;
        this.props.action.onSettingCounter(resource, post);
    }

    _handleCounterChange(e, maskedValue, floatValue) {
        this.props.action.onChangeCounter(this.props.resource, { name: 'start_counter', value: floatValue });
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { settingCounter, focusElement } = state.default.module;

    return {
        show: settingCounter.show,
        focusElement,
        post: settingCounter.post
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onFocusElement: moduleActions.onFocusElement,
            onSettingCounter: action.settingCounter.request,
            onChangeCounter: action.onChangeCounter,
            onCancelSettingCounter: action.onCancelSettingCounter
        }, dispatch)
    }
}

SettingCounter.propTypes = {
    show: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    focusElement: PropTypes.string,
    t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingCounter);
