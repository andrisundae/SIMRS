import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';

class Main extends Component {

    render() {

        return (
            <Fragment>
                <Create
                    {...this.props}
                />
                <FooterActions
                    {...this.props}
                />
            </Fragment>
        );
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
};

export default Main;