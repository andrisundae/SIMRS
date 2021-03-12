import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Header, Grid, Form, Segment, Placeholder } from 'semantic-ui-react';

import CustomInput from '../components/CustomInput';
import actions from '../actions';
import selectors from '../selectors';
import { elementType } from '../../../static';

const CardPlaceholder = () => (
  <Grid.Column>
    <Segment raised>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  </Grid.Column>
);

const Loader = () => (
  <Grid columns={3} stackable>
    <CardPlaceholder />
    <CardPlaceholder />
    <CardPlaceholder />
  </Grid>
);

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement] && this[focusElement].focus) {
        this[focusElement].focus();
      }
    }
  }

  handleSelectedChange = (selected, name, indexKelompok, indexAturan) => {
    this.props.action.onChangeSelect(this.props.resource, {
      name,
      value: selected.value,
      indexKelompok,
      indexAturan,
    });
  };

  _renderFormElements(indexKelompok, daftarAturan) {
    if (!daftarAturan) {
      return null;
    }

    return daftarAturan.map((aturan, key) => {
      const nextElement = this.getNextElement(indexKelompok, key);
      let inputProps = {
        onKeyDown: (e) => this._onFocusElement(e, nextElement),
        onChange: (e) => this._handleInputChange(e, indexKelompok, key),
        disabled: this.props.isDisableForm,
        name: aturan.aturan,
      };
      switch (aturan.tipe_element) {
        case elementType.COMBOBOX: {
          inputProps = {
            ...inputProps,
            options: aturan.pilihan_nilai.map((option) => {
              option.label = option.value;
              return option;
            }),
            onChange: (selected) =>
              this.handleSelectedChange(
                selected,
                aturan.aturan,
                indexKelompok,
                key
              ),
            inputRef: (e) => (this[aturan.aturan] = e),
            value: { label: aturan.nilai, value: aturan.nilai },
            isDisabled: this.props.isDisableForm,
            isClearable: false,
          };

          break;
        }
        case elementType.CHECKBOX: {
          inputProps = {
            ...inputProps,
            inputRef: (e) => (this[aturan.aturan] = e),
            value: aturan.nilai,
            checked: aturan.nilai === '1',
            label: 'Ya',
          };
          break;
        }

        default: {
          inputProps = {
            ...inputProps,
            value: aturan.nilai,
            ref: (e) => (this[aturan.aturan] = e),
            type: aturan.is_angka === 0 ? 'text' : 'number',
          };
        }
      }
      return (
        <Grid.Row className="form-row" key={key}>
          <Grid.Column width="16" className="field">
            <label>{aturan.label}</label>
          </Grid.Column>
          <Grid.Column width="16" className="field">
            <CustomInput {...inputProps} elementType={aturan.tipe_element} />
          </Grid.Column>
        </Grid.Row>
      );
    });
  }

  _handleInputChange(e, indexKelompok, indexAturan) {
    const { name, value, checked, type } = e.target;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? '1' : '0';
    } else {
      val = value;
    }
    this.props.action.onChangeInput(this.props.resource, {
      name,
      value: val,
      indexKelompok,
      indexAturan,
    });
  }

  _onFocusElement(e, name) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, name);
    }
  }

  getNextElement = (indexKelompok, indexAturan) => {
    const { post } = this.props;
    let nextElement = 'save';
    if (post.daftarKelompok[indexKelompok]) {
      indexAturan += 1;
      if (post.daftarKelompok[indexKelompok].daftarAturan[indexAturan]) {
        nextElement =
          post.daftarKelompok[indexKelompok].daftarAturan[indexAturan].aturan;
      } else {
        indexKelompok += 1;
        indexAturan = 0;
        if (post.daftarKelompok[indexKelompok]) {
          if (post.daftarKelompok[indexKelompok].daftarAturan[indexAturan]) {
            nextElement =
              post.daftarKelompok[indexKelompok].daftarAturan[indexAturan]
                .aturan;
          }
        }
      }
    }

    return nextElement;
  };

  render() {
    const { post, loadingDetail } = this.props;
    const column1 = post.daftarKelompok.filter(
      (daftarKelompok, index) => 0 === index % 3
    );
    const column2 = post.daftarKelompok.filter(
      (daftarKelompok, index) => 1 === index % 3
    );
    const column3 = post.daftarKelompok.filter(
      (daftarKelompok, index) => 2 === index % 3
    );

    return (
      <Form size="mini" style={{ marginBottom: 30 }}>
        {loadingDetail ? (
          <Loader />
        ) : (
          <Grid columns="3">
            <Grid.Row>
              <Grid.Column>
                {column1.map((row, index) => {
                  return (
                    <Fragment>
                      <Header
                        as="h4"
                        attached="top"
                        style={{ marginTop: 0 < index ? 30 : 10 }}
                      >
                        {row.label}
                      </Header>
                      <Segment attached>
                        <Grid className="form-grid">
                          {this._renderFormElements(index, row.daftarAturan)}
                        </Grid>
                      </Segment>
                    </Fragment>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                {column2.map((row, index) => {
                  return (
                    <Fragment>
                      <Header
                        as="h4"
                        attached="top"
                        style={{ marginTop: 0 < index ? 30 : 10 }}
                      >
                        {row.label}
                      </Header>
                      <Segment attached>
                        <Grid className="form-grid">
                          {this._renderFormElements(index, row.daftarAturan)}
                        </Grid>
                      </Segment>
                    </Fragment>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                {column3.map((row, index) => {
                  return (
                    <Fragment>
                      <Header
                        as="h4"
                        attached="top"
                        style={{ marginTop: 0 < index ? 30 : 10 }}
                      >
                        {row.label}
                      </Header>
                      <Segment attached>
                        <Grid className="form-grid">
                          {this._renderFormElements(index, row.daftarAturan)}
                        </Grid>
                      </Segment>
                    </Fragment>
                  );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Form>
    );
  }
}

const mapStateToProps = function (state) {
  const { post, focusElement, data, statusForm, loadingDetail } = state.module;

  return {
    post,
    focusElement,
    statusForm,
    data,
    isDisableForm: selectors.isDisableForm(state.module),
    isLoading: state.loader.count > 0,
    loadingDetail,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
};

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
