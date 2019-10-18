import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input } from 'semantic-ui-react';
import { settingActions } from '@simrs/main/src/modules/setting/default';

class DataSetting extends Component {
    constructor(props) {
        super(props);

        this.jumlah = createRef();
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
        const { postNeeded, t, resource } = this.props;

        return (
            <Fragment>
                <label style={{ fontSize: 12, fontWeight: 'bold', color: 'rgba(0,0,0,.87)'}}>{t(`${resource}:label.field.jumlah_batasan`)}</label>
                <Input
                    name="jumlah"
                    type="number"
                    ref={this.jumlah}
                    value={postNeeded.jumlah}
                    onChange={this._handleInputChange}
                    min={1}
                    max={2000}
                    fluid
                />
            </Fragment>
        );
    }

    componentDidUpdate() {
        let { focusElement } = this.props;

        if (this[focusElement]) {
            if (this[focusElement].current) {
                this[focusElement].current.focus();
            }
        }
    }

    _handleInputChange(e) {
        const { name, value } = e.target;
        this.props.action.onChangeInputData(this.props.resource, { name, value });
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }
}

const mapStateToProps = function (state) {
    const page = state.page;

    return {
        postNeeded: page.post.needed,
        focusElement: page.focusElement
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
            {
                onChangeInputData: settingActions.onChangeInputData,
            },
            dispatch
        ),
    }
}

DataSetting.propTypes = {
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    postNeeded: PropTypes.object,
    focusElement: PropTypes.string,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSetting);
