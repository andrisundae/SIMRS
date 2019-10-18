import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
    FooterActionsContainer,
    ImportButton,
    confirmation
} from '@simrs/components';
import { getPermissions } from '../../auth';
import actions from '../actions';

class FooterActions extends Component {
    constructor(props) {
        super(props);

        this._onImport = this._onImport.bind(this);

        this.import = createRef();
    }

    render() {
        let isDisabled = false;
        const { isSocketConnected, isStartedUpload} = this.props;
        if (!isSocketConnected) {
            isDisabled = true;
        } else {
            if (isStartedUpload) {
                isDisabled = true;
            }
        }

        return (
            <FooterActionsContainer>
                <Fragment>
                    {this._isCanImport() &&
                        <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
                        <ImportButton
                            onClick={this._onImport}
                            inputRef={this.import}
                            disabled={isDisabled}
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
        MouseTrap.unbind("alt+i");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+i', function (e) {
            e.preventDefault();
            if (_this._isCanImport()) {
                _this._onImport();
            }
        });
    }

    _isCanImport() {
        let {
            permissions
        } = this.props;
        let isValid = false;
        if (permissions.canImport) {
            isValid = true;
        }

        return isValid;
    }

    _onImport() {
        const { t, resource, action, post } = this.props;
        confirmation({
            title: t(`common:dialog.confirmation.title`),
            message: t(`common:dialog.confirmation.delete`),
            buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
            onOk: () => action.onImport(resource, post),
        });
    }
}

const mapStateToProps = function (state, props) {
    const {
        statusForm,
        post,
        isStartedUpload,
        focusElement,
        isSocketConnected
    } = state.module;

    return {
        permissions: props.permissions || getPermissions(state.acl),
        statusForm,
        post,
        isStartedUpload,
        isSocketConnected,
        focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onImport: actions.onImport,
        },
            dispatch
        ),
    }
}

FooterActions.propTypes = {
    permissions: PropTypes.object,
    action: PropTypes.object,
    statusForm: PropTypes.string,
    post: PropTypes.object,
    focusElement: PropTypes.string,
    isStartedUpload: PropTypes.bool,
    isSocketConnected: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    t: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);
