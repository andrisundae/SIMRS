import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import {
  Header as PageHeader,
  Content,
} from '@simrs/main/src/modules/components';

import Filter from './containers/Filter';
import List from './containers/List';

import { moduleActions } from './actions';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader
          title={this.props.t(`${this.props.resource}:title`)}
          icon="list"
        />
        <Content>
          <Segment>
            <Grid className="content-grid">
              <Grid.Row>
                <Grid.Column>
                  <Filter {...this.props} />
                </Grid.Column>
              </Grid.Row>
              {/* <Divider style={{ marginBottom: 0, marginTop: 5 }} /> */}
              <Grid.Row>
                <Grid.Column>
                  <List {...this.props} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Content>

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
    openForm: (resource) => dispatch(moduleActions.openForm(resource)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
