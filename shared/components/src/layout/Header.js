import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { remote } from 'electron';

import { Icon, Header as SmHeader } from 'semantic-ui-react';

import MainMenu from './MainMenu';
import RightMenu from './RightMenu';

import 'xel/themes/macos.css';

import 'xel/xel.min.js';

const { ipcMain } = remote;

function Header({ logo, match, username, contexts, routers, history }) {
  const [isDisabled, setDisabled] = useState(false);

  function handleDisableHeader() {
    setDisabled(true);
  }

  function handleEnableHeader() {
    setDisabled(false);
  }

  // useEffect(() => {
  //     ipcMain.on('disable-header', handleDisableHeader);
  //     ipcMain.on('enable-header', handleEnableHeader);

  //     return () => {
  //         console.log('test')
  //         ipcMain.removeListener('disable-header', handleDisableHeader);
  //         ipcMain.removeListener('enable-header', handleEnableHeader);
  //     };
  // }, [isDisabled]);

  return (
    <x-menubar
      class="layout-header"
      style={{
        height: 40,
        zIndex: 28,
        top: 0,
        position: 'fixed',
        left: 0,
        right: 'auto',
        bottom: 'auto',
        width: '100%',
        margin: 0,
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <SmHeader
          as="h6"
          icon
          style={{ marginTop: 7, marginBottom: 0, marginRight: 9 }}
        >
          {logo === 'BILLING' && (
            <Icon name="bold" style={{ fontSize: '2em' }} />
          )}
          {logo === 'SISTEM' && (
            <Icon name="stripe s" style={{ fontSize: '2em' }} />
          )}
        </SmHeader>
      </div>
      <MainMenu disabled={isDisabled} contexts={contexts} routers={routers} />
      <RightMenu disabled={isDisabled} username={username} routers={routers} />
    </x-menubar>
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
};

export default withRouter(Header);
