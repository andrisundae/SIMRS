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
  EditButton,
  SaveButton,
  CancelButton,
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

    this.edit = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.finish = createRef();
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
    MouseTrap.unbind('alt+k');
    MouseTrap.unbind('alt+s');
    MouseTrap.unbind('alt+b');
  }

  _bindKey() {
    let _this = this;

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

  isCanEdit = () => {
    const { customPermissions, disabledActions, post } = this.props;
    let isValid = false;
    if (customPermissions.canEdit && post.id && !disabledActions.edit) {
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

  isCanFinish = () => {
    const { disabledActions } = this.props;
    return !disabledActions.finish;
  };

  onEdit = () => {
    this.props.action.onEdit(this.props.resource);
    this.props.appActions.deactivateMainMenu();
  };

  onSave = () => {
    const { post } = this.props;
    const payload = {
      id: post.id,
      norm: post.norm,
      nama: post.nama,
      nama_panggilan: post.nama_panggilan,
      id_jenis_kelamin: post.id_jenis_kelamin,
      no_ktp: post.no_ktp,
      nama_ortu: post.nama_ortu,
      nama_suami_istri: post.nama_suami_istri,
      tgl_lahir: dayjs(post.tgl_lahir).format('YYYY-MM-DD'),
      alamat: post.alamat,
      rt: post.rt,
      rw: post.rw,
      id_desa: post.id_desa,
      id_agama: post.id_agama,
      id_pendidikan: post.id_pendidikan,
      id_pekerjaan: post.id_pekerjaan,
      id_status_nikah: post.id_status_nikah,
      id_kewarganegaraan: post.id_kewarganegaraan,
      id_bahasa_sehari_hari: post.id_bahasa_sehari_hari,
      nilai_kepercayaan: post.nilai_kepercayaan,
    };
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
        case 'edit':
          nextElement = 'finish';
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
          {this.isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this.onEdit}
                inputRef={this.edit}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this.isCanFinish() && (
            <Menu.Item style={{ paddingLeft: 5 }}>
              <FinishButton
                onClick={this.onFinish}
                inputRef={this.finish}
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
        </Fragment>
      </FooterActionsContainer>
    );
  }
}

const mapStateToProps = function (state, props) {
  const module = state.default;
  return {
    customPermissions: {
      canEdit: isGranted(props.permissions, 'koreksi'),
    },
    statusForm: module.statusForm,
    post: module.post,
    focusElement: module.focusElement,
    saveSuccess: module.saveSuccess,
    disabledActions: {
      edit: disabledElement(state, 'edit'),
      cancel: disabledElement(state, 'cancel'),
      save: disabledElement(state, 'save'),
      finish: disabledElement(state, 'finish'),
    },
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSave: actions.save.request,
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
