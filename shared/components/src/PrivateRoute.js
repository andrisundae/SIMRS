import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { PageLoader } from '@simrs/components';
import { request } from '@simrs/common';

const validateToken = async () => {
    let response = await request.post('/auth/personel/validate/login');
    return response;
}

class PrivateRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {auth: false, isAuth:false};
    }

    async _checkAuthentication() {
        try {
            let response = await validateToken();
            if (response.data.isValidToken) {
                this.setState({ auth: true, isAuth: true })
            } else {
                this.setState({ auth: true, isAuth: false })
            }
            // res.then(value => {
            //     if (value.data.isValidToken) {
            //         this.setState({ auth: true, isAuth: true })
            //     } else {
            //         this.setState({ auth: true, isAuth: false })
            //     }
            // })
        } catch (error) {
            this.setState({ auth: true, isAuth: false });
        }
        
    }

    render() {
        const { component: Component, render, ...rest } = this.props;
        return (
            <Route {...rest} render={routeProps => {
                if (!this.state.auth) {
                    this._checkAuthentication();

                    return (
                        <PageLoader active={true} />
                    );
                }

                return (
                    (() => {
                        if (this.state.isAuth) {
                            return (Component ? <Component {...routeProps} /> : render(routeProps))
                        } else {
                            return null
                        }
                    })()
                )
            }}/>
        )
    }
}

PrivateRoute.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    component: PropTypes.node,
    render: PropTypes.func
}

export default PrivateRoute;
