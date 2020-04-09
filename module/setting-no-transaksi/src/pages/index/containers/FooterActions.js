import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import { Icon, Button } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import {
  FooterActionsContainer,
  AddButton,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  confirmation,
} from '@simrs/components';
import { getPermissions, isGranted } from '@simrs/main/src/modules/auth';
import {
  moduleActions,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/default';
import actions from '../actions';

class FooterActions extends Component {
  constructor(props) {
    super(props);

    this._onAdd = this._onAdd.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onSettingCounter = this._onSettingCounter.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);

    this.add = createRef();
    this.edit = createRef();
    this.delete = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.settingCounter = createRef();
  }

  render() {
    return (
      <FooterActionsContainer>
        <Fragment>
          {this._isCanAdd() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <AddButton
                as="a"
                onClick={this._onAdd}
                inputRef={this.add}
                onKeyDown={this.keyDownHandler}
              />
            </Menu.Item>
          )}
          {this._isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this._onEdit}
                inputRef={this.edit}
                onKeyDown={this.keyDownHandler}
              />
            </Menu.Item>
          )}
          {this._isCanDelete() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <DeleteButton
                onClick={this._onDelete}
                inputRef={this.delete}
                onKeyDown={this.keyDownHandler}
              />
            </Menu.Item>
          )}
          {this._isCanSave() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <SaveButton
                tabIndex={-1}
                as="a"
                onClick={this._onSave}
                inputRef={this.save}
                onKeyDown={this.keyDownHandler}
              />
            </Menu.Item>
          )}
          {this._isCanCancel() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <CancelButton
                tabIndex={-1}
                as="a"
                onClick={this._onCancel}
                inputRef={this.cancel}
                onKeyDown={this.keyDownHandler}
              />
            </Menu.Item>
          )}
          {this._isCanSettingCounter() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Button
                ref={this.settingCounter}
                name="setting_counter"
                color="green"
                size="mini"
                onClick={this._onSettingCounter}
                onKeyDown={this.keyDownHandler}
              >
                <Icon name="setting" />
                <Trans
                  i18nKey={`${this.props.resource}:action.setting_counter`}
                />
              </Button>
            </Menu.Item>
          )}
        </Fragment>
      </FooterActionsContainer>
    );
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
    MouseTrap.unbind('alt+t');
    MouseTrap.unbind('alt+k');
    MouseTrap.unbind('alt+h');
    MouseTrap.unbind('alt+s');
    MouseTrap.unbind('alt+b');
    MouseTrap.unbind('esc');
  }

  _bindKey() {
    let _this = this;

    MouseTrap.bindGlobal('alt+t', function (e) {
      e.preventDefault();
      if (_this._isCanAdd()) {
        _this.add.current.focus();
        _this._onAdd();
      }
    });

    MouseTrap.bindGlobal('alt+k', function (e) {
      e.preventDefault();
      if (_this._isCanEdit()) {
        _this.edit.current.focus();
        _this._onEdit();
      }
    });

    MouseTrap.bindGlobal('alt+h', function (e) {
      e.preventDefault();
      if (_this._isCanDelete()) {
        _this.delete.current.focus();
        _this._onDelete();
      }
    });

    MouseTrap.bindGlobal('alt+s', function (e) {
      e.preventDefault();
      let { statusForm, settingCounter, resource } = _this.props;
      if (settingCounter.show === true) {
        _this.props.action.onSaveSettingCounter(resource, settingCounter.post);
      } else {
        if (
          statusForm === moduleActionTypes.READY ||
          statusForm === moduleActionTypes.CANCEL ||
          statusForm === moduleActionTypes.SELECTED
        ) {
          if (_this._isCanSettingCounter()) {
            _this._onSettingCounter();
          }
        } else {
          if (_this._isCanSave()) {
            _this._onSave();
          }
        }
      }
    });

    MouseTrap.bindGlobal(['alt+b', 'esc'], function (e) {
      e.preventDefault();
      if (_this.props.settingCounter.show === true) {
        _this.props.action.onCancelSettingCounter(_this.props.resource);
      } else {
        if (_this._isCanCancel()) {
          _this._onCancel();
        }
      }
    });
  }

  _isCanAdd() {
    let { customPermissions, statusForm } = this.props;
    let isValid = false;
    if (
      customPermissions.canAdd &&
      (statusForm === moduleActionTypes.READY ||
        statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanEdit() {
    let { customPermissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      customPermissions.canEdit &&
      selectedRow &&
      (statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanDelete() {
    let { customPermissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      customPermissions.canDelete &&
      selectedRow &&
      (statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanSave() {
    let { customPermissions, statusForm } = this.props;
    let isValid = false;
    if (
      (customPermissions.canAdd || customPermissions.canEdit) &&
      (statusForm === moduleActionTypes.ADD ||
        statusForm === moduleActionTypes.EDIT)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanCancel() {
    let { statusForm } = this.props;
    let isValid = false;
    if (
      statusForm === moduleActionTypes.ADD ||
      statusForm === moduleActionTypes.EDIT
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanSettingCounter() {
    let { customPermissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      customPermissions.canSettingCounter &&
      selectedRow &&
      (statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _onAdd() {
    this.props.action.onAdd(this.props.resource);
    ipcRenderer.send('disable-header');
  }

  _onEdit() {
    this.props.action.onEdit(this.props.resource);
    ipcRenderer.send('disable-header');
  }

  _onDelete() {
    const { t, resource, action, post } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, post),
    });
  }

  _onSave() {
    this.props.action.onSave(this.props.resource, this.props.post);
  }

  _onCancel() {
    this.props.action.onCancel(this.props.resource);
    ipcRenderer.send('enable-header');
  }

  _onSettingCounter() {
    this.props.action.onSettingCounter(this.props.resource);
  }

  keyDownHandler(e) {
    let { name } = e.target;
    if (e.which === 37 || e.which === 39) {
      e.preventDefault();
      let nextElement = '';
      switch (name) {
        case 'add':
          if (this.props.post.id) {
            nextElement = 'settingCounter';
          } else {
            nextElement = 'add';
          }
          break;
        case 'edit':
          nextElement = 'delete';
          break;
        case 'delete':
          nextElement = 'add';
          break;
        case 'save':
          nextElement = 'cancel';
          break;
        case 'cancel':
          nextElement = 'save';
          break;
        case 'duplication':
          nextElement = 'add';
          break;
        default:
          nextElement = '';
          break;
      }

      this.props.action.onFocusElement(this.props.resource, nextElement);
    } else if (e.which === 13) {
      if (name === 'save') {
        this._onSave();
      } else if (name === 'cancel') {
        this._onCancel();
      }
    }
  }
}

const mapStateToProps = function (state, props) {
  const {
    statusForm,
    selectedRow,
    post,
    focusElement,
    settingCounter,
  } = state.default.module;

  return {
    customPermissions: {
      ...getPermissions(props.permissions),
      canSettingCounter: isGranted(props.permissions, 'setting_counter'),
    },
    statusForm,
    selectedRow,
    post,
    focusElement,
    settingCounter,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...moduleActions,
        onSave: moduleActions.save.request,
        onDelete: moduleActions.delete.request,
        onSettingCounter: actions.onSettingCounter,
        onCancelSettingCounter: actions.onCancelSettingCounter,
        onSaveSettingCounter: actions.settingCounter.request,
      },
      dispatch
    ),
  };
};

FooterActions.propTypes = {
  permissions: PropTypes.array,
  customPermissions: PropTypes.object,
  action: PropTypes.object,
  statusForm: PropTypes.string,
  selectedRow: PropTypes.number,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  reference: PropTypes.object,
  settingCounter: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
