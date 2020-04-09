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
  DuplicationButton,
  confirmation,
} from '@simrs/components';
import { isGranted } from '@simrs/main/src/modules/auth';
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
    this._onDuplication = this._onDuplication.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.add = createRef();
    this.edit = createRef();
    this.delete = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.duplication = createRef();
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
          {this._isCanDuplication() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <DuplicationButton
                onClick={this._onDuplication}
                inputRef={this.duplication}
                onKeyDown={this._onFocusElement}
              />
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
    MouseTrap.unbind('alt+d');
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

    MouseTrap.bindGlobal('alt+d', function (e) {
      e.preventDefault();
      if (_this._isCanDuplication()) {
        _this.duplication.current.focus();
        _this._onDuplication();
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

  _isCanDuplication() {
    let { customPermissions, statusForm, selectedRow, post } = this.props;
    let isValid = false;
    if (
      customPermissions.canDuplication &&
      selectedRow &&
      !post.id_versi_tarif_asal &&
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

  _onDuplication() {
    this.props.action.onDuplication(this.props.resource, this.props.post);
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
          if (this.props.post.id_versi_tarif_asal) {
            nextElement = 'duplication';
          } else {
            nextElement = 'add';
          }
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
    }
  }
}

const mapStateToProps = function (state, props) {
  const { module } = state.default;

  return {
    customPermissions: {
      canAdd: isGranted(props.permissions, 'tambah'),
      canEdit: isGranted(props.permissions, 'koreksi'),
      canDelete: isGranted(props.permissions, 'hapus'),
      canDuplication: isGranted(props.permissions, 'duplikasi'),
    },
    statusForm: module.statusForm,
    selectedRow: module.selectedRow,
    post: module.post,
    focusElement: module.focusElement,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...moduleActions,
        onSave: moduleActions.save.request,
        onDelete: moduleActions.delete.request,
        onDuplication: actions.onDuplication,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
