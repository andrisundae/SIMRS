import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAppAction } from '@simrs/components';

function MainMenu({ disabled, contexts, routers }) {
  const history = useHistory();
  const disabledProp = disabled ? { disabled: true } : {};
  const appAction = useAppAction();

  function _onClickMenuItem(keyMenu) {
    let router = routers.find((router) => router.key === keyMenu);
    if (router) {
      history.replace(`${router.path}?route=${keyMenu}`);
      appAction.setResource(router.key);
    }
  }

  function _renderSubMenu(menu) {
    return (
      <x-menuitem key={menu.id} {...disabledProp}>
        <x-label>{menu.nama}</x-label>
        <x-menu>
          {menu.children.map((item) => {
            return (() => {
              if (item.children) {
                return _renderSubMenu(item);
              } else {
                return (
                  <x-menuitem
                    key={item.id}
                    onClick={() => _onClickMenuItem(item.key_menu)}
                  >
                    <x-label>{item.nama}</x-label>
                  </x-menuitem>
                );
              }
            })();
          })}
        </x-menu>
      </x-menuitem>
    );
  }

  function _renderMenu() {
    let list = [];

    contexts.map((context) => {
      if (context.children) {
        list.push(
          <x-menuitem key={context.id} {...disabledProp}>
            <x-label>{context.nama}</x-label>
            <x-menu>
              {context.children.map((menu, key) => {
                return (() => {
                  if (menu.children) {
                    return _renderSubMenu(menu);
                  } else {
                    return (
                      <x-menuitem
                        key={menu.id}
                        onClick={() => _onClickMenuItem(menu.key_menu)}
                      >
                        <x-label>{menu.nama}</x-label>
                      </x-menuitem>
                    );
                  }
                })();
              })}
            </x-menu>
          </x-menuitem>
        );
      } else {
        list.push(
          <x-menuitem
            key={context.id}
            onClick={() => _onClickMenuItem(context.key_menu)}
            {...disabledProp}
          >
            <x-label>{context.nama}</x-label>
          </x-menuitem>
        );
      }

      return list;
    });

    return list;
  }

  return _renderMenu();
}

MainMenu.propTypes = {
  match: PropTypes.object,
  contexts: PropTypes.array,
  disabled: PropTypes.bool,
  routers: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default memo(MainMenu);
