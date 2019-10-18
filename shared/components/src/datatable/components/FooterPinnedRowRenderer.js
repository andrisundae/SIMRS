import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterPinnedRowRenderer extends Component {
    render() {
        return (
            <span style={this.props.style}>{this.props.value}</span>
        );
    }
};

FooterPinnedRowRenderer.propTypes = {
    style: PropTypes.object
};

FooterPinnedRowRenderer.defaultProps = {
    style: {
        fontWeight: 'bold',
        float: 'right',
    }
}

export default FooterPinnedRowRenderer;

