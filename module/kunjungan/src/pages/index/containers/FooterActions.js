import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';
import { isDisable } from '../reducer';

import {
  FooterActionsContainer,
  SaveButton,
  EditButton,
  DeleteButton,
  CancelButton,
  AddButton,
  FinishButton,
  PrintButton,
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';
import actions from '../actions';

class FooterActions extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);

        this._onSave = this._onSave.bind(this);
        this.save = createRef();
    }

    _onSave() {
        this.props.action.onSave(this.props.resource, this.props.post);
    }

    onAdd = () => {
        if (this.props.post.id_pasien) {
            this.props.action.onAddWithSelected(this.props.resource);
        } else {
            this.props.action.onAdd(this.props.resource);
        }
    }

    onCancel = () => {
        if (this.props.post.id_pasien) {
            this.props.action.onCancelWithSelected(this.props.resource);
        } else {
            this.props.action.onCancel(this.props.resource);
        }
    }

    onFinish = () => {
        this.props.action.onFinish(this.props.resource);
    }

    isCanAdd = () => {
        const { statusForm} = this.props;
        const isEnableStatus = !isDisable('add', statusForm);
        return isEnableStatus;
    }

    isCanEdit = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('edit', statusForm);
        return isEnableStatus;
    }

    isCanDelete = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('delete', statusForm);
        return isEnableStatus;
    }

    isCanSave = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('save', statusForm);
        return isEnableStatus;
    }

    isCanCancel = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('cancel', statusForm);
        return isEnableStatus;
    }

    isCanPrint = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('preview', statusForm);
        return isEnableStatus;
    }

    isCanFinish = () => {
        const { statusForm } = this.props;
        const isEnableStatus = !isDisable('finish', statusForm);
        return isEnableStatus;
    }

    render() {
        return (
            <FooterActionsContainer>
                <Fragment>
                    {this.isCanAdd() &&
                        <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
                            <AddButton
                                onClick={this.onAdd}
                                inputRef={this.add}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanEdit() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <EditButton
                                onClick={this._onEdit}
                                inputRef={this.edit}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanDelete() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <DeleteButton
                                onClick={this._onDelete}
                                inputRef={this.delete}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanSave() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <SaveButton
                                onClick={this._onSave}
                                inputRef={this.save}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanCancel() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <CancelButton
                                onClick={this.onCancel}
                                inputRef={this.cancel}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanPrint() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <PrintButton
                                onClick={this._onCancel}
                                inputRef={this.cancel}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                    {this.isCanFinish() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <FinishButton
                                onClick={this.onFinish}
                                inputRef={this.finish}
                                onKeyDown={this._onFocusElement}
                            />
                        </Menu.Item>
                    }
                </Fragment>
            </FooterActionsContainer>
        )
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
        MouseTrap.unbind("alt+s");
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
=======
  constructor(props) {
    super(props);

    this._onSave = this._onSave.bind(this);
    this.save = createRef();
  }

  _onSave() {
    this.props.action.onSave(this.props.resource, this.props.post);
  }

  onAdd = () => {
    if (this.props.post.pasien_id) {
      this.props.action.onAddWithSelected(this.props.resource);
    } else {
      this.props.action.onAdd(this.props.resource);
    }
  };

  onCancel = () => {
    if (this.props.post.pasien_id) {
      this.props.action.onCancelWithSelected(this.props.resource);
    } else {
      this.props.action.onCancel(this.props.resource);
    }
  };

  onFinish = () => {
    this.props.action.onFinish(this.props.resource);
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
                onClick={this._onEdit}
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
          {this.isCanPrint() && (
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
              <PrintButton
                onClick={this._onCancel}
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
>>>>>>> origin/dev
}

const mapStateToProps = function (state, props) {
  const { post, focusElement, statusForm } = state.module;

  return {
    customPermissions: getPermissions(props.permissions),
    post,
    focusElement,
    statusForm,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSave: actions.save.request,
        onAdd: actions.onAdd,
        onCancel: actions.onCancel,
        onAddWithSelected: actions.onAddWithSelected,
        onCancelWithSelected: actions.onCancelWithSelected,
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
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
