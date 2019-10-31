import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Grid, Form, Input } from 'semantic-ui-react';

import actions from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.username = createRef();
    this.oldPassword = createRef();
    this.newPassword = createRef();
  }

  render() {
    const { post, t, data } = this.props;

    return (
      <Form id={this.formId} size="mini">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.username'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="username"
                      ref={this.username}
                      value={data.username}
                      disabled
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.oldPassword'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      type="password"
                      name="oldPassword"
                      ref={this.oldPassword}
                      value={post.oldPassword}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'newPassword')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.newPassword'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      type="password"
                      name="newPassword"
                      ref={this.newPassword}
                      value={post.newPassword}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'save')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeInput(this.props.resource, { name, value });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const { post, focusElement, data } = state.module;

  return {
    post,
    focusElement,
    data
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  }
}

Create.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  data: PropTypes.object,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
