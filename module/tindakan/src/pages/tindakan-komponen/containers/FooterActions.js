import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import { FooterActionsContainer, SaveButton } from '@simrs/components';
import { isGranted } from '@simrs/main/src/modules/auth';
import { moduleActions } from '@simrs/main/src/modules/master/nested';

class FooterActions extends Component {
  constructor(props) {
    super(props);

    this._onSave = this._onSave.bind(this);

    this.save = createRef();
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
          {this._isCanSave() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <SaveButton
                onClick={this._onSave}
                inputRef={this.save}
                onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
        </div>
      </FooterActionsContainer>
    );
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }

    this._bindKey();
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

  _isCanSave() {
    let { customPermissions } = this.props;
    let isValid = false;
    if (customPermissions.canAdd || customPermissions.canEdit) {
      isValid = true;
    }

    return isValid;
  }

  _onSave() {
    let { resource, subResource, post, reference } = this.props;
    this.props.action.onSave(resource, subResource, { ...post, ...reference });
  }
}

const mapStateToProps = function (state, props) {
  const {
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
  } = state.nested.module;

  return {
    customPermissions: {
      canAdd: isGranted(props.permissions, 'tambah_tindakan_komponen'),
      canEdit: isGranted(props.permissions, 'koreksi_tindakan_komponen'),
      canDelete: isGranted(props.permissions, 'hapus_tindakan_komponen'),
    },
    statusForm,
    selectedRow,
    reference,
    post,
    focusElement,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSave: moduleActions.save.request,
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
};

FooterActions.defaultProps = {
  reference: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
