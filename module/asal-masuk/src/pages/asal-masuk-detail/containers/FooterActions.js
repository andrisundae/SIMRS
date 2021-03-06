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
  ImportButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';
import { isGranted } from '@simrs/main/src/modules/auth';
import {
  moduleActions,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/nested';
import actions from '../actions';

class FooterActions extends Component {
  constructor(props) {
    super(props);

    this._onAdd = this._onAdd.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onImport = this._onImport.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.add = createRef();
    this.edit = createRef();
    this.delete = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.import = createRef();
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

    if (
      prevProps.isImportDetailShowing !== this.props.isImportDetailShowing &&
      !this.props.isImportDetailShowing
    ) {
      this._bindKey();
    } else if (
      !prevProps.isImportDetailShowing &&
      !this.props.isImportDetailShowing
    ) {
      this._bindKey();
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
    MouseTrap.unbind('alt+i');
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

    MouseTrap.bindGlobal('alt+i', function (e) {
      e.preventDefault();
      if (_this._isCanImport()) {
        _this._onImport();
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

  _isCanImport() {
    let { statusForm, customPermissions } = this.props;
    let isValid = false;
    if (
      customPermissions.canImport &&
      (statusForm === moduleActionTypes.READY ||
        statusForm === moduleActionTypes.CANCEL ||
        statusForm === moduleActionTypes.SELECTED)
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
    const { t, resource, action, post } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, this.props.subResource, post),
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

  _onImport() {
    this.props.action.onImport(this.props.resource, this.props.subResource);
  }

  _onFocusElement(e) {
    if (e.which === 37 || e.which === 39) {
      e.preventDefault();

      const { name } = e.target;
      const { canEdit, canImport, canAdd } = this.props.customPermissions;

      let nextElement = '';
      switch (name) {
        case 'add':
          if (this.props.selectedRow && canEdit) {
            nextElement = 'edit';
          } else {
            if (canImport) {
              nextElement = 'import';
            }
          }
          break;
        case 'edit':
          if (this.props.selectedRow && canEdit) {
            nextElement = 'delete';
          }
          break;
        case 'delete':
          if (canImport) {
            nextElement = 'import';
          } else {
            if (canAdd) {
              nextElement = 'add';
            }
          }
          break;
        case 'save':
          nextElement = 'cancel';
          break;
        case 'cancel':
          nextElement = 'save';
          break;
        case 'import':
          if (canAdd) {
            nextElement = 'add';
          }
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
          {this._isCanImport() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <ImportButton
                onClick={this._onImport}
                inputRef={this.import}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
        </div>
      </FooterActionsContainer>
    );
  }
}

const mapStateToProps = function (state, props) {
  const {
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
    importDetail,
    saveSuccess,
  } = state.nested.module;

  return {
    customPermissions: {
      canAdd: isGranted(props.permissions, 'tambah_detail'),
      canEdit: isGranted(props.permissions, 'koreksi_detail'),
      canDelete: isGranted(props.permissions, 'hapus_detail'),
      canImport: isGranted(props.permissions, 'import_detail'),
    },
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
    importDetail,
    isImportDetailShowing: importDetail.show,
    saveSuccess,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...moduleActions,
        onSave: moduleActions.save.request,
        onDelete: moduleActions.delete.request,
        onImport: actions.onImport,
        onSaveImportDetail: actions.importDetail.request,
        onCancelImportDetail: actions.onCancelImportDetail,
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
  subResource: PropTypes.string.isRequired,
  reference: PropTypes.object,
  importDetail: PropTypes.object,
  saveSuccess: PropTypes.bool,
  appActions: PropTypes.object,
  t: PropTypes.func,
  isImportDetailShowing: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
