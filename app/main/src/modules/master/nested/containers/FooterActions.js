import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

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
import { getPermissions } from '../../../auth';
import { moduleActions as actions } from '../actions';
import { moduleActionTypes } from '../actionTypes';

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

  render() {
    return (
      <FooterActionsContainer>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            backgroundColor: '#1b1c1d',
            bottom: 0,
          }}
        >
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
        </div>
      </FooterActionsContainer>
    );
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
    this._bindKey();
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
    let { permissions, statusForm } = this.props;
    let isValid = false;
    if (
      permissions.canAdd &&
      (statusForm === moduleActionTypes.READY ||
        statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanEdit() {
    let { permissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      permissions.canEdit &&
      selectedRow &&
      (statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanDelete() {
    let { permissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      permissions.canDelete &&
      selectedRow &&
      (statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanSave() {
    let { permissions, statusForm } = this.props;
    let isValid = false;
    if (
      (permissions.canAdd || permissions.canEdit) &&
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

  _onAdd() {
    this.props.action.onAdd(this.props.resource, this.props.subResource);
    this.props.appActions.deactivateMainMenu();
  }

  _onEdit() {
    this.props.action.onEdit(this.props.resource, this.props.subResource);
    this.props.appActions.deactivateMainMenu();
  }

  _onDelete() {
    const { t, resource, action, subResource, post } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, subResource, post),
    });
  }

  _onSave() {
    let { resource, subResource, post, reference } = this.props;
    this.props.action.onSave(resource, subResource, { ...post, ...reference });
  }

  _onCancel() {
    this.props.action.onCancel(this.props.resource, this.props.subResource);
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

      this.props.action.onFocusElement(
        this.props.resource,
        this.props.subResource,
        nextElement
      );
    }
  }
}

const mapStateToProps = function (state, props) {
  const {
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
    saveSuccess,
  } = state.nested.module;

  return {
    permissions: props.permissions || getPermissions(state.acl),
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
    saveSuccess,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...actions,
        onSave: actions.save.request,
        onDelete: actions.delete.request,
      },
      dispatch
    ),
  };
};

FooterActions.propTypes = {
  permissions: PropTypes.object,
  action: PropTypes.object,
  statusForm: PropTypes.string,
  selectedRow: PropTypes.number,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  subResource: PropTypes.string.isRequired,
  reference: PropTypes.object,
};

FooterActions.defaultProps = {
  reference: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
