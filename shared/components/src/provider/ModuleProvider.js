import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './AppProvider';

const moduleState = {
  resource: '',
  permissions: {},
};

const moduleActionTypes = {
  SET_RESOURCE: 'SET_RESOURCE',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
};

export const moduleActions = (dispatch) => {
  return {
    setResource: (resource) =>
      dispatch({ type: moduleActionTypes.SET_RESOURCE, payload: { resource } }),
    setPermissions: (data) =>
      dispatch({ type: moduleActionTypes.SET_PERMISSIONS, payload: { data } }),
  };
};

const ModuleStateContext = React.createContext(moduleState);
const ModuleDispatchContext = React.createContext();

function moduleReducer(state, action) {
  switch (action.type) {
    case moduleActionTypes.SET_RESOURCE: {
      return { ...state, resource: action.payload.resource };
    }
    case moduleActionTypes.SET_PERMISSIONS: {
      return { ...state, permissions: action.payload.data };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function ModuleProvider({ children }) {
  const [state, dispatch] = React.useReducer(moduleReducer, moduleState);
  return (
    <ModuleStateContext.Provider value={state}>
      <ModuleDispatchContext.Provider value={dispatch}>
        {children}
      </ModuleDispatchContext.Provider>
    </ModuleStateContext.Provider>
  );
}

export function useModuleState() {
  const context = React.useContext(ModuleStateContext);
  if (context === undefined) {
    throw new Error('useModuleState must be used within a ModuleProvider');
  }
  return context;
}

export function useModuleDispatch() {
  const context = React.useContext(ModuleDispatchContext);
  if (context === undefined) {
    throw new Error('useModuleDispatch must be used within a ModuleProvider');
  }
  return context;
}

export function useModuleAction() {
  const dispatch = useModuleDispatch();
  return moduleActions(dispatch);
}

export function useModuleTrans() {
  const state = useAppState();
  const { t } = useTranslation();
  return (key) => t(`${state.resource}:${key}`);
}

export function ModuleConsumer({ children }) {
  const dispatch = useModuleDispatch();
  return (
    <ModuleStateContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            'ModuleConsumer must be used within a ModuleProvider'
          );
        }
        return children(context, dispatch);
      }}
    </ModuleStateContext.Consumer>
  );
}

export const withModuleConsumer = (WrappedComponent) => {
  // eslint-disable-next-line
  const HOC = class extends React.Component {
    render() {
      return (
        <ModuleConsumer>
          {(context, dispatch) => (
            <WrappedComponent
              {...this.props}
              moduleContext={context}
              moduleDispatch={dispatch}
              moduleActions={moduleActions}
            />
          )}
        </ModuleConsumer>
      );
    }
  };

  return HOC;
};
