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
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';

import * as actions from '../redux/penjaminPasienActions';
import * as actionTypes from '../redux/penjaminPasienActionTypes';

class PenjamninPasienFooterActions extends Component {
  constructor(props) {
    super(props);

    this._onSave = this._onSave.bind(this);
    this.save = createRef();
  }

  _onSave() {
    this.props.action.onSave(this.props.resource, this.props.post);
  }

  onAdd = () => {
    this.props.action.onAdd(this.props.resource);
  };

  onCancel = () => {
    this.props.action.onCancel(this.props.resource);
  };

  onEdit = () => {};

  onDelete = () => {
    const { t, resource, action, post } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () =>
        action.onCheckDelete(resource, {
          id: post.id,
          idKunjunganUnit: post.id_kunjungan_unit,
        }),
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
                onClick={this._onDelete}
                inputRef={this.delete}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanSave() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <SaveButton
                onClick={this._onSave}
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
    MouseTrap.unbind('alt+s');
  }

  _bindKey() {
    let _this = this;

    MouseTrap.bindGlobal('alt+s', function (e) {
      e.preventDefault();
      if (_this._isCanSave()) {
        _this._onSave();
      }
    });
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    focusElement,
    statusForm,
    permissions,
  } = state.module.penjaminPasien;

  return {
    permissions: getPermissions(permissions),
    post,
    focusElement,
    statusForm,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        // onSave: actions.save.request,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PenjamninPasienFooterActions);
