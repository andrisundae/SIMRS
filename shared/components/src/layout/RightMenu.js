import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { remote } from 'electron';
import { Input } from 'semantic-ui-react';
import { ReactComponent as MaximizeIcon } from '../static/svg/maximize.svg';
import { ReactComponent as CloseIcon } from '../static/svg/close.svg';
import { ReactComponent as MinusIcon } from '../static/svg/minus.svg';
import { ReactComponent as MinimizeIcon } from '../static/svg/minimize.svg';

const _window = remote.getCurrentWindow();
function RightMenu({ username, disabled, routers, history }) {
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
    const keyMenu = '_system_portal_change_password';
    let router = routers.find((router) => router.key === keyMenu);
    if (router) {
      history.replace(`${router.path}?route=${keyMenu}`);
    }
  }

  const menus = [
    <div
      id="right-menu-search"
      key="1"
      style={{ marginLeft: 'auto', marginRight: 11 }}
    >
      <Input
        icon={{ name: 'search', link: true }}
        placeholder="Search users..."
        size="mini"
      />
    </div>,
    <x-menuitem key="2" {...disabledProp}>
      <x-icon
        name="person"
        iconset="https://xel-toolkit.org/iconsets/fluent.svg"
      />
      <x-label>{username}</x-label>
      <x-menu>
        <x-menuitem>
          <x-icon
            name="info"
            iconset="https://xel-toolkit.org/iconsets/fluent.svg"
          />
          <x-label>Profile</x-label>
        </x-menuitem>
        <x-menuitem onClick={changePasswordHandler}>
          <x-icon
            name="lock"
            iconset="https://xel-toolkit.org/iconsets/fluent.svg"
          />
          <x-label>Ganti Password</x-label>
        </x-menuitem>
        <x-menuitem onClick={_onExit}>
          <x-icon
            name="logout"
            iconset="https://xel-toolkit.org/iconsets/material.svg"
          />
          <x-label>Keluar</x-label>
        </x-menuitem>
      </x-menu>
    </x-menuitem>,
    // <x-menuitem
    //   class="app-window-button"
    //   key="3"
    //   onClick={_onMinimize}
    //   title="Minimize"
    // >
    //   <x-icon name="remove" iconset="https://xel-toolkit.org/iconsets/fluent.svg" />
    // </x-menuitem>,
    // <x-menuitem
    //   class="app-window-button"
    //   key="4"
    //   onClick={_onMaximize}
    //   title={_window.isMaximized() ? 'Restore' : 'Maximize'}
    // >
    //   <x-icon
    //     name={_window.isMaximized() ? 'filter-none' : 'check-box-outline-blank'} iconset="https://xel-toolkit.org/iconsets/fluent.svg"
    //   />
    // </x-menuitem>,
    // <x-menuitem
    //   class="app-window-button close"
    //   key="5"
    //   onClick={_onExit}
    //   title="Keluar"
    // >
    //   {/* <x-icon name="logout" iconset="https://xel-toolkit.org/iconsets/fluent.svg" /> */}
    //   <Icon name='window close outline' size='big' />
    // </x-menuitem>,
    <div
      id="window-menu"
      className="group ml-2 mr-3 z-50 flex items-center space-x-1"
      key="3"
    >
      <button
        onClick={_onMinimize}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-yellow-500 rounded-full focus:shadow-outline cursor-pointer"
      >
        <MinusIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
      </button>
      <button
        onClick={_onMaximize}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline cursor-pointer"
      >
        {_window.isMaximized() ? (
          <MinimizeIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
        ) : (
          <MaximizeIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
        )}
      </button>
      <button
        onClick={_onExit}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-red-600 rounded-full focus:shadow-outline cursor-pointer"
      >
        <CloseIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
      </button>
    </div>,
  ];

  return menus;
}

RightMenu.propTypes = {
  username: PropTypes.string.isRequired,
  history: PropTypes.object,
  disabled: PropTypes.bool,
};

export default withRouter(RightMenu);
