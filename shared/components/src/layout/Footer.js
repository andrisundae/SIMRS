import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

function Footer({ actionsPosition = 'left', watermark = null, ...props }) {
  const actionsOnLeftPosition = 'left' === actionsPosition;

  return (
    <Menu
      fixed="bottom"
      color="black"
      inverted
      size="mini"
      borderless
      {...props}
    >
      {actionsOnLeftPosition ? (
        <Menu.Menu position="left" id="footer-actions" />
      ) : null}
      {watermark && (
        <Menu.Menu position={actionsOnLeftPosition ? 'right' : 'left'}>
          <Menu.Item>{watermark}</Menu.Item>
        </Menu.Menu>
      )}
      {actionsOnLeftPosition ? null : (
        <Menu.Menu position="right" id="footer-actions" />
      )}
    </Menu>
  );
}
Footer.propsTypes = {
  actionsPosition: PropTypes.oneOf(['left', 'right']),
};

export default Footer;
