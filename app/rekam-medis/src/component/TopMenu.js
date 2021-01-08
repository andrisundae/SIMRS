import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Modal, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';
import CariPasien from './CariPasien';

export default function TopMenu({
  title,
  leftMenus = [], // [{ icon, text, to }, { divider }]
}) {
  const [userActionIsOpen, setUserActionIsOpen] = useState(false);

  function logout() {
    alert('logout');
  }

  return (
    <Fragment>
      <div
        className={classNames(
          'flex items-center border-b fixed left-0 right-0 bg-gray-100 h-14 top-11',
          {
            'top-0': !isDesktop,
            'top-11.5': isDesktop,
          }
        )}
      >
        <div className="flex-1">
          <div className="flex justify-start items-center h-full">
            {leftMenus.map(
              ({ text, icon, to = '/', divider = false }, index) => {
                if (divider) {
                  return (
                    <div
                      className="h-full content-after after:border-gray-300 after:border-r mx-2"
                      key={index}
                    ></div>
                  );
                }
                if (undefined === text && undefined === icon) {
                  return null;
                }

                return (
                  <Link
                    to={to}
                    className="p-2 my-2 first:ml-2 rounded-md hover:bg-gray-200 focus:bg-gray-200 hover:text-gray-900"
                    key={index}
                  >
                    {undefined !== icon ? <Icon name={icon} /> : null}
                    {text}
                  </Link>
                );
              }
            )}
          </div>
        </div>
        <div className="flex-none text-lg font-bold">{title}</div>
        <div className="flex-1 py-2">
          <div className="flex justify-end items-center h-full">
            <div className="pr-2">
              <CariPasien />
            </div>
            {!isDesktop ? (
              <div>
                <a
                  href="/"
                  className="p-2.5 m-2 rounded-md hover:bg-gray-200 focus:bg-gray-200 hover:text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserActionIsOpen(true);
                  }}
                >
                  <Icon name="user" />
                  Mohamad Saiful
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {!isDesktop ? (
        <Modal
          size="mini"
          open={userActionIsOpen}
          centered={false}
          closeOnDimmerClick={false}
          closeIcon
          onClose={() => {
            setUserActionIsOpen(false);
          }}
        >
          <Modal.Header>Mohamad Saiful</Modal.Header>
          <Modal.Content>
            <div className="grid grid-cols-1">
              <div>
                <Button color="red" icon fluid onClick={logout}>
                  <Icon name="sign out" />
                  Keluar
                </Button>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      ) : null}
    </Fragment>
  );
}
