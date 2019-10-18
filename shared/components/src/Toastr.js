import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';

class Toastr extends Component {
    render() {

        return (
            <ReduxToastr
                timeOut={4000}
                preventDuplicates
                position="top-center"
                transitionIn="bounceIn"
                transitionOut="bounceOut"
                progressBar
                newestOnTop
                {...this.props}
            />
        )
    }
}

export default Toastr;
