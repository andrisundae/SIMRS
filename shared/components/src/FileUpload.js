import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Input} from 'semantic-ui-react';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._handleClickText = this._handleClickText.bind(this);

        this.accepts = props.accepts.map(function (x) { return x; }).join(",");
    }

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _handleClickText() {
        if (!this.props.disabled) {
            this.props.fileRef.current.click();
        }
    }

    render() {
        const { inputRef, disabled, value, fileRef } = this.props;
        return (
            <Fragment>
                <Input
                    action={{ color: 'blue', icon: 'file excel', onClick: this._handleClickText}}
                    type="text"
                    value={value}
                    ref={inputRef}
                    onClick={this._handleClickText}
                    readOnly
                    disabled={disabled}
                />
                <input
                    ref={fileRef}
                    type="file"
                    className="form-control-file"
                    id="file"
                    accept={this.accepts}
                    onChange={
                        this.handleChange
                    }
                    disabled={disabled}
                    hidden
                />
            </Fragment>
        )
    }

    componentDidUpdate() {
        if (!this.props.value) {
            if (this.props.fileRef) {
                this.props.fileRef.current.value = null;
            }
        }
    }
}

FileUpload.defaultProps = {
    accepts: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
}

FileUpload.propTypes = {
    inputRef: PropTypes.object.isRequired,
    fileRef: PropTypes.object.isRequired,
    accepts: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,

}

export default FileUpload;
