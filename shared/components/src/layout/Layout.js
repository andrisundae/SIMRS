import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function Layout(props) {
  const {
    children,
    logo,
    contexts,
    routers,
    username,
    footer: { actionsPosition = 'left', ...footerProps } = {
      actionsPosition: 'left',
    },
  } = props;

  return (
    <Container fluid>
      <Header
        logo={logo}
        contexts={contexts}
        routers={routers}
        username={username}
        onClick={() => console.log('sdfdsf')}
      />
      <Content>{children}</Content>
      <Footer logo={logo} actionsPosition={actionsPosition} {...footerProps} />
    </Container>
  );
}

const componentProptypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.element,
]);

Layout.propTypes = {
  logo: componentProptypes.isRequired,
  contexts: PropTypes.array.isRequired,
  routers: PropTypes.array.isRequired,
  children: PropTypes.element,
  username: PropTypes.string,
};

export default Layout;
