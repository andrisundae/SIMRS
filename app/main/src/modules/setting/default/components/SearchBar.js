import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  render() {
    const { onSearch, inputRef, t, resource, ...props } = this.props;
    return (
      <Input
        ref={inputRef}
        fluid
        action={{
          content: t(`${resource}:action.search`),
          onClick: onSearch,
          color: 'blue',
          disabled: this.props.disabled,
        }}
        icon="search"
        iconPosition="left"
        {...props}
      />
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  inputRef: PropTypes.object,
  t: PropTypes.func.isRequired,
  resource: PropTypes.string,
};

export default SearchBar;
