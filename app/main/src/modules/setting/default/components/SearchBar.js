import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Divider } from 'semantic-ui-react';

class SearchBar extends Component {
    render() {
        const { onSearch, inputRef, t, resource, ...props } = this.props;
        return (
            <Fragment>
              <Input
                ref={inputRef}
                fluid
                action={{
                  content: t(`${resource}:action.search`),
                  onClick: onSearch,
                  color: 'blue',
                  disabled: this.props.disabled
                }}
                icon='search'
                iconPosition='left' {...props}
              />
              <Divider style={{marginBottom: 5}} fitted hidden/>
            </Fragment>
        )
    }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  inputRef: PropTypes.object,
  t: PropTypes.func.isRequired,
  resource: PropTypes.string,
};

export default SearchBar;
