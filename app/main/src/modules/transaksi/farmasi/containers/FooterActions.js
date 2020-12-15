import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Trans } from 'react-i18next';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu, Button, Icon } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';
import { getPermissions } from '../../../auth';
import { masterActions, filterActions, detailActions } from '../actions';
import { masterActionTypes, detailActionTypes } from '../actionTypes';

class FooterActions extends Component {
  constructor(props) {
    super();

    this._onAddMaster = this._onAddMaster.bind(this);
    this._onDialogOpen = this._onDialogOpen.bind(this);
    this._onAddDetail = this._onAddDetail.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onBatalTransaksi = this._onBatalTransaksi.bind(this);
    this._onEditDetail = this._onEditDetail.bind(this);
    this._onDeleteDetail = this._onDeleteDetail.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
    this._onSelesaiTransaksi = this._onSelesaiTransaksi.bind(this);
    this._onHapusTransaksi = this._onHapusTransaksi.bind(this);

    this.__createRef();
  }

  __createRef() {
    this.addMaster = createRef();
    this.addDetail = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.editDetail = createRef();
    this.deleteDetail = createRef();
    this.batalTransaksi = createRef();
    this.selesaiTransaksi = createRef();
    this.hapusTransaksi = createRef();
    this.cetakTransaksi = createRef();
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  componentDidMount() {
    this._bindKey();
  }

  componentDidUpdate() {
    let { focusElement, dtFocusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }

    if (this[dtFocusElement]) {
      if (this[dtFocusElement].current) {
        this[dtFocusElement].current.focus();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // Jika Status Form Berubah
    if (this.props.statusForm !== nextProps.statusForm) {
      return true;
    }
    // Jika Permissions berubah
    if (this.props.permissions !== nextProps.permissions) {
      return true;
    }
    // Jika Form Master Dibuka atau Ditutup
    if (this.props.masterOpen !== nextProps.masterOpen) {
      return true;
    }
    // Jika Form Detail Dibuka atau Ditutup
    if (this.props.detailOpen !== nextProps.detailOpen) {
      return true;
    }
    // Jika StatusForm Detail Berubah
    if (this.props.dtStatusForm !== nextProps.dtStatusForm) {
      return true;
    }

    if (
      this.props.focusElement !== nextProps.focusElement &&
      (nextProps.focusElement === 'save' || nextProps.focusElement === 'cancel')
    ) {
      return true;
    }

    if (
      this.props.dtFocusElement !== nextProps.dtFocusElement &&
      (nextProps.dtFocusElement === 'save' ||
        nextProps.dtFocusElement === 'cancel')
    ) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <FooterActionsContainer>
        <Fragment>
          {this._isCanAddMaster() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.addMaster}
                name="Tambah Master"
                color="blue"
                size="mini"
                onClick={this._onAddMaster}
                onKeyDown={this._onFocusElement}
              >
                <Icon name="plus" />
                <Trans i18nKey="common:action.add_transaksi" />
              </Button>
            </Menu.Item>
          )}
          {this._isCanAddDetail() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.addDetail}
                onClick={this._onAddDetail}
                onKeyDown={this._onFocusElement}
                name="Tambah Detail"
                color="blue"
                size="mini"
              >
                <Icon name="plus" />
                <Trans i18nKey="common:action.add_item" />
              </Button>
            </Menu.Item>
          )}

