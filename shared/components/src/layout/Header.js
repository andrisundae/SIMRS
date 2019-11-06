import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { remote } from 'electron';

import { Menu, Container } from 'semantic-ui-react';

import MainMenu from './MainMenu';
import RightMenu from './RightMenu';

import "xel/themes/macos.css";

import "xel/xel.min.js"

const { ipcMain } = remote;

function Header({logo, match, username, contexts, routers, history}) {
    const [isDisabled, setDisabled] = useState(false);

    function handleDisableHeader() {
        setDisabled(true);
    }

    function handleEnableHeader() {
        setDisabled(false);
    }

    useEffect(() => {
        ipcMain.on('disable-header', handleDisableHeader);
        ipcMain.on('enable-header', handleEnableHeader);

        return () => {
            ipcMain.removeListener('disable-header', handleDisableHeader);
            ipcMain.removeListener('enable-header', handleEnableHeader);
        };
    });

    return (
        <div className="layout-header">
            {/* <Menu className="content-header" borderless fixed="top" color="black" inverted size="tiny">
                <Menu.Item
                    header
                    disabled={isDisabled}
                    link
                    onClick={() => history.replace(`${match.url}/dashboard`)}
                >
                    {logo}
                </Menu.Item>
                <MainMenu disabled={isDisabled} contexts={contexts} routers={routers} />
                <RightMenu disabled={isDisabled} username={username} routers={routers} />
            </Menu> */
            }
            <x-menubar>
                <x-menuitem>
                    <x-label>{logo}</x-label>
                </x-menuitem>
                <MainMenu disabled={isDisabled} contexts={contexts} routers={routers} />
                <RightMenu disabled={isDisabled} username={username} routers={routers} />
            </x-menubar>
        </div>
    );
}

const componentProptypes = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.element,
]);

Header.propTypes = {
    children: PropTypes.node,
    match: PropTypes.object,
    logo: componentProptypes.isRequired,
    contexts: PropTypes.array,
    routers: PropTypes.array,
    history: PropTypes.object,
    menu: PropTypes.array,
    location: PropTypes.object,
    username: PropTypes.string,
}

export default withRouter(Header);
