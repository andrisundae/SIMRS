import React from 'react';

const { Provider, Consumer } = React.createContext({
  settings: {},
  resource: '',
  permissions: {},
});

export { Provider as ModuleProvier, Consumer as ModuleConsumer };
