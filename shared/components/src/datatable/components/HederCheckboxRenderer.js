import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeaderCheckboxRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };
        this._handleCheckedChange = this._handleCheckedChange.bind(this);
    }

    _handleCheckedChange() {
        if (this.state.checked) {
            this.props.api.forEachNode(function (node) {
                node.setSelected(false);
            });
            this.setState({ checked: false });
        } else {
            this.props.api.forEachNode(function (node) {
                node.setSelected(true);
            });
            this.setState({ checked: true });
        }
    }

    render() {
        return (
            <span className="ag-cell-wrapper">
                <span className="ag-selection-checkbox">
                    {this.state.checked &&
                        <span className="ag-icon ag-icon-checkbox-checked" onClick={this._handleCheckedChange}/>
                    }
                    {!this.state.checked &&
                        <span className="ag-icon ag-icon-checkbox-unchecked" onClick={this._handleCheckedChange}/>
                    }
                    
                    <span className="ag-header-cell-text" style={{top: -2, marginLeft: 5}}>
                        <span>{this.props.displayName}</span>
                    </span>
                </span>
            </span>
        );
    }
}

HeaderCheckboxRenderer.propTypes = {
    displayName: PropTypes.string,
    api: PropTypes.object
}

export default HeaderCheckboxRenderer;