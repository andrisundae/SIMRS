import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Main as Template } from '@simrs/main/src/modules/import';
import Import from './containers/Import';

class Main extends Component {
    render() {
        return (
            <Template
                {...this.props}
                import={<Import {...this.props} />}
            />
        );
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default Main;
