import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Divider } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import { Select } from '@simrs/components';
import {sumberLainActions, filterActions, moduleActions} from '@simrs/main/src/modules/setting/default';

class FilterSumberLain extends Component {
    constructor(props) {
        super(props);

        this.grup = createRef();
        this.instalasi = createRef();
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

    _handleSelect2Filter(name, selected) {
        let type = '';
        switch (name) {
            case 'instalasi':
                type = 'optional';
                break;
            default:
                break;
        }

        let data = { ...selected, type };
        this.props.action.onSelect2FilterChange(this.props.resource, name, data);
    }

    _getSelect2Value(name) {
        let value = null;

        switch (name) {
            case 'grup': {
                let selectedValue = this.props.postNeeded[name];
                if (selectedValue > 0) {
                    value = this.props.dataSumberLain[name].find(row => row.value === selectedValue);
                }
            }
                break;
            case 'instalasi': {
                let selectedValue = this.props.postOptional[name];
                if (selectedValue > 0) {
                    value = this.props.dataFilter.data_filter_sumber[name].find(row => row.value === selectedValue);
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
        const { dataFilter, dataSumberLain, t, postNeeded} = this.props;

        return (
          <Form id={this.formId} size="mini">
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  <Grid className="form-grid">
                    <Grid.Row className="form-row">
                        <Grid.Column width="5" className="field">
                            <label><Trans i18nKey={this._getKey('label.field.grup')} /></label>
                        </Grid.Column>
                        <Grid.Column width="9" className="field">
                            <Select
                                name="grup"
                                placeholder={t(this._getKey('placeholder.field.grup'))}
                                inputRef={this.grup}
                                value={this._getSelect2Value('grup')}
                                onChange={(selected) => this._handleSelect2SumberLain('grup', selected)}
                                options={dataSumberLain.grup}
                                onKeyDown={(e) => this._onFocusElement(e, 'instalasi')}
                                isClearable={false}
                            />
                        </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
                <Divider fitted style={{ marginTop: 0, marginBottom: 6 }} />
                <Grid.Row>
                    <Grid.Column>
                        <Grid className="form-grid">
                            <Grid.Row className="form-row">
                                <Grid.Column width="5" className="field">
                                        <label>{t(this._getKey('label.field.instalasi'))}</label>
                                </Grid.Column>
                                <Grid.Column width="9" className="field">
                                    <Select
                                        name="instalasi"
                                        placeholder={t(this._getKey('placeholder.field.instalasi'))}
                                        inputRef={this.instalasi}
                                        value={this._getSelect2Value('instalasi')}
                                        onChange={(selected) => this._handleSelect2Filter('instalasi', selected)}
                                        options={dataFilter.data_filter_sumber.instalasi}
                                        isDisabled={postNeeded.grup ? false : true}
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
