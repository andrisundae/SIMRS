import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { parse } from 'querystring';

import { Dropdown, Menu } from 'semantic-ui-react'

function MainMenu({ disabled, contexts, routers, history }) {
    const [currentRoute, setCurrentRoute] = useState('');

    // function _getCurrentRoute() {
    //     let params = parse(location.search.substr(1));

    //     return params.route ? params.route : '_billing_master';
    // }

    function _onClickMenuItem(keyMenu) {
        let router = routers.find(router => router.key === keyMenu);
        if (router) {
            history.replace(`${router.path}?route=${keyMenu}`);
            setCurrentRoute(keyMenu);
        }
    }

    function _renderSubMenu(key, menu) {
        return (
            <Dropdown simple key={key} item text={menu.nama} disabled={disabled}>
                <Dropdown.Menu>
                    {menu.children.map((item, index) => {
                        return (
                            (() => {
                                if (item.children) {
                                    return _renderSubMenu(index, item)
                                } else {
                                    return (
                                        <Dropdown.Item
                                            key={index} text={item.nama}
                                            onClick={() => _onClickMenuItem(item.key_menu)}
                                            active={currentRoute === item.key_menu}
                                        />
                                    )
                                }
                            })()
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    function _renderMenu() {
        let list = [];

        contexts.map((context, index) => {
            if (context.children) {
                list.push(
                    <Dropdown item text={context.nama} key={index} disabled={disabled}>
                        <Dropdown.Menu>
                            {context.children.map((menu, key) => {
                                return (
                                    (() => {
                                        if (menu.children) {
                                            return _renderSubMenu(key, menu)
                                        } else {
                                            return (
                                                <Dropdown.Item
                                                    key={key}
                                                    text={menu.nama}
                                                    onClick={() => _onClickMenuItem(menu.key_menu)}
                                                    active={currentRoute === menu.key_menu}
                                                />
                                            )
                                        }
                                    })()
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                );
            } else {
                list.push(
                    <Menu.Item
                        key={index}
                        name={context.key_menu}
                        active={currentRoute === context.key_menu}
                        content={context.nama}
                        onClick={() => _onClickMenuItem(context.key_menu)}
                        disabled={disabled}
                        link
                    />
                );
            }

            return list;

        });

        return list;
    }

    return (
        <div className="main-menu">
            {_renderMenu()}
        </div>
    );
}

MainMenu.propTypes = {
    match: PropTypes.object,
    contexts: PropTypes.array,
    disabled: PropTypes.bool,
    routers: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
}

export default withRouter(MainMenu);
