import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import PenjaminPasienFooterActions from './containers/PenjaminPasienFooterActions';
import actions from './redux/actions';
import { staticConst } from './static';

import '../../assets/css/styles.css';

class Main extends Component {
  componentDidMount() {
    this.props.openForm(this.props.resource);
  }

  render() {
    return (
      <Fragment>
        <Segment style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Create {...this.props} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.props.activeTabIndex === 0 ? (
          <FooterActions
            resource={this.props.resource}
            permissions={this.props.permissions}
          />
        ) : (
          <PenjaminPasienFooterActions
            resource={staticConst.PENJAMIN_PASIEN_RESOURCE}
            permissions={this.props.permissions}
          />
        )}
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
    activeTabIndex: state.module.kunjungan.activeTabIndex,
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
  loaderMessage: PropTypes.string,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  permissions: PropTypes.array.isRequired,
  activeTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
