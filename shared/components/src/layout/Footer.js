import React from 'react';

import { Menu } from 'semantic-ui-react';

function Footer() {
  return (
    <Menu fixed="bottom" color="black" inverted size="mini" borderless>
      <Menu.Menu position="left" id="footer-actions"></Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item header>
          2019 &copy; SIMRS-BILLING &nbsp;|&nbsp;LINKAR TEAM
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default Footer;
