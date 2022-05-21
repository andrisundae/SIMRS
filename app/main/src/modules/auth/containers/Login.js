import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
  Form,
  Button,
  Input,
  Message,
  Label,
  Divider,
} from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import { validator } from '@simrs/common';
import { confirmation } from '@simrs/components';
import authActions from '../authActions';

const currentWindow = remote.getCurrentWindow();
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        username: '',
        password: '',
      },
      errors: {},
      isSubmitted: false,
    };

    this.username = createRef();
    this.password = createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let { isLoading, notification, t } = this.props;
    let { post, errors, isSubmitted } = this.state;

    return (
      <Form className="flex-1 px-2" onSubmit={this.handleSubmit}>
        <div className="form-title">
          <span className="form-title">{t('main:login.title')}</span>
          <br />
          <span className="form-subtitle">{t('main:login.subtitle')}</span>
        </div>
        {notification.message && (
          <Message
            className="h-20 overflow-y-scroll"
            negative
            content={notification.message}
          />
        )}
        <Form.Field error={isSubmitted && errors.username ? true : false}>
          <Input
            icon="user"
            placeholder={t('main:login.placeholder.id')}
            ref={this.username}
            autoComplete="off"
            name="username"
            autoFocus
            value={post.username}
            onChange={this.handleChange}
            disabled={isLoading ? true : false}
          />
          {isSubmitted && errors.username && (
            <Label basic color="red" pointing>
              {_.first(errors.username)}
            </Label>
          )}
        </Form.Field>
        <Form.Field error={isSubmitted && errors.password ? true : false}>
          <Input
            icon="lock"
            type="password"
            placeholder={t('main:login.placeholder.password')}
            ref={this.password}
            autoComplete="off"
            name="password"
            value={post.password}
            onChange={this.handleChange}
            disabled={isLoading ? true : false}
          />
          {isSubmitted && errors.password && (
            <Label basic color="red" pointing>
              {_.first(errors.password)}
            </Label>
          )}
        </Form.Field>
        <Button
          loading={isLoading ? true : false}
          type="submit"
          fluid
          negative
          className="mt-10"
        >
          {t('main:login.action.login')}
        </Button>
        <Divider inverted horizontal>
          {t('main:login.action.divider')}
        </Divider>
        {/* <small className="divider">{t('main:login.action.divider')}</small> */}
        <Button
          type="button"
          fluid
          basic
          inverted
          onClick={this._closeWindow}
          disabled={isLoading ? true : false}
        >
          {t('main:login.action.exit')}
        </Button>
      </Form>
    );
  }

  componentDidMount() {
    // const _this = this;
    this.props.action.onReset();
    // this.props.i18n.loadNamespaces(['main']).then(() => {
    //     _this.setState({translationLoaded: true});
    // });
  }

  componentDidUpdate(prevProps) {
    let { errors, post } = this.state;
    let _this = this;

    if (this.state.isSubmitted) {
      Object.keys(errors).forEach(function (field, index) {
        if (index === 0) {
          _this[field].current.focus();
        }
      });
    }

    if (
      this.props.dialogForceLogin === true &&
      prevProps.dialogForceLogin === false
    ) {
      confirmation({
        title: this.props.t(`main:dialog.confirmation.title`),
        message: this.props.t('main:dialog.confirmation.forcelogin'),
        buttons: [
          this.props.t(`main:dialog.action.yes`),
          this.props.t(`main:dialog.action.no`),
        ],
        onOk: () => this.props.action.onForceLogin({ ...post, force: true }),
        onCancel: () => this.props.action.onShowDialogForceLogin(false),
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    let { post } = this.state;
    let { rules, messages } = this.getValidator();

    this.setState((prevState) => {
      return {
        post: {
          ...prevState.post,
          [name]: value,
        },
        isSubmitted: false,
        errors: validator.default(
          {
            ...post,
            [name]: value,
          },
          rules,
          messages
        ),
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { rules, messages } = this.getValidator();
    let errors = validator.default(this.state.post, rules, messages);
    // this.props.action.onSubmitted(true, errors);
    this.setState({
      isSubmitted: true,
      errors: errors,
    });

    if (_.isEmpty(errors)) {
      this.props.action.onLogin(this.state.post);
    }
  }

  getValidator() {
    return {
      rules: {
        username: { required: true },
        password: { required: true },
      },
      messages: {
        username: { required: 'Username harus diisi!' },
        password: {
          required: 'Password harus diisi!',
        },
      },
    };
  }

  _closeWindow() {
    currentWindow.close();
  }
}

const mapStateToProps = function (state) {
  let { auth, notification, loader } = state;

  return {
    isLoading: loader.count > 0,
    notification: notification,
    dialogForceLogin: auth.dialogForceLogin,
    submitted: auth.submitted,
    // isLoginSuccess: auth.get('isValidLogin'),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onReset: authActions.onReset,
        onLogin: authActions.login.request,
        onForceLogin: authActions.forceLogin,
        onShowDialogForceLogin: authActions.showDialogForceLogin,
        onSubmitted: authActions.onSubmitted,
      },
      dispatch
    ),
  };
};

Login.propTypes = {
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  dialogForceLogin: PropTypes.bool,
  action: PropTypes.object,
  submitted: PropTypes.bool,
  // isLoginSuccess: PropTypes.bool,
  notification: PropTypes.object,
  location: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Login));
