import React, { PureComponent, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  PrintButton,
  withAppConsumer,
  FinishButton,
} from '@simrs/components';
import actions from '../redux/actions';
import { disabledElement } from '../redux/selector';

class FooterActions extends PureComponent {
  constructor(props) {
    super(props);

    this._onFocusElement = this._onFocusElement.bind(this);

    this.print = createRef();
    this.finish = createRef();
  }

  componentDidMount() {
    this._bindKey();
  }

  componentDidUpdate() {
    const { focusElement } = this.props;

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
    // MouseTrap.unbind('alt+k');
    // MouseTrap.unbind('alt+s');
    // MouseTrap.unbind('alt+b');
  }

  _bindKey() {
    let _this = this;
  }

  isCanFinish = () => {
    const { disabledActions } = this.props;
    return !disabledActions.finish;
  };

  isCanPrint = () => {
    const { disabledActions } = this.props;
    return !disabledActions.print;
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
        case 'print':
          nextElement = 'finish';
          break;
        case 'finish':
          nextElement = 'print';
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
          {this.isCanPrint() && (
            <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
              <PrintButton
                // onClick={this.onSave}
                inputRef={this.print}
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
        </Fragment>
      </FooterActionsContainer>
    );
  }
}

const mapStateToProps = function (state) {
  const module = state.default;
  return {
    statusForm: module.statusForm,
    post: module.post,
    focusElement: module.focusElement,
    disabledActions: {
      print: disabledElement(state, 'print'),
      finish: disabledElement(state, 'finish'),
    },
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onPrint: actions.onPrint,
        onFinish: actions.onFinish,
        onFocusElement: actions.onFocusElement,
      },
      dispatch
    ),
  };
};

FooterActions.propTypes = {
  action: PropTypes.object,
  statusForm: PropTypes.string,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  appActions: PropTypes.object,
  disabledActions: PropTypes.object,
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(FooterActions));
