import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {remote} from 'electron';
import { Input} from 'semantic-ui-react';

const _window = remote.getCurrentWindow();
function RightMenu({ username, disabled, routers, history}) { 
    const disabledProp = disabled ? { disabled: true } : {};

    function _onExit() {
        _window.close();
    }

    function _onMinimize() {
        _window.minimize();
    }

    function _onMaximize() {
        if (!_window.isMaximized()) {
            _window.maximize();
        } else {
            _window.unmaximize();
        }
    }

    function changePasswordHandler() {
        const keyMenu = '_system_portal_change_password'
        let router = routers.find(router => router.key === keyMenu);
        if (router) {
            history.replace(`${router.path}?route=${keyMenu}`);
        }
    }

    const menus = [
        <div id="right-menu-search" key="1" style={{ marginLeft: 'auto', marginRight: 11 }}>
            <Input
                icon={{ name: 'search', link: true }}
                placeholder='Search users...'
                size="mini"
            />
        </div>,
        <x-menuitem key="2" {...disabledProp}>
            <x-icon name="face" />
            <x-label>{username}</x-label>
            <x-menu>
                <x-menuitem>
                    <x-icon name="account-circle" />
                    <x-label>Profile</x-label>
                </x-menuitem>
                <x-menuitem
                    onClick={changePasswordHandler}
                >
                    <x-icon name="lock" />
                    <x-label>Ganti Password</x-label>
                </x-menuitem>
                <x-menuitem
                    onClick={_onExit}
                >
                    <x-icon name="close" />
                    <x-label>Keluar</x-label>
                </x-menuitem>
            </x-menu>
        </x-menuitem>,
        <x-menuitem
            class="app-window-button"
            key="3"
            onClick={_onMinimize}
            title="Minimize"
        >
            <x-icon name="indeterminate-check-box" />
        </x-menuitem>,
        <x-menuitem
            class="app-window-button"
            key="4"
            onClick={_onMaximize}
            title={_window.isMaximized() ? "Restore" : "Maximize"}
        >
            <x-icon name={_window.isMaximized() ? "filter-none" : "check-box-outline-blank"} />
        </x-menuitem>,
        <x-menuitem
            class="app-window-button close"
            key="5"
            onClick={_onExit}
            title="Keluar"
        >
            <x-icon name="close" />
        </x-menuitem>
    ]

    return menus;
}

RightMenu.propTypes = {
    username: PropTypes.string.isRequired,
    history: PropTypes.object,
    disabled: PropTypes.bool,
}

export default withRouter(RightMenu);
