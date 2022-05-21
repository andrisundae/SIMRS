import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';
import {
  Header as PageHeader,
  Content,
} from '@simrs/main/src/modules/components';
import { PageLoader } from '@simrs/components';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import actions from './actions';

class Main extends Component {
  componentDidMount() {
    this.props.openForm(this.props.resource);
  }

  render() {
    return (
      <Fragment>
        <PageHeader
          title={this.props.t(`${this.props.resource}:title`)}
          icon="settings"
        />
        <Content>
          <Segment>
            <Grid className="content-grid">
              <Grid.Row style={{ marginBottom: 15 }}>
                <Grid.Column>
                  <Create {...this.props} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Content>

        <FooterActions
          resource={this.props.resource}
          permissions={this.props.permissions}
        />
        <PageLoader
          active={this.props.isLoading}
          message={this.props.loaderMessage}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    isLoading: state.loader.count > 0,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    openForm: (resource) => dispatch(actions.openForm(resource)),
  };
};

Main.propTypes = {
  openForm: PropTypes.func,
  isLoading: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  permissions: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