          {this._isCanEditDetail() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this._onEditDetail}
                inputRef={this.editDetail}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
          {this._isCanEditDetail() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <DeleteButton
                onClick={this._onDeleteDetail}
                inputRef={this.deleteDetail}
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
          {this._isCanManageTransaksi() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.hapusTransaksi}
                onClick={this._onHapusTransaksi}
                onKeyDown={this._onFocusElement}
                name="Hapus Transaksi"
                color="blue"
                size="mini"
              >
                <Icon name="trash" />
                <Trans i18nKey="common:action.hapus_transaksi" />
              </Button>
            </Menu.Item>
          )}
          {this._isCanManageTransaksi() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.cetakTransaksi}
                onClick={this._onCetakTransaksi}
                onKeyDown={this._onFocusElement}
                name="Cetak Transaksi"
                color="blue"
                size="mini"
              >
                <Icon name="print" />
                <Trans i18nKey="common:action.print" />
              </Button>
            </Menu.Item>
          )}
          {this._isCanFinishTransaksi() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.batalTransaksi}
                onClick={this._onBatalTransaksi}
                onKeyDown={this._onFocusElement}
                name="Batal Transaksi"
                color="blue"
                size="mini"
              >
                <Icon name="undo" />
                <Trans i18nKey="common:action.batal_transaksi" />
              </Button>
            </Menu.Item>
          )}
          {this._isCanFinishTransaksi() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <Button
                ref={this.selesaiTransaksi}
                onClick={this._onSelesaiTransaksi}
                onKeyDown={this._onFocusElement}
                name="Selesai Transaksi"
                color="blue"
                size="mini"
              >
                <Icon name="save" />
                <Trans i18nKey="common:action.selesai_transaksi" />
              </Button>
            </Menu.Item>
          )}
        </Fragment>
      </FooterActionsContainer>
    );
  }

  _bindKey() {
    let that = this;

    MouseTrap.bindGlobal('alt+t', function (e) {
      e.preventDefault();

      if (that._isCanAddMaster()) {
        that.addMaster.current.focus();
        that._onAddMaster();
      }

      if (that._isCanAddDetail()) {
        that.addDetail.current.focus();
        that._onAddDetail();
      }
    });

    MouseTrap.bindGlobal('alt+k', function (e) {
      e.preventDefault();
      if (that._isCanEditDetail()) {
        that.editDetail.current.focus();
        that._onEditDetail();
      }
    });

    MouseTrap.bindGlobal('alt+h', function (e) {
      e.preventDefault();
      if (that._isCanEditDetail()) {
        that.deleteDetail.current.focus();
        that._onDeleteDetail();
      }
    });

    MouseTrap.bindGlobal('alt+s', function (e) {
      e.preventDefault();
      if (that._isCanSave()) {
        that._onSave();
      }
    });

    MouseTrap.bindGlobal('alt+c', function (e) {
      e.preventDefault();
      if (!that.props.masterOpen) {
        if (that.props.showMaster) {
          that._onSearch();
        } else {
          that._onDialogOpen();
        }
      }
    });

    MouseTrap.bindGlobal(['alt+b'], function (e) {
      e.preventDefault();
      if (that._isCanCancel() && !that.props.showMaster) {
        that._onCancel();
      }

      if (that.props.showMaster) {
        that._onClose();
      }

      if (that.props.showDetail) {
        that._onCloseDetail();
      }
    });

    MouseTrap.bindGlobal('esc', function (e) {
      e.preventDefault();
      if (that._isCanCancel()) {
        that._onCancel();
      }

      if (that._isCanBatalTransaksi()) {
        that._onBatalTransaksi();
      }
    });
  }

  _isCanAddMaster() {
    let { permissions, statusForm, masterOpen } = this.props;
    let isValid = false;

    if (
      permissions.canAdd &&
      (statusForm === masterActionTypes.READY ||
        statusForm === masterActionTypes.CANCEL) &&
      !masterOpen
    ) {
      isValid = true;
    }

    if (!isValid && this._isCanManageTransaksi()) {
      isValid = true;
    }

    return isValid;
  }

  _isCanAddDetail() {
    let { permissions, dtStatusForm, statusForm } = this.props;
    let isValid = false;
    let detStatusForm = [
      detailActionTypes.CANCEL,
      detailActionTypes.READY,
      detailActionTypes.SELECTED,
    ];

    if (
      permissions.canAdd &&
      detStatusForm.indexOf(dtStatusForm) !== -1 &&
      statusForm === masterActionTypes.FILLED
    ) {
      isValid = true;
    }
    return isValid;
  }

  _isCanEditDetail() {
    let { permissions, dtStatusForm, statusForm } = this.props;
    let isValid = false;
    let detStatusForm = [detailActionTypes.SELECTED];

    if (
      permissions.canEdit &&
      detStatusForm.indexOf(dtStatusForm) !== -1 &&
      masterActionTypes.FILLED === statusForm
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanFinishTransaksi() {
    let isValid = false;
    let { statusForm, dtStatusForm } = this.props;
    let allowFinish = [
      detailActionTypes.CANCEL,
      detailActionTypes.READY,
      detailActionTypes.SELECTED,
    ];

    if (
      statusForm === masterActionTypes.FILLED &&
      allowFinish.indexOf(dtStatusForm) !== -1
    ) {
      isValid = true;
    }

    return isValid;
  }

  _isCanManageTransaksi() {
    let isValid = false;
    let { statusForm } = this.props;

    if (statusForm === masterActionTypes.MANAGE) {
      isValid = true;
    }

    return isValid;
  }

  _isCanSave() {
    let { permissions, statusForm, dtStatusForm } = this.props;
    let isValid = false;
    let statusCanSave = [
      masterActionTypes.ADD,
      masterActionTypes.EDIT,
      detailActionTypes.EDIT,
    ];

    if (permissions.canAdd || permissions.canEdit) {
      if (
        statusCanSave.indexOf(statusForm) !== -1 ||
        (statusCanSave.indexOf(dtStatusForm) !== -1 &&
          statusForm === masterActionTypes.FILLED)
      ) {
        isValid = true;
      }
    }

    return isValid;
  }

  _isCanCancel() {
    let { statusForm, dtStatusForm } = this.props;
    let isValid = false;
    let statusCanCancel = [
      masterActionTypes.ADD,
      masterActionTypes.EDIT,
      detailActionTypes.EDIT,
    ];

    if (
      statusCanCancel.indexOf(statusForm) !== -1 ||
      (statusCanCancel.indexOf(dtStatusForm) !== -1 &&
        statusForm === masterActionTypes.FILLED)
    ) {
      isValid = true;
    }

    return isValid;
  }

  _onAddMaster = () => {
    this.props.action.onAddMaster(this.props.resource);
    // this.props.appContext.toggleMainMenu();
  };

  _onClose() {
    this.props.action.onCloseDialog(this.props.resource, {
      idx: 'master_modal',
    });
  }

  _onCloseDetail() {
    this.props.action.onCloseDialog(this.props.resource, {
      idx: 'detail_modal',
    });
    this.props.action.onReady(this.props.resource);
  }

  _onAddDetail = () => {
    let { dtStatusForm, resource } = this.props;
    let allowOpen = [
      detailActionTypes.READY,
      detailActionTypes.CANCEL,
      detailActionTypes.SELECTED,
    ];

    if (allowOpen.indexOf(dtStatusForm) !== -1) {
      this.props.action.onAddDetail(resource);
      this.props.action.onOpenDialog(resource, { form: 'detail_modal' });
    }
  };

  _onDialogOpen = () => {
    let { statusForm, resource } = this.props;
    let allowOpen = [masterActionTypes.READY, masterActionTypes.CANCEL];

    if (allowOpen.indexOf(statusForm) !== -1) {
      this.props.action.onOpenDialog(resource, { form: 'master_modal' });
    }
  };

  _onSearch = () => {
    let { resource, filter_master, masterOpen, detailOpen } = this.props;
    if (!masterOpen) {
      this.props.action.onSubmitFilterTransaksi(resource, filter_master);
    }

    if (detailOpen) {
      this.props.action.onSubmitFilterDetail(
        this.props.resource,
        filter_detail
      );
    }
  };

  _onEditDetail() {
    const { resource, action, post } = this.props;

    action.onEditDetail(resource, post);
    // this.props.appContext.toggleMainMenu();
  }

  _onDeleteDetail() {
    const { t, resource, action, post_detail } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDeleteDetail(resource, post_detail),
    });
  }

  _onSave() {
    let {
      resource,
      post,
      post_detail,
      data_detail,
      masterOpen,
      detailOpen,
    } = this.props;

    if (masterOpen) {
      this.props.action.onSave(resource, post);
    }

    if (detailOpen) {
      let post = {
        ...post_detail,
        master_id: data_detail.master_id,
      };
      this.props.action.onSaveDetail(resource, post);
    }
    // this.props.appContext.toggleMainMenu();
  }

  _onCancel() {
    if (this.props.masterOpen) {
      this.props.action.onCancel(this.props.resource);
    }

    if (this.props.detailOpen) {
      this.props.action.onCandelDetail(this.props.resource);
    }
    // this.props.appContext.toggleMainMenu();
  }

  _onSelesaiTransaksi() {
    const { post, data_detail, action, resource, t } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () =>
        action.onFinish(resource, {
          master: post.id,
          details: data_detail.item_list,
        }),
    });
  }

  _onHapusTransaksi() {
    const { post, action, resource, t } = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, post),
    });
  }

  _onBatalTransaksi() {
    this.props.action.onBatal(this.props.resource);
  }

  _onFocusElement(e) {
    let { masterOpen, detailOpen, resource, dtStatusForm } = this.props;

    if (e.which === 37 || e.which === 39) {
      e.preventDefault();

      let { name } = e.target;
      let nextElement = '';
      switch (name) {
        case 'Tambah Detail':
          nextElement = 'batalTransaksi';
          break;
        case 'Batal Transaksi':
          nextElement = 'selesaiTransaksi';
          break;
        case 'Selesai Transaksi':
          nextElement = 'addDetail';
          break;
        case 'editDetail':
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

      if (masterOpen) {
        this.props.action.onFocusElement(resource, nextElement);
      }

      if (detailOpen) {
        this.props.action.onDtFocus(resource, nextElement);
      }

      if (
        dtStatusForm === detailActionTypes.READY ||
        dtStatusForm === detailActionTypes.CANCEL
      ) {
        this.props.action.onDtFocus(resource, nextElement);
      }
    }
  }
}

