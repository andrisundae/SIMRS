import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import { Select } from '@simrs/components';
import {sumberLainActions, filterActions, moduleActions} from '@simrs/main/src/modules/setting/default';

class FilterSumberLain extends Component {
    constructor(props) {
        super(props);

        this.pelaksana = createRef();
    }

    componentDidUpdate() {
        let { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    _handleSelect2SumberLain(name, selected) {
        this.props.action.onSelect2SumberLainChange(this.props.resource, name, selected);
    }

    _getSelect2Value(name) {
        let value = null;

        switch (name) {
            case 'pelaksana': {
                let selectedValue = this.props.postNeeded[name];
                if (selectedValue > 0) {
                    value = this.props.dataSumberLain[name].find(row => row.value === selectedValue);
                }
            }
                break;
            default:
                break;
        }

        return value;
    }

    _onFocusElement(e, nameRef) {
        if (13 === e.which) {
            if (e.target.name) {
                e.preventDefault();
            }

            this.props.action.onFocusElement(this.props.resource, nameRef);
        }
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    render() {
        const { dataSumberLain, t} = this.props;

        return (
          <Form id={this.formId} size="mini">
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  <Grid className="form-grid">
                    <Grid.Row className="form-row">
                      <Grid.Column width="3" className="field">
                        <label><Trans i18nKey={this._getKey('label.field.pelaksana')} /></label>
                      </Grid.Column>
                      <Grid.Column width="11" className="field">
                        <Select
                          name="pelaksana"
                          placeholder={t(this._getKey('placeholder.field.pelaksana'))}
                          inputRef={this.pelaksana}
                          value={this._getSelect2Value('pelaksana')}
                          onChange={(selected) => this._handleSelect2SumberLain('pelaksana', selected)}
                          options={dataSumberLain.pelaksana}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        );
    }
}

const mapStateToProps = function (state) {
    const page = state.page;

    return {
        dataFilter: page.filter.data,
        dataSumberLain: page.sumberLain.data,
        postNeeded: page.post.needed,
        postOptional: page.post.optional,
        focusElement: page.focusElement,
        submitting: page.submitting
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                onSelect2SumberLainChange: sumberLainActions.onSelect2Change,
                onSelect2FilterChange: filterActions.onSelect2Change,
                onFocusElement: moduleActions.onFocusElement
            },
            dispatch
        ),
    }
}

FilterSumberLain.propTypes = {
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    dataFilter: PropTypes.object,
    dataSumberLain: PropTypes.object,
    postNeeded: PropTypes.object,
    postOptional: PropTypes.object,
    focusElement: PropTypes.string,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSumberLain);
