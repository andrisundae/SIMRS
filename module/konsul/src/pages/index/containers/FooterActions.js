import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  AddButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  confirmation,
  withAppConsumer,
  FinishButton,
} from '@simrs/components';
import { isGranted } from '@simrs/main/src/modules/auth';
import actions from '../redux/actions';
import { disabledElement } from '../redux/selector';

class FooterActions extends Component {
  constructor(props) {
    super(props);

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
    const { focusElement } = this.props;

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

  isCanAdd = () => {
    const { customPermissions, disabledActions } = this.props;
    let isValid = false;
    if (customPermissions.canAdd && !disabledActions.add) {
      isValid = true;
    }

    return isValid;
  };

  isCanFinish = () => {
    const { disabledActions } = this.props;
    return !disabledActions.finish;
  };

  isCanEdit = () => {
    const { customPermissions, disabledActions, selectedRow } = this.props;
    let isValid = false;
    if (customPermissions.canEdit && selectedRow && !disabledActions.edit) {
      isValid = true;
    }

    return isValid;
  };

  isCanDelete = () => {
    const {
      customPermissions,
      selectedRow,
      disabledActions,
      data,
    } = this.props;
    let isValid = false;
    if (customPermissions.canDelete && selectedRow && !disabledActions.delete) {
      isValid = true;
    }

    return isValid;
  };

  isCanSave = () => {
    let { customPermissions, disabledActions } = this.props;
    let isValid = false;
    if (
      (customPermissions.canAdd || customPermissions.canEdit) &&
      !disabledActions.save
    ) {
      isValid = true;
    }

    return isValid;
  };

  isCanCancel() {
    const { disabledActions } = this.props;
    return !disabledActions.cancel;
  }

  onAdd = () => {
    this.props.action.onAdd(this.props.resource);
    this.props.appActions.deactivateMainMenu();
  };

  onEdit = () => {
    this.props.action.onEdit(this.props.resource);
    this.props.appActions.deactivateMainMenu();
  };

  onDelete = () => {
    const { t, resource, action, selectedRow } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, { id: selectedRow }),
    });
  };

  onSave = () => {
    const { post, kunjungan, customPermissions } = this.props;
    const payload = {
      id_kunjungan: kunjungan.id,
      id_kunjungan_unit_asal: kunjungan.id_kunjungan_unit,
      tgl_lahir: kunjungan.tgl_lahir,
      id_unit_layanan: post.id_unit_layanan,
      id_tindakan: post.id_tindakan,
      id_kelas: post.id_kelas,
      id_kelompok: post.id_kelompok,
      id_instalasi: post.id_instalasi,
    };
    if (customPermissions.canUpdateTglKonsul) {
      const jamMulai = dayjs(post.jam_mulai).format('HH:mm');
      payload.tgl_mulai = dayjs(post.tgl_mulai).format(
        `YYYY-MM-DD ${jamMulai}:ss`
      );
    }
    this.props.action.onSave(this.props.resource, payload);
  };

  onCancel = () => {
    this.props.action.onCancel(this.props.resource);
    this.props.appActions.activateMainMenu();
  };

  onFinish = () => {
    this.props.action.onFinish(this.props.resource);
  };

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
          {/* {this.isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this.onEdit}
                inputRef={this.edit}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )} */}
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
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
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
          {this.isCanFinish() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FinishButton
                onClick={this.onFinish}
                inputRef={this.finish}
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
  const module = state.default;
  return {
    customPermissions: {
      canAdd: isGranted(props.permissions, 'tambah'),
      canEdit: isGranted(props.permissions, 'koreksi'),
      canDelete: isGranted(props.permissions, 'hapus'),
      canUpdateTglKonsul: isGranted(
        props.permissions,
        'koreksi_tanggal_konsul'
      ),
    },
    statusForm: module.statusForm,
    selectedRow: module.selectedRow,
    post: module.post,
    kunjungan: module.kunjungan,
    focusElement: module.focusElement,
    saveSuccess: module.saveSuccess,
    disabledActions: {
      add: disabledElement(state, 'add'),
      edit: disabledElement(state, 'edit'),
      delete: disabledElement(state, 'delete'),
      finish: disabledElement(state, 'finish'),
      cancel: disabledElement(state, 'cancel'),
      save: disabledElement(state, 'save'),
    },
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSave: actions.save.request,
        onDelete: actions.delete.request,
        onAdd: actions.onAdd,
        onCancel: actions.onCancel,
        onEdit: actions.onEdit,
        onFinish: actions.onFinish,
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
  isDuplicationShowing: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  appActions: PropTypes.object,
  t: PropTypes.func,
  saveSuccess: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
