import React from 'react';

const appState = {
  disabledMainMenu: false,
  settings: {},
  resource: '',
};

const appActionTypes = {
  SET_RESOURCE: 'SET_RESOURCE',
  ACTIVATE_MAIN_MENU: 'ACTIVATE_MAIN_MENU',
  DEACTIVATE_MAIN_MENU: 'DEACTIVATE_MAIN_MENU',
};

const appActions = (dispatch) => {
  return {
    setResource: (resource) =>
      dispatch({ type: appActionTypes.SET_RESOURCE, payload: { resource } }),
    activateMainMenu: () =>
      dispatch({ type: appActionTypes.ACTIVATE_MAIN_MENU }),
    deactivateMainMenu: () =>
      dispatch({ type: appActionTypes.DEACTIVATE_MAIN_MENU }),
  };
};

const AppStateContext = React.createContext(appState);
const AppDispatchContext = React.createContext();

function appReducer(state, action) {
  switch (action.type) {
    case appActionTypes.SET_RESOURCE: {
      return { ...state, resource: action.payload.resource };
    }
    case appActionTypes.ACTIVATE_MAIN_MENU: {
      return { ...state, disabledMainMenu: false };
    }
    case appActionTypes.DEACTIVATE_MAIN_MENU: {
      return { ...state, disabledMainMenu: true };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, appState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
}

function useAppAction() {
  const dispatch = useAppDispatch();
  return appActions(dispatch);
}

function AppConsumer({ children }) {
  const dispatch = useAppDispatch();
  return (
    <AppStateContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('AppConsumer must be used within a AppProvider');
        }
        return children(context, dispatch);
      }}
    </AppStateContext.Consumer>
  );
}

const withAppConsumer = (WrappedComponent) => {
  // eslint-disable-next-line
  const HOC = class extends React.Component {
    render() {
      return (
        <AppConsumer>
          {(context, dispatch) => (
            <WrappedComponent
              {...this.props}
              appContext={context}
              appDispatch={dispatch}
              appActions={appActions(dispatch)}
            />
          )}
        </AppConsumer>
      );
    }
  };

  return HOC;
};

export {
  AppProvider,
  useAppState,
  useAppDispatch,
  withAppConsumer,
  useAppAction,
};
