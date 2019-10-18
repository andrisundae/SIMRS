import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Header, Grid, Form, Input, Segment, Divider, Placeholder } from 'semantic-ui-react';

import {
  Select
} from '@simrs/components';
import actions from '../actions';
import selectors from '../selectors';


class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
  }

  render() {
    const { post, isLoading } = this.props;

    return (
      <Form size="mini">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              {isLoading ? (
                <Placeholder fluid style={{marginTop: 20}}>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                post.daftarKelompok.map((row, index) => {
                  return (
                    <Fragment key={index}>
                      <Divider fitted hidden />
                      <Header as='h4' attached='top' style={{ marginTop: 10 }}>
                        {row.label}
                      </Header>
                      <Segment attached>
                        <Grid className="form-grid">
                          {this._renderFormElements(index, row.daftarAturan)}
                        </Grid>
                      </Segment>
                    </Fragment>
                  )
                })
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement]) {
        this[focusElement].focus();
      }
    }
  }

  handleSelectedChange = (selected, name, indexKelompok, indexAturan) => {
    this.props.action.onChangeSelect(this.props.resource, {
      name,
      value: selected.value,
      indexKelompok,
      indexAturan
    });
  }

  _renderFormElements(indexKelompok, daftarAturan) {
    if (!daftarAturan) {
      return null;
    }

    return (
      daftarAturan.map((aturan, key) => {
        const nextElement = daftarAturan[key + 1] ? daftarAturan[key + 1].aturan : 'save';
        return (
          <Grid.Row className="form-row" key={key}>
            <Grid.Column width="7" className="field">
              <label>{aturan.label}</label>
            </Grid.Column>
            <Grid.Column width="9" className="field">
              {aturan.is_combo_box === 0 &&
                <Input
                  name={aturan.aturan}
                  type={aturan.is_angka === 0 ? 'text' : 'number'}
                  ref={(e) => this[aturan.aturan] = e}
                  value={aturan.nilai}
                  disabled={this.props.isDisableForm}
                  onKeyDown={(e) => this._onFocusElement(e, nextElement)}
                  onChange={(e) => this._handleInputChange(e, indexKelompok, key)}
                />
              }

              {aturan.is_combo_box === 1 &&
                <Select
                  name={aturan.aturan}
                  inputRef={(e) => this[aturan.aturan] = e}
                  onChange={(selected) => this.handleSelectedChange(selected, aturan.aturan, indexKelompok, key)}
                  value={{ label: aturan.nilai, value: aturan.nilai}}
                  isDisabled={this.props.isDisableForm}
                  isClearable={false}
                  onKeyDown={(e) => this._onFocusElement(e, nextElement)}
                  options={aturan.pilihan_nilai.map(option => {
                    option.label = option.value;
                    return option
                  })}
                />
              }
            </Grid.Column>
          </Grid.Row>
        )
      })
    )
  }

  _handleInputChange(e, indexKelompok, indexAturan) {
    const { name, value } = e.target;
    this.props.action.onChangeInput(this.props.resource, { name, value, indexKelompok, indexAturan });
  }

  _onFocusElement(e, name) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, name);
    }
  }
}

const mapStateToProps = function (state) {
  const { post, focusElement, data, statusForm } = state.module;

  return {
    post,
    focusElement,
    statusForm,
    data,
    isDisableForm: selectors.isDisableForm(state.module),
    isLoading: state.loader.count > 0,
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
  isLoading: PropTypes.bool,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  data: PropTypes.object,
  isDisableForm: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
