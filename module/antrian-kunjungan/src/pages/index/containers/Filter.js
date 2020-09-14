import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Form, Grid, Segment, Input } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import { Select, PreviewButton } from '@simrs/components';
import actions from '../redux/actions';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.focusElementHandler = this.focusElementHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.selectedChangeHandler = this.selectedChangeHandler.bind(this);
    this.keyDownSearchHandler = this.keyDownSearchHandler.bind(this);

    this.instalasi_id = createRef();
    this.unit_layanan_id = createRef();
    this.penjamin_id = createRef();
    this.dpjp_id = createRef();
    this.nama_pasien = createRef();
    this.norm = createRef();
    this.search = createRef();
  }

  componentDidMount() {
    this._bindKey();
  }

  componentWillUnmount() {
    this._unbindKey();
  }

  componentDidUpdate() {
    this.setFocus();
  }

  _bindKey() {
    let _this = this;

    MouseTrap.bindGlobal('alt+f', (e) => {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, 'instalasi_id');
    });

    MouseTrap.bindGlobal('alt+c', (e) => {
      e.preventDefault();
      _this._search();
    });
  }

  _unbindKey() {
    MouseTrap.unbind('alt+f');
    MouseTrap.unbind('alt+c');
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _search() {
    let { resource, post } = this.props;
    this.props.action.onSubmitFilter(resource, post);
  }

  submitHandler(e) {
    e.preventDefault();
    this._search();
  }

  keyDownSearchHandler(e) {
    e.preventDefault();
    if (13 === e.which) {
      this._search();
    }
  }

  selectedChangeHandler(name, selected) {
    this.props.action.onChangeSelect2(this.props.resource, name, selected);
  }

  focusElementHandler(e, nameRef) {
    if (13 === e.which) {
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const { resource, action } = this.props;
    action.onChangeInput(resource, { name, value });
  };

  getUnitLayananOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.instalasi_id) {
      options = data.unitLayanan.filter(
        (item) => item.instalasi_id === post.instalasi_id
      );
    }

    return options;
  };

  changeSelect2Hanlder = (name, selected) => {
    this.props.action.onChangeSelect2(this.props.resource, name, selected);
  };

  setFocus() {
    const { focusElement } = this.props;
    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      } else {
        this[focusElement].focus();
      }
    }
  }

  render() {
    const { data, selectedOption, post, t, loaderDpjp } = this.props;

    return (
      <Segment padded>
        <Form id={this.formId} size="mini">
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid className="form-grid">
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        <Trans i18nKey={this._getKey('jenis_layanan')} />
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Select
                        name="instalasi_id"
                        placeholder={t(this._getKey('pilih_jenis_layanan'))}
                        inputRef={this.instalasi_id}
                        onChange={(selected) =>
                          this.changeSelect2Hanlder('instalasi_id', selected)
                        }
                        value={selectedOption.instalasi_id}
                        options={data.instalasi}
                        onKeyDown={(e) =>
                          this.focusElementHandler(e, 'unit_layanan_id')
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        <Trans i18nKey={this._getKey('unit_layanan')} />
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Select
                        name="unit_layanan_id"
                        placeholder={t(this._getKey('pilih_unit_layanan'))}
                        inputRef={this.unit_layanan_id}
                        onChange={(selected) =>
                          this.changeSelect2Hanlder('unit_layanan_id', selected)
                        }
                        value={selectedOption.unit_layanan_id}
                        options={this.getUnitLayananOptions()}
                        onKeyDown={(e) =>
                          this.focusElementHandler(e, 'penjamin_id')
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t(this._getKey('status_pasien'))}</label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Select
                        name="penjamin_id"
                        placeholder={t(this._getKey('pilih_status_pasien'))}
                        inputRef={this.penjamin_id}
                        onChange={(selected) =>
                          this.changeSelect2Hanlder('penjamin_id', selected)
                        }
                        value={selectedOption.penjamin_id}
                        options={data.penjamin}
                        onKeyDown={(e) =>
                          this.focusElementHandler(e, 'dpjp_id')
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t(this._getKey('dokter_dpjp'))}</label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Select
                        name="dpjp_id"
                        placeholder={t(this._getKey('pilih_dokter_dpjp'))}
                        inputRef={this.dpjp_id}
                        onChange={(selected) =>
                          this.changeSelect2Hanlder('dpjp_id', selected)
                        }
                        value={selectedOption.dpjp_id}
                        options={data.dpjp}
                        onKeyDown={(e) =>
                          this.focusElementHandler(e, 'nama_pasien')
                        }
                        isLoading={loaderDpjp}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid className="form-grid">
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        <Trans i18nKey={this._getKey('pasien')} />
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Input
                        name="nama_pasien"
                        ref={this.nama_pasien}
                        value={post.nama_pasien}
                        onChange={this.inputChangeHandler}
                        onKeyDown={(e) => this.focusElementHandler(e, 'norm')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        <Trans i18nKey={this._getKey('norm')} />
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Input
                        name="norm"
                        ref={this.norm}
                        value={post.norm}
                        onChange={this.inputChangeHandler}
                        onKeyDown={(e) => this.focusElementHandler(e, 'search')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="8" className="field">
                      <PreviewButton
                        onKeyDown={this.keyDownSearchHandler}
                        tabIndex={-1}
                        as="a"
                        inputRef={this.search}
                        onClick={this.submitHandler}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = function (state) {
  const {
    data,
    selectedOption,
    post,
    focusElement,
    loaderDpjp,
    statusForm,
  } = state.default;

  return {
    data,
    selectedOption,
    post: post,
    focusElement,
    loaderDpjp,
    statusForm,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onChangeSelect2: actions.onChangeSelect2,
        onFocusElement: actions.onFocusElement,
        onSubmitFilter: actions.onSubmitFilter,
        onChangeInput: actions.onChangeFilter,
      },
      dispatch
    ),
  };
};

Filter.propTypes = {
  post: PropTypes.object,
  data: PropTypes.object,
  selectedOption: PropTypes.object,
  action: PropTypes.object,
  focusElement: PropTypes.string,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  loaderDpjp: PropTypes.bool,
  statusForm: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
