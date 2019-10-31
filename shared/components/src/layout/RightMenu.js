import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {remote} from 'electron';
// import { useTranslation } from 'react-i18next';

const _window = remote.getCurrentWindow();
function RightMenu({ username, disabled, routers, history}) { 
    const [isMaximized, setMaximized] = useState(_window.isMaximized());
    const [currentRoute, setCurrentRoute] = useState('');
    // const [t] = useTranslation();

    function _onExit() {
        _window.close();
    }

    function _onMinimize() {
        setMaximized(false);
        _window.minimize();
    }

    function _onMaximize() {
        setMaximized(true);
        _window.maximize();
    }

    function _unMaximize() {
        setMaximized(false);
        _window.unmaximize();
    }

    function changePasswordHandler(keyMenu) {
        let router = routers.find(router => router.key === keyMenu);
        if (router) {
            history.replace(`${router.path}?route=${keyMenu}`);
            setCurrentRoute(keyMenu);
        }
    }

    return (
        <Menu.Menu position='right' className="right-menu">
            <Menu.Item style={{ paddingLeft: 5, paddingRight: 5 }} disabled={disabled}>
                <Input icon='search' placeholder={'Cari Pasien'} disabled={disabled}/>
            </Menu.Item>
            <Dropdown item text={username} style={{ paddingLeft: 10, paddingRight: 10 }} disabled={disabled}>
                <Dropdown.Menu>
                    <Dropdown.Item icon="user md" text="My Profile" />
                    <Dropdown.Item
                        icon="lock"
                        text="Ganti Password"
                        onClick={() => changePasswordHandler('_system_portal_change_password')}
                        active={currentRoute === '_system_portal_change_password'}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item icon="window close" text="Keluar" onClick={_onExit}/>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item title={'Minimize'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onMinimize} disabled={disabled}>
                <Icon name='window minimize' />
            </Menu.Item>
            {!isMaximized &&
                <Menu.Item title={'Maximize'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onMaximize} disabled={disabled}>
                    <Icon name='window maximize' />
                </Menu.Item>
            }
            {isMaximized &&
                <Menu.Item title={'Restore'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_unMaximize} disabled={disabled}>
                    <Icon name='window restore' />
                </Menu.Item>
            }
            <Menu.Item title={'Exit'} style={{ paddingLeft: 10, paddingRight: 5 }} onClick={_onExit} disabled={disabled}>
                <Icon name='window close' />
            </Menu.Item>
        </Menu.Menu>
    );
}

RightMenu.propTypes = {
    username: PropTypes.string.isRequired,
    history: PropTypes.object,
    disabled: PropTypes.bool,
}

export default withRouter(RightMenu);
