import React, {Component,createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Import as ImportTemplate, actionTypes } from '@simrs/main/src/modules/import';

import api from '../../../services/models/importPasienModel';

class Import extends Component {
    constructor(props) {
        super(props);

        this.file = createRef();
        this.fileRef = createRef();
    }

    render() {

        return (
            <ImportTemplate
                resource={this.props.resource}
                caption="Import Pasien"
                helpBlockFile={this.props.t(this._getKey('help.field.file'))}
                onUpload={api.upload}
                fileRef={this.fileRef}
                inputRef={this.file}
                t={this.props.t}
                {...this.props}
            />
        )
    }

    componentDidUpdate() {
        let { statusForm, focusElement } = this.props;

        if (statusForm === actionTypes.READY) {
            if (this[focusElement]) {
                if (this[focusElement].current) {
                    this[focusElement].current.focus();
                }
            }
        }
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const {
        statusForm,
        focusElement
    } = state.module;

    return {
        statusForm,
        focusElement
    }
}

Import.propTypes = {
    resource: PropTypes.string,
    statusForm: PropTypes.string,
    focusElement: PropTypes.string,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {})(Import);