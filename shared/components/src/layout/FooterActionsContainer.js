import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class FooterActionsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.getElementById('footer-actions');
    }

    render() {
        return this.el ? ReactDOM.createPortal(
            this.props.children,
            this.el,
        ) : null
    }
}

FooterActionsContainer.propTypes = {
    children: PropTypes.element
}

export default FooterActionsContainer;
