import React from 'react';

const { Provider, Consumer } = React.createContext({
  disabledMainMenu: false,
  toggleMainMenu: () => {},
});

class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMainMenu = () => {
      this.setState((prevState) => {
        return { disabledMainMenu: !prevState.disabledMainMenu };
      });
    };

    this.state = {
      disabledMainMenu: false,
      toggleMainMenu: this.toggleMainMenu,
    };
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { AppProvider, Consumer as AppConsumer };
