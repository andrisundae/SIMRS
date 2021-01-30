import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../input';

class DropdownSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      options: Array.isArray(props.options) ? props.options : [],
    };
    this._changeHandler = this._changeHandler.bind(this);

    this.componentRef = createRef();
  }

  _changeHandler({ value }) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value, this.props.data);
    }
  }

  findSelected = () => {
    if (!this.state.value || !Array.isArray(this.props.options)) {
      return undefined;
    }

    return this.state.options.find((opt) => opt.value === this.state.value);
  };

  getOptions = () => {
    const { options } = this.props;
    if (options) {
      if (Array.isArray(options)) {
        return options;
      } else if (typeof options === 'string') {
        return this.props.data[options] ? this.props.data[options] : [];
      }
    }

    return [];
  };

  menuOpenHandler = () => {
    const { options } = this.props;
    if (typeof options === 'string') {
      this.setState({
        options: this.props.data[options] ? this.props.data[options] : [],
      });
    }
  };

  render() {
    return (
      <Select
        inputRef={this.componentRef}
        value={this.findSelected()}
        onChange={this._changeHandler}
        isClearable={false}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          option: (styles) => ({ ...styles, fontSize: 12 }),
          control: (styles) => ({ ...styles, width: 200 }),
        }}
        style={{ width: 200 }}
        options={this.state.options}
        onMenuOpen={this.menuOpenHandler}
        onKeyDown={(e) => {
          if (13 === e.which) {
            e.preventDefault();
          }
        }}
        // {...this.props}
      />
    );
  }

  afterGuiAttached() {
    this.componentRef.current.focus();
    if (this.props.onGuiAttached) {
      this.props.onGuiAttached(this.props.data);
    }
  }

  getValue() {
    return this.state.value;
  }

  isCancelAfterEnd() {
    return this.props.value === this.getValue();
  }

  isPopup() {
    return true;
  }
}

DropdownSelectRenderer.propTypes = {
  value: PropTypes.number,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default DropdownSelectRenderer;
