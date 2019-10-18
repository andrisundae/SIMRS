import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Form, Grid } from 'semantic-ui-react';

import { validator as commonValidator } from '@simrs/common';
import { SearchButton, PrevButton, NextButton } from '@simrs/components';

import { filterActions as actions } from '../actions';
import { isDisableForm } from '../reducer';
import { selectors, context } from '../../../setting/aturan-aplikasi';

const MIN_CHAR_CONTEXT = context.MINCHARPENCARIANMASTER;
const { getFirstError } = commonValidator;
const validator = commonValidator.default;

class Filter extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
        const { children,
            isDisableForm,
            onNext,
            isDisableNext,
            onPrev,
            isDisablePrev,
            isDisableSearch,
            rowStyle
        } = this.props;

        return (
            <Form id="form-search" onSubmit={this._handleSubmit} size="mini">
                <Grid>
                    <Grid.Row>
                        <Grid.Column floated='left' width={13} style={{ ...rowStyle }}>
                            <Form.Group inline style={{ marginBottom: 0 }}>
                                {children}
                                <SearchButton disabled={isDisableForm || isDisableSearch} />
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3} style={{ paddingLeft: 10, paddingRight: 0, ...rowStyle }}>
                            <PrevButton as="a" disabled={isDisableForm || isDisablePrev} onClick={onPrev} />
                            <NextButton as="a" disabled={isDisableForm || isDisableNext} onClick={onNext} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Form>
        )
    }

    componentDidMount() {
        this.props.action.onReset(this.props.resource, this.props.subResource);
    }

    componentDidUpdate() {
        this._bindKey();
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("alt+c");
        MouseTrap.unbind("esc");
    }

    _bindKey() {
        let _this = this;
        MouseTrap.bindGlobal('esc', function (e) {
            e.preventDefault();
            if ((!_this.props.isDisableForm && !_this.props.isDisablePrev)) {
                _this.props.onPrev();
            }
        });

        MouseTrap.bindGlobal('alt+c', function (e) {
            e.preventDefault();
            _this._search();
        });
    }

    _search() {
        let { resource, post, subResource } = this.props;
        let errors = this._validation(post);

        if (_.isEmpty(errors) || post.filter_value.length <= 0) {
            this.props.action.onSubmitFilter(resource, subResource, post);
        } else {
            toastr.warning('Kesalahan filter', getFirstError(errors));
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._search();
    }

    _validation(post) {
        const rules = {
            [MIN_CHAR_CONTEXT]: { minlength: this.props.minCharSearch }
        }
        const messages = {
            [MIN_CHAR_CONTEXT]: { minlength: `Minimal karakter pencarian ${this.props.minCharSearch} huruf` }
        }

        let errors = validator({ [MIN_CHAR_CONTEXT]: post.filter_value }, rules, messages);

        return errors;
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.nested;

    return {
        post: filter.post,
        isDisableForm: !isDisableForm(module),
        minCharSearch: parseInt(selectors.get(state, MIN_CHAR_CONTEXT)) || 0
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(actions, dispatch),
    }
}

Filter.propTypes = {
    post: PropTypes.object,
    rowStyle: PropTypes.object,
    action: PropTypes.object,
    isDisableForm: PropTypes.bool,
    children: PropTypes.node,
    resource: PropTypes.string.isRequired,
    minCharSearch: PropTypes.number,
    subResource: PropTypes.string.isRequired,
};

Filter.defaultProps = {
    rowStyle: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
