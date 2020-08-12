import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';

import { Input, Form, Grid } from 'semantic-ui-react';
import {
  isDisableForm,
  filterActions,
  moduleActions,
} from '@simrs/main/src/modules/master/default';
import { SearchButton, Select } from '@simrs/components';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import localActions from '../actions';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.unit_layanan = createRef();
    this.nama_barang = createRef();
    this.SearchButton = createRef();

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleSelectOption = this._handleSelectOption.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let thisPost = this.props.post;
    let nextPost = nextProps.post;

    if (
      thisPost === nextPost &&
      this.props.isDisableForm === nextProps.isDisableForm &&
      this.props.unit_list === nextProps.unit_list
    ) {
      return false;
    }

    return true;
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  componentDidMount() {
    let _this = this;
    MouseTrap.bind('alt+f', function (e) {
      e.preventDefault();

      if (!_this.props.isDisableForm) {
        if (_this.unit_layanan) {
          _this.unit_layanan.current.focus();
        }
      }
    });
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (!this.props.isDisableForm) {
      if (focusElement) {
        if (this[focusElement] && this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    }
  }

  render() {
    const { post, isDisableForm, unit_list, t } = this.props;
    return (
      <Form id="form-search" onSubmit={this._handleSubmit} size="mini">
        <Grid columns="2">
          <Grid.Column>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="6" className="field left aligned">
                  <label>{t(this._getKey('label.filter.unit'))}</label>
                </Grid.Column>
                <Grid.Column width="10" className="field">
                  <Select
                    name="unit_layanan"
                    placeholder={t(this._getKey('placeholder.filter.unit'))}
                    inputRef={this.unit_layanan}
                    isDisabled={isDisableForm}
                    onChange={(e) =>
                      this._handleSelectOption(
                        'id_unit_layanan',
                        'unit_layanan',
                        e
                      )
                    }
                    value={this._generateSelectedValue(
                      post.id_unit_layanan,
                      post.unit_layanan
                    )}
                    onKeyDown={(e) => this._onFocusElement(e, 'nama_barang')}
                    options={unit_list}
                    isClearable={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="6" className="field left aligned">
                  <label>{t(this._getKey('label.filter.nama_barang'))}</label>
                </Grid.Column>
                <Grid.Column width="10" className="field">
                  <Input
                    name="nama_barang"
                    ref={this.nama_barang}
                    value={post.nama_barang}
                    disabled={isDisableForm}
                    onChange={this._handleFilterChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <label>&nbsp;</label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <SearchButton
                  inputRef={this.SearchButton}
                  disabled={isDisableForm}
                />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._search();
  }

  _handleFilterChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeFilter(this.props.resource, { name, value });
  }

  _generateSelectedValue(idx, val) {
    let value = null;

    if (idx && val) {
      value = { value: idx, label: val };
    }

    return value;
  }

  _handleSelectOption(idx, val, selected) {
    this.props.action.onChangeSelect(this.props.resource, {
      idx,
      val,
      selected,
    });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _search() {
    let { resource, post } = this.props;

    if (post.filter_value.length <= 0) {
      this.props.action.onSubmitFilter(resource, post);
    }
  }
}

const mapStateToProps = function (state, props) {
  const { filter, module } = state.default;
  const minCharSearch = props.settings.find(
    (setting) => setting.aturan === context.MINCHARPENCARIANMASTER
  );

  return {
    post: filter.post,
    unit_list: filter.data.unit_list,
    focusElement: module.focusElement,
    isDisableForm: !isDisableForm(module),
    minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...filterActions,
        ...moduleActions,
        onChangeSelect: localActions.onChangeSelect,
      },
      dispatch
    ),
  };
};

Filter.propTypes = {
  post: PropTypes.object,
  action: PropTypes.object,
  isDisableForm: PropTypes.bool,
  minCharSearch: PropTypes.number,
  resource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  settings: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
