import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
    FooterActionsContainer,
    SaveButton,
} from '@simrs/components';
import { getPermissions } from '@simrs/main/src/modules/auth';
import actions from '../actions';

class FooterActions extends Component {
    constructor(props) {
        super(props);

        this._onSave = this._onSave.bind(this);

        this.save = createRef();
    }

    render() {
        return (
            <FooterActionsContainer>
                <Fragment>
                    {this._isCanSave() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <SaveButton
                            onClick={this._onSave}
                            inputRef={this.save}
                        />
                        </Menu.Item>
                    }
                </Fragment>
            </FooterActionsContainer>
        )
    }

    componentDidMount() {
        this._bindKey();
    }

    componentDidUpdate() {
        let { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("alt+s");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+s', function (e) {
            e.preventDefault();
            if (_this._isCanSave()) {
                _this._onSave();
            }
        });
    }

    _isCanSave() {
        return true;
    }

    _onSave() {
        this.props.action.onSave(this.props.resource, this.props.post);
    }
}

const mapStateToProps = function (state, props) {
    const { post, focusElement } = state.module;

    return {
        customPermissions: getPermissions(props.permissions),
        post,
        focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                onSave: actions.save.request,
                onFocusElement: actions.onFocusElement
            },
            dispatch
        ),
    }
}

FooterActions.propTypes = {
    permissions: PropTypes.array,
    customPermissions: PropTypes.object,
    action: PropTypes.object,
    post: PropTypes.object,
    focusElement: PropTypes.string,
    resource: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
