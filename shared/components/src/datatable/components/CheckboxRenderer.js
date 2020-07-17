import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxRenderer extends Component {
  constructor(props) {
    super(props);
    this.checkedHandler = this.checkedHandler.bind(this);
  }
  checkedHandler(e) {
    const checked = e.target.checked;
    const colId = this.props.column.colId;
    this.props.node.setDataValue(colId, checked ? 1 : 0);
  }
  render() {
    return (
      <input
        value={1}
        type="checkbox"
        onClick={this.checkedHandler}
        checked={this.props.value}
      />
    );
  }
}

CheckboxRenderer.propTypes = {
  value: PropTypes.number,
  data: PropTypes.object,
};

export default CheckboxRenderer;
