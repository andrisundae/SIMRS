import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {remote} from 'electron';
// import { useTranslation } from 'react-i18next';

const _window = remote.getCurrentWindow();
function RightMenu({ username, disabled, routers, history}) { 
    const disabledProp = disabled ? { disabled: true } : {};
    // const [t] = useTranslation();

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
        <x-menuitem key="1" style={{ marginLeft: 'auto' }} {...disabledProp}>
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
            key="2"
            onClick={_onMinimize}
            title="Minimize"
        >
            <x-icon name="indeterminate-check-box" />
        </x-menuitem>,
        <x-menuitem
            class="app-window-button"
            key="3"
            onClick={_onMaximize}
            title={_window.isMaximized() ? "Restore" : "Maximize"}
        >
            <x-icon name={_window.isMaximized() ? "filter-none" : "check-box-outline-blank"} />
        </x-menuitem>,
        <x-menuitem
            class="app-window-button close"
            key="4"
            onClick={_onExit}
            title="Keluar"
        >
            <x-icon name="close" />
        </x-menuitem>
    ]

    return menus;

    // return (
    //     <Menu.Menu position='right' className="right-menu">
    //         <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }} disabled={disabled}>
    //             <Input icon='search' placeholder={'Cari Pasien'} disabled={disabled}/>
    //         </Menu.Item>
    //         <Dropdown item text={username} style={{ paddingLeft: 10, paddingRight: 10 }} disabled={disabled}>
    //             <Dropdown.Menu>
    //                 <Dropdown.Item icon="user md" text="My Profile" />
    //                 <Dropdown.Item
    //                     icon="lock"
    //                     text="Ganti Password"
    //                     onClick={() => changePasswordHandler('_system_portal_change_password')}
    //                     active={currentRoute === '_system_portal_change_password'}
    //                 />
    //                 <Dropdown.Divider />
    //                 <Dropdown.Item icon="window close" text="Keluar" onClick={_onExit}/>
    //             </Dropdown.Menu>
    //         </Dropdown>
    //         <Menu.Item title={'Minimize'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onMinimize} disabled={disabled}>
    //             <Icon name='window minimize' />
    //         </Menu.Item>
    //         {!isMaximized &&
    //             <Menu.Item title={'Maximize'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onMaximize} disabled={disabled}>
    //                 <Icon name='window maximize' />
    //             </Menu.Item>
    //         }
    //         {isMaximized &&
    //             <Menu.Item title={'Restore'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_unMaximize} disabled={disabled}>
    //                 <Icon name='window restore' />
    //             </Menu.Item>
    //         }
    //         <Menu.Item title={'Exit'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onExit} disabled={disabled}>
    //             <Icon name='window close' />
    //         </Menu.Item>
    //     </Menu.Menu>
        
    // );
}

RightMenu.propTypes = {
    username: PropTypes.string.isRequired,
    history: PropTypes.object,
    disabled: PropTypes.bool,
}

export default withRouter(RightMenu);
