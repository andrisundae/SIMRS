import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Segment, Icon, Header, Grid, Form } from 'semantic-ui-react';

import { TreeView, Select, PageLoader } from '@simrs/components';
import actions from '../actions';
import actionTypes from '../actionTypes';
import { isDisableForm } from '../reducer';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleGrupChange = this._handleGrupChange.bind(this);
    this._onExpand = this._onExpand.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onCheck = this._onCheck.bind(this);

    this.tree = createRef();
    this.grup = createRef();
  }

  render() {
    let {
      post,
      grup,
      menu,
      selectedKeys,
      checkedKeys,
      expandedKeys,
      selectedGrup,
      isLoading,
      isDisableForm,
      loaderMessage,
      t,
    } = this.props;

    return (
      <Fragment>
        <Segment secondary className="content-header">
          <Header as="h4">
            <Icon name="settings" />
            {this.props.t(`${this.props.resource}:title`)}
          </Header>
        </Segment>
        <Segment>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column width="9">
                <Segment>
                  <Form size="small">
                    <Grid>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="required field">
                          <label>{t(this._getKey('label.field.grup'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Select
                            name="grup"
                            placeholder={t(
                              this._getKey('placeholder.field.grup')
                            )}
                            inputRef={this.grup}
                            value={selectedGrup}
                            onChange={this._handleGrupChange}
                            options={grup}
                            isClearable={false}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="9">
                <Segment size="mini">
                  <TreeView
                    ref={this.tree}
                    className="myCls"
                    showLine
                    checkable
                    navigation
                    selectable
                    onExpand={this._onExpand}
                    onSelect={this._onSelect}
                    onCheck={this._onCheck}
                    treeData={menu}
                    selectedKeys={selectedKeys}
                    checkedKeys={checkedKeys}
                    expandedKeys={expandedKeys}
                    disabled={isDisableForm || !post.grup}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <PageLoader active={isLoading} message={loaderMessage} />
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.action.onReset(this.props.resource);
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;

    if (statusForm === actionTypes.EDIT) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    }
  }

  _handleGrupChange(selected) {
    this.props.action.onGrupChange(this.props.resource, selected);
  }

  _onExpand(expandedKeys) {
    this.props.action.onExpand(this.props.resource, expandedKeys);
  }

  _onSelect(selectedKeys) {
    this.props.action.onSelect(this.props.resource, selectedKeys);
  }

  _onCheck(checkedKeys) {
    let leafKeys = [];
    checkedKeys.forEach((key) => {
      let node = this.tree.current._getNode(key);
      if (node) {
        if (!node.children) {
          leafKeys.push(node.id);
        }
        
      }
    });
    this.props.action.onCheck(this.props.resource, { checkedKeys, leafKeys });
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const { data, post, statusForm, focusElement } = state.module;
  const {
    menu,
    grup,
    expandedKeys,
    checkedKeys,
    selectedKeys,
    selectedGrup,
  } = data;

  return {
    menu,
    grup,
    expandedKeys: [...expandedKeys],
    checkedKeys,
    selectedKeys,
    post: post,
    selectedGrup,
    isLoading: state.loader.count > 0,
    isDisableForm: isDisableForm(statusForm),
    focusElement,
    statusForm,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        openForm: actions.openForm,
        onCheck: actions.onCheckedChange,
        onExpand: actions.onExpandedChange,
        onSelect: actions.onSelectedChange,
        onGrupChange: actions.onGrupChange,
        onFocusElement: actions.onFocusElement,
        onReset: actions.onReset,
      },
      dispatch
    ),
  };
};

Create.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  menu: PropTypes.array,
  grup: PropTypes.array,
  expandedKeys: PropTypes.array,
  checkedKeys: PropTypes.array,
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
