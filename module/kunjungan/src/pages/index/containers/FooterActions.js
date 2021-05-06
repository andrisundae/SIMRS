import React, { PureComponent, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu, Button, Icon } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  SaveButton,
  EditButton,
  DeleteButton,
  CancelButton,
  AddButton,
  FinishButton,
  PrintButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';

import { isDisable } from '../redux/selectors';
import actions from '../redux/actions';

class FooterActions extends PureComponent {
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

  componentDidUpdate(prevProps) {
    let { focusElement, appActions } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }

    if (prevProps.saveSuccess !== this.props.saveSuccess) {
      if (this.props.saveSuccess) {
        appActions.activateMainMenu();
      }
    }
  }

  componentWillUnmount() {
    this.unbindKey();
  }

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

  onSave = () => {
    // if (this.props.post.id_pasien) {
    //   this.props.action.onCheckSave(this.props.resource, {
    //     idPasien: this.props.post.id_pasien,
    //     idUnitLayanan: this.props.post.id_unit_layanan,
    //     callBack: () =>
    //       this.props.action.onSave(this.props.resource, this.props.post),
    //   });
    // } else {
    //   this.props.action.onSave(this.props.resource, this.props.post);
    // }
    this.props.action.onSave(this.props.resource, this.props.post);
  };

  onAdd = () => {
    if (this.props.post.id_pasien) {
      this.props.action.onCheckAdd(this.props.resource, {
        idPasien: this.props.post.id_pasien,
        idUnitLayanan: this.props.post.id_unit_layanan,
        callBack: () =>
          this.props.action.onAddWithSelected(this.props.resource),
        cancelCallBack: () => this.props.appActions.activateMainMenu(),
      });
    } else {
      this.props.action.onAdd(this.props.resource);
    }
    this.props.appActions.deactivateMainMenu();
  };

  onCancel = () => {
    if (this.props.post.id_pasien) {
      this.props.action.onCancelWithSelected(this.props.resource);
    } else {
      this.props.action.onCancel(this.props.resource);
    }
    this.props.appActions.activateMainMenu();
  };

  onFinish = () => {
    this.props.action.onFinish(this.props.resource);
    this.props.appActions.activateMainMenu();
  };

  onEdit = () => {
    this.props.action.onCheckEdit(this.props.resource, {
      idKunjunganUnit: this.props.post.id_kunjungan_unit,
    });
    this.props.appActions.deactivateMainMenu();
  };

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
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('add', statusForm);
    return isEnableStatus;
  };

  isCanEdit = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('edit', statusForm);
    return isEnableStatus;
  };

  isCanDelete = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('delete', statusForm);
    return isEnableStatus;
  };

  isCanSave = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('save', statusForm);
    return isEnableStatus;
  };

  isCanCancel = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('cancel', statusForm);
    return isEnableStatus;
  };

  isCanGabungBayi = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('norm_ibunya', statusForm);
    return isEnableStatus;
  };

  isCanPrint = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('preview', statusForm);
    return isEnableStatus;
  };

  isCanFinish = () => {
    const { statusForm } = this.props;
    const isEnableStatus = !isDisable('finish', statusForm);
    return isEnableStatus;
  };

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  render() {
    const { t } = this.props;

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
          <Menu.Menu
            position="right"
            style={{ right: 10, position: 'absolute' }}
          >
            <Menu.Item style={{ paddingRight: 5 }}>
              <Button
                name="kunjungan_hari_ini"
                size="mini"
                onClick={this.props.action.onToggleShowKunjunganHariIni}
              >
                <Icon name="list" />
                {t(this._getKey('kunjungan_hari_ini'))}
              </Button>
            </Menu.Item>
            {this.isCanGabungBayi() && (
              <Menu.Item style={{ paddingRight: 5 }}>
                <Button
                  name="norm_ibunya"
                  size="mini"
                  onClick={
                    this.props.action
                      .onToggleShowMenggabungkanKunjunganIbuDanBayi
                  }
                >
                  <Icon name="female" />
                  {t(this._getKey('norm_ibunya'))}
                </Button>
              </Menu.Item>
            )}
            {this.isCanPrint() && (
              <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                <PrintButton
                // onClick={this._onCancel}
                // inputRef={this.cancel}
                // onKeyDown={this._onFocusElement}
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
          </Menu.Menu>
        </Fragment>
      </FooterActionsContainer>
    );
  }
}

const mapStateToProps = function (state, props) {
  const {
    post,
    focusElement,
    statusForm,
    saveSuccess,
  } = state.module.kunjungan;

  return {
    customPermissions: getPermissions(props.permissions),
    post,
    focusElement,
    statusForm,
    saveSuccess,
  };
};

const mapDispatchToProps = function (dispatch, props) {
  return {
    action: bindActionCreators(
      {
        onSave: actions.save.request,
        onAdd: actions.onAdd,
        onCheckEdit: actions.onCheckEdit,
        onCheckDelete: actions.onCheckDelete,
        onCheckAdd: actions.onCheckAdd,
        onCheckSave: actions.onCheckSave,
        onCancel: actions.onCancel,
        onAddWithSelected: actions.onAddWithSelected,
        onCancelWithSelected: actions.onCancelWithSelected,
        onFinish: actions.onFinish,
        onFocusElement: actions.onFocusElement,
        onToggleShowKunjunganHariIni: actions.toggleShowKunjunganHariIni,
        onToggleShowNorm: () => actions.toggleShowNormModal(props.resource),
        onToggleShowMenggabungkanKunjunganIbuDanBayi: () =>
          actions.toggleShowMenggabungkanKunjunganAnakIbu(props.resource),
      },
      dispatch
    ),
  };
};

FooterActions.propTypes = {
  permissions: PropTypes.array,
  customPermissions: PropTypes.object,
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
  statusForm: PropTypes.string,
  appActions: PropTypes.object,
  saveSuccess: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
