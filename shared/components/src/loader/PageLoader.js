import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

function PageLoader({message, active, size, inverted}) {
    return (
        <Dimmer active={active} page inverted={inverted}>
            <Loader size={size}>{message}</Loader>
        </Dimmer>
    );
}

PageLoader.propTypes = {
    size: PropTypes.string,
    active: PropTypes.bool,
    inverted: PropTypes.bool,
    message: PropTypes.string,
}

PageLoader.defaultProps = {
    size: "big",
    message: "Loading...",
    active: false,
    inverted: false
}

export default PageLoader;