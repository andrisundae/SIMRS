import React from 'react';
import PropTypes from 'prop-types';
import { Header as HeaderComp, Icon } from 'semantice-ui-react';

const Header = ({ title, ...props }) => {
  return (
    <HeaderComp as="h4" {...props}>
      <Icon name="user" />
      {title}
    </HeaderComp>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
