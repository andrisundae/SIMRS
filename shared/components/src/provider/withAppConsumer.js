import React, { Component } from 'react';
import { AppConsumer } from './AppProvider';

const withAppConsumer = (WrappedComponent) => {
  // eslint-disable-next-line
  const HOC = class extends Component {
    render() {
      return (
        <AppConsumer>
          {(context) => (
            <WrappedComponent {...this.props} appContext={context} />
          )}
        </AppConsumer>
      );
    }
  };

  return HOC;
};

export default withAppConsumer;
