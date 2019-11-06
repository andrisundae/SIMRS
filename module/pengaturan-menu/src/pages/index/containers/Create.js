import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Segment, Icon, Header, Grid, Form, Input } from 'semantic-ui-react';

import {
  TreeView,
  Checkbox,
  PageLoader
} from '@simrs/components';
import Details from './Details';
import actions from '../actions';
import actionTypes from '../actionTypes';
import { isDisableForm } from '../reducer';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
    this._onExpand = this._onExpand.bind(this);
    this._onSelect = this._onSelect.bind(this);

    this.tree = createRef();
    this.kode = createRef();
    this.nama = createRef();
    this.key_menu = createRef();
    this.kode_app = createRef();
    this.urutan = createRef();
    this.default_action = createRef();
  }

  render() {
    let {
      post,
      menu,
      selectedKeys,
      expandedKeys,
      isLoading,
      isDisableForm,
      statusForm,
      loaderMessage,
      t
    } = this.props;

    return (
      <Segment size="mini" className="content-container">
        <Header as='h5' attached='top' block>
          <Icon name="settings" />
          {this.props.t(`${this.props.resource}:title`)}
        </Header>
        <Segment attached size="mini" style={{ minHeight: 540 }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column width="9">
                <Segment size="mini">
                  <TreeView
                    ref={this.tree}
                    className="myCls"
                    showLine
                    navigation
                    selectable
                    onExpand={this._onExpand}
                    onSelect={this._onSelect}
                    treeData={menu}
                    selectedKeys={selectedKeys}
                    expandedKeys={expandedKeys}
                    disabled={!isDisableForm}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width="7">
                <Segment>
                  <Form size="small">
                    <Grid>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="required field">
                          <label>{t(this._getKey('label.field.nama'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Input
                            name="nama"
                            ref={this.nama}
                            value={post.nama}
                            disabled={isDisableForm}
                            onChange={this._handleInputChange}
                            onKeyDown={(e) => this._onFocusElement(e, 'key_menu')}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="required field">
                          <label>{t(this._getKey('label.field.key_menu'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Input
                            name="key_menu"
                            ref={this.key_menu}
                            value={post.key_menu}
                            disabled={isDisableForm}
                            onChange={this._handleInputChange}
                            onKeyDown={(e) => this._onFocusElement(e, 'kode_app')}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="required field">
                          <label>{t(this._getKey('label.field.kode_app'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Input
                            name="kode_app"
                            ref={this.kode_app}
                            value={post.kode_app}
                            disabled={isDisableForm}
                            onChange={this._handleInputChange}
                            onKeyDown={(e) => this._onFocusElement(e, 'urutan')}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>{t(this._getKey('label.field.urutan'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Input
                            name="urutan"
                            ref={this.urutan}
                            value={post.urutan}
                            disabled={isDisableForm}
                            onChange={this._handleInputChange}
                            onKeyDown={(e) => this._onFocusElement(e, 'default_action')}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      {statusForm === actionTypes.ADD &&
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>{t(this._getKey('label.field.default_action'))}</label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Checkbox
                              value={post.default_action}
                              name="default_action"
                              checked={post.default_action ? true : false}
                              disabled={isDisableForm}
                              onChange={this._handleInputChange}
                              onKeyDown={(e) => this._onFocusElement(e, 'save')}
                              inputRef={this.default_action}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      }
                    </Grid>
                  </Form>
                </Segment>
                <Details resource={this.props.resource} t={t} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <PageLoader active={isLoading} message={loaderMessage} />
      </Segment>
    )
  }

  componentDidMount() {
    this.props.action.onReset(this.props.resource);
  }

  componentDidUpdate(prevProps) {
    let { statusForm, focusElement, selectedKeys } = this.props;

    if (statusForm === actionTypes.ADD || statusForm === actionTypes.EDIT) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    } else if (statusForm === actionTypes.CANCEL && prevProps.statusForm === actionTypes.ADD) {
      if (selectedKeys[0]) {
        let node = this.tree.current._getNode(selectedKeys[0]);
        if (node) {
          this.props.action.onSelect(this.props.resource, { selectedKeys, selectedData: node.props });
        }
      }
    }
  }

  _handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? true : ''
    } else {
      val = value;
    }
    this.props.action.onInputChange(this.props.resource, { name, value: val });
  }

  _onExpand(expandedKeys) {
    this.props.action.onExpand(this.props.resource, expandedKeys);
  }

  _onSelect(selectedKeys, { node }) {
    this.props.action.onSelect(this.props.resource, { selectedKeys, selectedData: node.props });
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }
}

const mapStateToProps = function (state) {
  const { data, post, statusForm, focusElement } = state.module;
  const { menu, grup, expandedKeys, selectedKeys, selectedGrup } = data;

  return {
    menu,
    grup,
    expandedKeys: [...expandedKeys],
    selectedKeys,
    post,
    selectedGrup,
    isLoading: state.loader.count > 0,
    loaderMessage: state.loader.message,
    isDisableForm: isDisableForm(statusForm),
    focusElement,
    statusForm,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators({
      openForm: actions.openForm,
      onExpand: actions.onExpandedChange,
      onSelect: actions.onSelectedChange,
      onInputChange: actions.onInputChange,
      onFocusElement: actions.onFocusElement,
      onReset: actions.onReset,
    }, dispatch),
  }
}

Create.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  menu: PropTypes.array,
  expandedKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  selectedGrup: PropTypes.object,
  resource: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isDisableForm: PropTypes.bool,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  loaderMessage: PropTypes.string,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
