import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function Layout(props) {
    const { children, logo, contexts, routers, username } = props;

    return (
        <div className="layout-container">
            <Header
                logo={logo}
                contexts={contexts}
                routers={routers}
                username={username}
            />
            <Content>
                {children}
            </Content>
            <Footer logo={logo}/>
        </div>
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
}

export default Layout;
