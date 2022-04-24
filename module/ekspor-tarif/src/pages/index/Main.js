import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';

import Form from './containers/Form';
import List from './containers/List';
import FooterActions from './containers/FooterActions';

import actions from './actions';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Segment secondary className="content-header">
          <Header as="h4">
            <Icon name="list" />
            {this.props.t(`${this.props.resource}:title`)}
          </Header>
        </Segment>
        <Segment>
          <Grid
            className="content-grid"
            // style={{ marginTop: -8, marginBottom: -8 }}
          >
            <Grid.Row>
              <Grid.Column>
                <Form {...this.props} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List {...this.props} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <FooterActions {...this.props} />
        <PageLoader
          active={this.props.isLoading}
          message={this.props.loaderMessage}
        />
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.openForm(this.props.resource);
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loaderMessage: PropTypes.string,
  openForm: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = function (state) {
  return {
    isLoading: state.loader.count > 0,
    loaderMessage: state.loader.message,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    openForm: (resource) => dispatch(actions.openForm(resource)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
