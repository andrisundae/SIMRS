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
  AddButton,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';
import { toastr } from '@simrs/common';
import { getPermissions } from '@simrs/main/src/modules/auth';
import actions from '../actions';
import actionTypes from '../actionTypes';

class FooterActions extends Component {
  constructor(props) {
    super(props);

    this._onAdd = this._onAdd.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.add = createRef();
    this.edit = createRef();
    this.delete = createRef();
    this.cancel = createRef();
    this.save = createRef();
  }

  componentDidMount() {
    this._bindKey();
  }

  componentDidUpdate(prevProps) {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }

    if (prevProps.saveSuccess !== this.props.saveSuccess) {
      if (this.props.saveSuccess) {
        this.props.appActions.activateMainMenu();
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

  _isCanAdd() {
    let { customPermissions, statusForm } = this.props;
    let isValid = false;
    if (
      customPermissions.canAdd &&
      (statusForm === actionTypes.READY ||
        statusForm === actionTypes.CANCEL ||
        statusForm === actionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanEdit() {
    let { customPermissions, statusForm, selectedKeys } = this.props;
    let isValid = false;
    if (
      customPermissions.canEdit &&
      selectedKeys.length > 0 &&
      (statusForm === actionTypes.CANCEL ||
        statusForm === actionTypes.READY ||
        statusForm === actionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanDelete() {
    let { customPermissions, statusForm, selectedKeys } = this.props;
    let isValid = false;
    if (
      customPermissions.canDelete &&
      selectedKeys.length > 0 &&
      (statusForm === actionTypes.CANCEL ||
        statusForm === actionTypes.READY ||
        statusForm === actionTypes.SELECTED)
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
      (statusForm === actionTypes.ADD || statusForm === actionTypes.EDIT)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanCancel() {
    let { statusForm } = this.props;
    let isValid = false;
    if (statusForm === actionTypes.ADD || statusForm === actionTypes.EDIT) {
      isValid = true;
    }

    return isValid;
  }

  _onAdd() {
    if (this.props.selectedKeys.length > 0) {
      this.props.action.onAdd(this.props.resource);
      this.props.appActions.deactivateMainMenu();
    } else {
      toastr.warning('Menu parent belum dipilih!');
    }
  }

  _onEdit() {
    this.props.action.onEdit(this.props.resource);
    this.props.appActions.deactivateMainMenu();
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
    this.props.appActions.activateMainMenu();
  }

  _onFocusElement(e) {
    if (e.which === 37 || e.which === 39) {
      e.preventDefault();

      let { name } = e.target;

      let nextElement = '';
      switch (name) {
        case 'add':
          nextElement = 'edit';
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
        default:
          nextElement = '';
          break;
      }

      this.props.action.onFocusElement(this.props.resource, nextElement);
    }
  }

  render() {
    return (
      <FooterActionsContainer>
        <Fragment>
          {this._isCanAdd() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <AddButton
                onClick={this._onAdd}
                inputRef={this.add}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this._isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this._onEdit}
                inputRef={this.edit}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this._isCanDelete() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <DeleteButton
                onClick={this._onDelete}
                inputRef={this.delete}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this._isCanSave() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <SaveButton
                onClick={this._onSave}
                inputRef={this.save}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this._isCanCancel() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <CancelButton
                onClick={this._onCancel}
                inputRef={this.cancel}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
        </Fragment>
      </FooterActionsContainer>
    );
  }
}

const mapStateToProps = function (state, props) {
  const { statusForm, post, data, focusElement, saveSuccess } = state.module;

  return {
    customPermissions: getPermissions(props.permissions),
    statusForm,
    post,
    focusElement,
    selectedKeys: data.selectedKeys,
    saveSuccess,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onAdd: actions.onAdd,
        onCancel: actions.onCancel,
        onEdit: actions.onEdit,
        onSave: actions.save.request,
        onDelete: actions.delete.request,
        onFocusElement: actions.onFocusElement,
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
  saveSuccess: PropTypes.bool,
  appActions: PropTypes.object,
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
