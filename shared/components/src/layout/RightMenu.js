import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { remote } from 'electron';
import { Input, Button } from 'semantic-ui-react';
// import { ReactComponent as MaximizeIcon } from '../static/svg/maximize.svg';
// import { ReactComponent as CloseIcon } from '../static/svg/close.svg';
// import { ReactComponent as MinusIcon } from '../static/svg/minus.svg';
// import { ReactComponent as MinimizeIcon } from '../static/svg/minimize.svg';

const currentWindow = remote.getCurrentWindow();
const RightMenu = ({ username, disabled, routers, history }) => {
  const disabledProp = disabled ? { disabled: true } : {};

  const closeHandler = useCallback(() => {
    currentWindow.close();
  }, []);

  const minimizeHandler = useCallback(() => {
    currentWindow.minimize();
  }, []);

  const maximizedHandler = useCallback(() => {
    if (!currentWindow.isMaximized()) {
      currentWindow.maximize();
    } else {
      currentWindow.unmaximize();
    }
  }, []);

  const changePasswordHandler = useCallback(() => {
    const keyMenu = '_system_portal_change_password';
    let router = routers.find((router) => router.key === keyMenu);
    if (router) {
      history.replace(`${router.path}?route=${keyMenu}`);
    }
  }, [history, routers]);

  const menus = [
    <div
      id="right-menu-search"
      key="1"
      style={{ marginLeft: 'auto', marginRight: 11 }}
    >
      <Input
        icon={{ name: 'search', link: true }}
        placeholder="Search users..."
        // size="small"
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
        <x-menuitem onClick={closeHandler}>
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
    //   title={currentWindow.isMaximized() ? 'Restore' : 'Maximize'}
    // >
    //   <x-icon
    //     name={currentWindow.isMaximized() ? 'filter-none' : 'check-box-outline-blank'} iconset="https://xel-toolkit.org/iconsets/fluent.svg"
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
      id="window-controls"
      className="ml-2 mr-3 flex items-center h-full py-1"
      key="3"
    >
      <Button.Group basic size="tiny">
        <Button onClick={minimizeHandler} icon="window minimize" />
        <Button
          onClick={maximizedHandler}
          icon={
            currentWindow.isMaximized() ? 'window restore' : 'window maximize'
          }
        />
        <Button onClick={closeHandler} icon="window close" />
      </Button.Group>
      {/* <Button icon="window minimize" size="mini" />
      <Button icon="window maximize" size="mini" />
      <Button icon="window close" size="mini" /> */}
      {/* <button
        onClick={minimizeHandler}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-yellow-500 rounded-full focus:shadow-outline cursor-pointer"
      >
        <MinusIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
      </button>
      <button
        onClick={maximizedHandler}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline cursor-pointer"
      >
        {currentWindow.isMaximized() ? (
          <MinimizeIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
        ) : (
          <MaximizeIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
        )}
      </button>
      <button
        onClick={closeHandler}
        className="inline-flex items-center justify-center w-5 h-5 text-slate-900 transition-colors duration-150 bg-red-600 rounded-full focus:shadow-outline cursor-pointer"
      >
        <CloseIcon className="hidden group-hover:block transition-all duration-150 h-3 w-3" />
      </button> */}
    </div>,
  ];

  return menus;
};

RightMenu.propTypes = {
  username: PropTypes.string.isRequired,
  history: PropTypes.object,
  disabled: PropTypes.bool,
};

export default withRouter(RightMenu);
