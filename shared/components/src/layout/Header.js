import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Header as SmHeader } from 'semantic-ui-react';
import { useAppState } from '@simrs/components';
import MainMenu from './MainMenu';
import RightMenu from './RightMenu';
import 'xel/xel.js';

function Header({ logo, match, username, contexts, routers, history }) {
  const { disabledMainMenu } = useAppState();

  return (
    <x-menubar
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
        WebkitAppRegion: 'drag',
        paddingRight: 0,
      }}
      size="small"
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
          {logo === 'REKAM_MEDIS' && (
            <Icon name="heartbeat" style={{ fontSize: '2em' }} />
          )}
        </SmHeader>
      </div>
      <MainMenu
        disabled={disabledMainMenu}
        contexts={contexts}
        routers={routers}
      />
      <RightMenu
        disabled={disabledMainMenu}
        username={username}
        routers={routers}
      />
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
