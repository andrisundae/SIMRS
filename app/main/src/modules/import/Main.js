import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import FooterActions from './containers/FooterActions';
import { getPermissions } from '../auth';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { isSocketConnected } = this.props;

    return (
      <Fragment>
        <Segment secondary className="content-header">
          <Header as="h4">
            <Icon
              name={this.props.icon}
              circular
              color={isSocketConnected ? 'green' : 'red'}
              inverted
            />
            <Header.Content>
              {this.props.caption ||
                this.props.t(`${this.props.resource}:title`)}
              <Header.Subheader>
                {this.props.t(`${this.props.resource}:sub.title`)}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <Segment>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>{this.props.import}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <FooterActions
          i18n={this.props.i18n}
          t={this.props.t}
          resource={this.props.resource}
          permissions={getPermissions(this.props.permissions)}
        />
        <PageLoader
          active={this.props.isLoading}
          message={this.props.loaderMessage}
        />
      </Fragment>
    );
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }
}

const mapStateToProps = function (state) {
  const { isSocketConnected } = state.module;

  return {
    isSocketConnected,
    isLoading: state.loader.count > 0,
    loaderMessage: state.loader.message,
  };
};

Main.propTypes = {
  import: PropTypes.node,
  resource: PropTypes.string.isRequired,
  caption: PropTypes.string,
  icon: PropTypes.string,
  isSocketConnected: PropTypes.bool,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  loaderMessage: PropTypes.string,
  permissions: PropTypes.array,
};

Main.defaultProps = {
  icon: 'file',
  permissions: [],
};

export default connect(mapStateToProps, {})(Main);