const mapStateToProps = function (state, props) {
  const { master, filter, detail } = state.default;

  return {
    permissions: props.permissions || getPermissions(state.acl),
    statusForm: master.statusForm,
    masterOpen: master.openForm,
    focusElement: master.focusElement,
    post: master.post,
    dataAfterSave: master.dataAfterSave.data,
    pop_up: filter.filter_modal,
    filter_master: filter.cari_master,
    filter_detail: filter.cari_detail,
    showMaster: filter.filter_modal.master_modal.show,
    showDetail: filter.filter_modal.detail_modal.show,
    detailOpen: detail.openForm,
    dtStatusForm: detail.statusForm,
    post_detail: detail.post,
    data_detail: detail.data,
    dtFocusElement: detail.focusElement,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...masterActions,
        onSave: masterActions.save.request,
        onDelete: masterActions.delete.request,
        onFinish: masterActions.finish.request,
        onOpenDialog: filterActions.onOpenDialog,
        onCloseDialog: filterActions.onCloseDialog,
        onSubmitFilterTransaksi: filterActions.onSubmitFilterTransaksi,
        onSubmitFilterDetail: filterActions.onSubmitFilterDetail,
        onSaveDetail: detailActions.save.request,
        onCandelDetail: detailActions.onCancel,
        onDeleteDetail: detailActions.delete.request,
        onAddDetail: detailActions.onAddDetail,
        onDtFocus: detailActions.onFocusElement,
        onReady: detailActions.onReady,
        onEditDetail: detailActions.onEdit,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
