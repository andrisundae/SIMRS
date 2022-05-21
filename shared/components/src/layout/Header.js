import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Header as SmHeader } from 'semantic-ui-react';
import { useAppState } from '@simrs/components';
import MainMenu from './MainMenu';
import RightMenu from './RightMenu';
import 'xel/xel.js';

function Header({ logo, match, username, contexts, routers, history }) {
  const { disabledMainMenu } = useAppState();

  const goToDashboardHandler = useCallback(() => {
    let path = '/billing/dashboard';
    if (logo === 'SISTEM') {
      path = '/system/dashboard';
    } else if (logo === 'FARMASI') {
      path = '/farmasi/dashboard';
    } else if (logo === 'REKAM_MEDIS') {
      path = '/rekam_medis/dashboard';
    }
    history.push(path);
  }, [history, logo]);

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
        backgroundColor: 'white',
        borderBottom: '1px solid #f3f4f5',
      }}
    >
      <SmHeader
        onClick={goToDashboardHandler}
        className={`my-0 mx-2 ${
          logo === 'REKAM_MEDIS' ? 'mt-5' : 'mt-2'
        } cursor-pointer`}
        as="h6"
        icon
      >
        {logo === 'BILLING' && <Icon name="bold" className="text-3xl" />}
        {logo === 'SISTEM' && (
          <Icon name="stripe s" style={{ fontSize: '2em' }} />
        )}
        {logo === 'FARMASI' && (
          <Icon name="pills" style={{ fontSize: '2em' }} />
        )}
        {logo === 'REKAM_MEDIS' && (
          <Icon name="heartbeat" style={{ fontSize: '2em' }} />
        )}
      </SmHeader>
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
