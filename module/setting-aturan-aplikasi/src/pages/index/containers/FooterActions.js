import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';

import {
    FooterActionsContainer,
    SaveButton,
    EditButton,
    CancelButton,
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';
import actions from '../actions';
import actionTypes from '../actionTypes';

class FooterActions extends Component {
    constructor(props) {
        super(props);

        this._onSave = this._onSave.bind(this);
        this._onEdit = this._onEdit.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.save = createRef();
        this.edit = createRef();
        this.cancel = createRef();
    }

    render() {
        return (
            <FooterActionsContainer>
                <Fragment>
                    {this._isCanEdit() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <EditButton
                            onClick={this._onEdit}
                            inputRef={this.edit}
                            onKeyDown={this._onFocusElement}
                        />
                        </Menu.Item>
                    }
                    {this._isCanSave() &&
                        <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
                        <SaveButton
                            onClick={this._onSave}
                            inputRef={this.save}
                            onKeyDown={this._onFocusElement}
                        />
                        </Menu.Item>
                    }
                    {this._isCanCancel() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <CancelButton
                            onClick={this._onCancel}
                            inputRef={this.cancel}
                            onKeyDown={this._onFocusElement}
                        />
                        </Menu.Item>
                    }
                </Fragment>
            </FooterActionsContainer>
        )
    }

    componentDidMount() {
        this._bindKey();
    }

    componentDidUpdate() {
        let { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("alt+k");
        MouseTrap.unbind("alt+s");
        MouseTrap.unbind("alt+b");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+k', function (e) {
            e.preventDefault();
            if (_this._isCanEdit()) {
                _this.edit.current.focus();
                _this._onEdit();
            }
        });

        MouseTrap.bindGlobal('alt+s', function (e) {
            e.preventDefault();
            if (_this._isCanSave()) {
                _this._onSave();
            }
        });

        MouseTrap.bindGlobal(['alt+b', 'esc'], function (e) {
            e.preventDefault();
            if (_this._isCanCancel()) {
                _this._onCancel();
            }
        });
    }

    _isCanEdit() {
        let { permissions, statusForm } = this.props;
        let isValid = false;
        if (permissions.canEdit && (statusForm === actionTypes.CANCEL || statusForm === actionTypes.READY)
        ) {
            isValid = true;
        }

        return isValid;
    }

    _isCanSave() {
        let { permissions, statusForm } = this.props;
        let isValid = false;
        if (permissions.canEdit && statusForm === actionTypes.EDIT) {
            isValid = true;
        }

        return isValid;
    }

    _isCanCancel() {
        let { statusForm } = this.props;
        let isValid = false;
        if (statusForm === actionTypes.EDIT) {
            isValid = true;
        }

        return isValid;
    }

    _onEdit() {
        this.props.action.onEdit(this.props.resource);
        ipcRenderer.send('disable-header');
    }


    _onSave() {
        this.props.action.onSave(this.props.resource, this.props.post);
    }

    _onCancel() {
        this.props.action.onCancel(this.props.resource);
        ipcRenderer.send('enable-header');
    }

    _onFocusElement(e) {
        if (e.which === 37 || e.which === 39) {
            e.preventDefault();

            let { name } = e.target;

            let nextElement = '';
            switch (name) {
                case 'save':
                    nextElement = 'cancel';
                    break;
                case 'cancel':
                    nextElement = 'save';
                    break;
                default:
                    nextElement= '';
                    break;
            }

            this.props.action.onFocusElement(this.props.resource, nextElement);
        }
    }

}

const mapStateToProps = function (state) {
    const { statusForm, post, focusElement } = state.module;

    return {
        permissions: getPermissions(state.acl),
        statusForm,
        post,
        focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                onSave: actions.save.request,
                onEdit: actions.onEdit,
                onCancel: actions.onCancel,
                onFocusElement: actions.onFocusElement
            },
            dispatch
        ),
    }
}

FooterActions.propTypes = {
    permissions: PropTypes.object,
    action: PropTypes.object,
    statusForm: PropTypes.string,
    post: PropTypes.object,
    focusElement: PropTypes.string,
    resource: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
