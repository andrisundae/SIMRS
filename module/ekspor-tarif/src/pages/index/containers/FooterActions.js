import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Menu } from 'semantic-ui-react';

import {
    FooterActionsContainer,
    PreviewButton,
    ExportButton,
} from '@simrs/components';
import {toastr} from '@simrs/common';
import { isGranted } from '@simrs/main/src/modules/auth';
import actions from '../actions';

class FooterActions extends Component {
    constructor(props) {
        super(props);

        this._onSearch = this._onSearch.bind(this);
        this._onExport = this._onExport.bind(this);
        this._onFocusElement = this._onFocusElement.bind(this);

        this.preview = createRef();
        this.export = createRef();
    }

    render() {
        return (
            <FooterActionsContainer>
                <div style={{ position: 'absolute', display: 'flex', width: '100%', backgroundColor: '#1b1c1d', bottom: 0 }}>
                    {this._isCanSearch() &&
                        <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
                            <PreviewButton
                                onClick={this._onSearch}
                                inputRef={this.preview}
                                onKeyDown={this._onFocusElement}
                                as="a"
                                tabIndex={-1}
                            />
                        </Menu.Item>
                    }
                    {this._isCanExport() &&
                        <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <ExportButton
                                onClick={this._onExport}
                                inputRef={this.export}
                                onKeyDown={this._onFocusElement}
                                as="a"
                                tabIndex={-1}
                            />
                        </Menu.Item>
                    }
                </div>
            </FooterActionsContainer>
        )
    }

    componentDidUpdate() {
        let { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
        this._bindKey();
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("alt+c");
        MouseTrap.unbind("alt+e");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+c', function (e) {
            e.preventDefault();
            if (_this._isCanSearch()) {
                _this.preview.current.focus();
                _this._onSearch();
            }
        });

        MouseTrap.bindGlobal('alt+e', function (e) {
            e.preventDefault();
            if (_this._isCanExport()) {
                _this.export.current.focus();
                _this._onExport();
            }
        });
    }

    _isCanSearch() {
        let { permissions } = this.props;
        let isValid = false;
        if (permissions.canSearch) {
            isValid = true;
        }

        return isValid;
    }

    _isCanExport() {
        let { permissions } = this.props;
        let isValid = false;
        if (permissions.canExport) {
            isValid = true;
        }

        return isValid;
    }

    _onSearch() {
        const { post, action, resource } = this.props;
        action.onSubmit(resource, 'search', post);
    }

    _onExport() {
        const { post, action, resource } = this.props;
        action.onSubmit(resource, 'export', post);
    }

    _onFocusElement(e) {
        if (e.which === 37 || e.which === 39) {
            e.preventDefault();

            let { name } = e.target;

            let nextElement = '';
            switch (name) {
                case 'preview':
                    nextElement = 'export';
                    break;
                case 'export':
                    nextElement = 'preview';
                    break;
                default:
                    nextElement = '';
                    break
            }

            this.props.action.onFocusElement(this.props.resource, nextElement);
        }
    }
}

const mapStateToProps = function (state) {
    const { form, focusElement } = state.default;

    return {
        permissions: {
            canSearch: isGranted(state.acl, 'view'),
            canExport: isGranted(state.acl, 'ekspor'),
        },
        post: {
            versi_tarif: form.post.versi_tarif,
            jenis_ekspor: form.post.jenis_ekspor,
            orders: form.post.orders,
        },
        focusElement,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                onSubmit: actions.filter.onSubmit,
                onFocusElement: actions.onFocusElement
            },
            dispatch
        ),
    }
}

FooterActions.propTypes = {
    permissions: PropTypes.object,
    action: PropTypes.object,
    post: PropTypes.object,
    focusElement: PropTypes.string,
    resource: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterActions);