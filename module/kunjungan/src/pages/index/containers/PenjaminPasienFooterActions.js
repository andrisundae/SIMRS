import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  SaveButton,
  EditButton,
  DeleteButton,
  CancelButton,
  AddButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';

import * as actions from '../redux/penjaminPasienActions';
import * as actionTypes from '../redux/penjaminPasienActionTypes';

class PenjamninPasienFooterActions extends Component {
  constructor(props) {
    super(props);

    this.add = createRef();
    this.edit = createRef();
    this.delete = createRef();
    this.cancel = createRef();
    this.save = createRef();
  }

  componentDidMount() {
    this.bindKey();
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
    this.unbindKey();
  }

  onSave = () => {
    const data = {
      ...this.props.post,
      id_pasien: this.props.idPasien,
      norm: this.props.norm,
    };
    this.props.action.onSave(this.props.resource, data);
  };

  onAdd = () => {
    this.props.action.onAdd(this.props.resource);
    this.props.appContext.toggleMainMenu();
  };

  onCancel = () => {
    this.props.action.onCancel(this.props.resource);
    this.props.appContext.toggleMainMenu();
  };

  onEdit = () => {
    this.props.action.onEdit(this.props.resource, this.props.post);
    this.props.appContext.toggleMainMenu();
  };

  onDelete = () => {
    const { t, resource, action, post } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, post),
    });
  };

  isCanAdd = () => {
    let { permissions, statusForm } = this.props;
    let isValid = false;
    if (
      permissions.canAdd &&
      (statusForm === actionTypes.READY_PENJAMIN_PASIEN ||
        statusForm === actionTypes.CANCEL_PENJAMIN_PASIEN ||
        statusForm === actionTypes.SELECTED_PENJAMIN_PASIEN)
    ) {
      isValid = true;
    }

    return isValid;
  };

  isCanEdit = () => {
    let { permissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      permissions.canEdit &&
      selectedRow &&
      (statusForm === actionTypes.CANCEL_PENJAMIN_PASIEN ||
        statusForm === actionTypes.SELECTED_PENJAMIN_PASIEN)
    ) {
      isValid = true;
    }

    return isValid;
  };

  isCanDelete = () => {
    let { permissions, statusForm, selectedRow } = this.props;
    let isValid = false;
    if (
      permissions.canDelete &&
      selectedRow &&
      (statusForm === actionTypes.CANCEL_PENJAMIN_PASIEN ||
        statusForm === actionTypes.SELECTED_PENJAMIN_PASIEN)
    ) {
      isValid = true;
    }

    return isValid;
  };

  isCanSave = () => {
    let { permissions, statusForm } = this.props;
    let isValid = false;
    if (
      (permissions.canAdd || permissions.canEdit) &&
      (statusForm === actionTypes.ADD_PENJAMIN_PASIEN ||
        statusForm === actionTypes.EDIT_PENJAMIN_PASIEN)
    ) {
      isValid = true;
    }

    return isValid;
  };

  isCanCancel = () => {
    let { statusForm } = this.props;
    let isValid = false;
    if (
      statusForm === actionTypes.ADD_PENJAMIN_PASIEN ||
      statusForm === actionTypes.EDIT_PENJAMIN_PASIEN
    ) {
      isValid = true;
    }

    return isValid;
  };

  unbindKey() {
    MouseTrap.unbind('alt+t');
    MouseTrap.unbind('alt+k');
    MouseTrap.unbind('alt+h');
    MouseTrap.unbind('alt+s');
    MouseTrap.unbind('alt+b');
  }

  bindKey() {
    let _this = this;

    MouseTrap.bindGlobal('alt+t', function (e) {
      e.preventDefault();
      if (_this.isCanAdd()) {
        _this.add.current.focus();
        _this.onAdd();
      }
    });

    MouseTrap.bindGlobal('alt+k', function (e) {
      e.preventDefault();
      if (_this.isCanEdit()) {
        _this.edit.current.focus();
        _this.onEdit();
      }
    });

    MouseTrap.bindGlobal('alt+h', function (e) {
      e.preventDefault();
      if (_this.isCanDelete()) {
        _this.delete.current.focus();
        _this.onDelete();
      }
    });

    MouseTrap.bindGlobal('alt+s', function (e) {
      e.preventDefault();
      if (_this.isCanSave()) {
        _this.onSave();
      }
    });

    MouseTrap.bindGlobal(['alt+b', 'esc'], function (e) {
      e.preventDefault();
      if (_this.isCanCancel()) {
        _this.onCancel();
      }
    });
  }

  render() {
    return (
      <FooterActionsContainer>
        <Fragment>
          {this.isCanAdd() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <AddButton
                onClick={this.onAdd}
                inputRef={this.add}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this.onEdit}
                inputRef={this.edit}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanDelete() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <DeleteButton
                onClick={this.onDelete}
                inputRef={this.delete}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanSave() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <SaveButton
                onClick={this.onSave}
                inputRef={this.save}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanCancel() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <CancelButton
                onClick={this.onCancel}
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

const mapStateToProps = function (state) {
  const {
    post,
    focusElement,
    statusForm,
    permissions,
    selectedRow,
  } = state.module.penjaminPasien;
  const { post: postKunjungan } = state.module.kunjungan;

  return {
    permissions: getPermissions(permissions),
    post,
    focusElement,
    statusForm,
    idPasien: postKunjungan.id_pasien,
    norm: postKunjungan.norm,
    selectedRow,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSave: actions.save.request,
        onDelete: actions.deletePenjamin.request,
        onAdd: actions.onAdd,
        onEdit: actions.onEdit,
        onCancel: actions.onCancel,
        onFocusElement: actions.onFocusElement,
      },
      dispatch
    ),
  };
};

PenjamninPasienFooterActions.propTypes = {
  permissions: PropTypes.object,
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
  statusForm: PropTypes.string,
  appContext: PropTypes.object,
  selectedRow: PropTypes.number,
  idPasien: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  norm: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(PenjamninPasienFooterActions));
