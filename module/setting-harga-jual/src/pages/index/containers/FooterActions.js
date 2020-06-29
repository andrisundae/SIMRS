import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  EditButton,
  SaveButton,
  CancelButton,
  confirmation,
  withAppConsumer,
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

    this._onEdit = this._onEdit.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onShowLog = this._onShowLog.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.edit = createRef();
    this.cancel = createRef();
    this.save = createRef();
    this.showLog = createRef();
  }

  render() {
    let { t } = this.props;

    return (
      <FooterActionsContainer>
        <Fragment>
          {this._isCanEdit() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <EditButton
                onClick={this._onEdit}
                inputRef={this.edit}
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
          {this._isShowLog() && (
            <Menu.Item
              style={{ paddingLeft: 5, paddingRight: 5, marginLeft: '80%' }}
            >
              <Button
                ref={this.showLog}
                name="show_log"
                size="mini"
                color="blue"
                onClick={this._onShowLog}
              >
                {t(this._getKey('label.button.show_log'))}
              </Button>
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

  _getKey(key) {
    return `${this.props.resource}:${key}`;
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
      if (_this._isCanEdit()) {
        _this.edit.current.focus();
        _this._onEdit();
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

  _isShowLog() {
    let { statusForm, selectedRow, post } = this.props;
    let isValid = false;

    if (selectedRow && post.id && statusForm === moduleActionTypes.SELECTED) {
      isValid = true;
    }

    return isValid;
  }

  _onEdit() {
    this.props.action.onEdit(this.props.resource);
    this.props.appContext.toggleMainMenu();
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
    this.props.appContext.toggleMainMenu();
  }

  _onCancel() {
    this.props.action.onCancel(this.props.resource);
    this.props.appContext.toggleMainMenu();
  }

  _onShowLog() {
    this.props.action.showLog(this.props.resource, { show: true });
  }

  _onFocusElement(e) {
    if (e.which === 37 || e.which === 39) {
      e.preventDefault();

      let { name } = e.target;

      let nextElement = '';
      switch (name) {
        case 'edit':
          nextElement = 'show_log';
          break;
        case 'save':
          nextElement = 'cancel';
          break;
        case 'cancel':
          nextElement = 'save';
          break;
        case 'show_log':
          nextElement = 'edit';
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
      canEdit: isGranted(props.permissions, 'koreksi'),
      canShowLog: isGranted(props.permissions, 'show_log'),
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
        showLog: actions.showLog,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
