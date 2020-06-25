import React, { Component } from 'react';
import { ModuleConsumer } from './ModuleProvider';

const withModuleConsumer = (WrappedComponent) => {
  // eslint-disable-next-line
  const HOC = class extends Component {
    render() {
      return (
        <ModuleConsumer>
          {(context) => (
            <WrappedComponent {...this.props} moduleContext={context} />
          )}
        </ModuleConsumer>
      );
    }
  };

  return HOC;
};

export default withModuleConsumer;
