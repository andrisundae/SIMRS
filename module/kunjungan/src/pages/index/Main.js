import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import PenjaminPasienFooterActions from './containers/PenjaminPasienFooterActions';
import KunjunganHariIni from './containers/KunjunganHariIni';
import MenggabungkanKunjunganIbuDanByi from './containers/MenggabungkanKunjunganIbuDanByi';
import actions from './redux/actions';
import { staticConst } from './static';

import '../../assets/css/styles.css';

class Main extends PureComponent {
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
            t={this.props.t}
          />
        ) : (
          <PenjaminPasienFooterActions
            resource={staticConst.PENJAMIN_PASIEN_RESOURCE}
            permissions={this.props.permissions}
            t={this.props.t}
          />
        )}
        {this.props.showKunjunganHariIni && (
          <KunjunganHariIni resource={this.props.resource} t={this.props.t} />
        )}
        {this.props.showMenggabungkanKunjunganIbuDanBayi && (
          <MenggabungkanKunjunganIbuDanByi />
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
    showKunjunganHariIni: state.module.kunjungan.kunjunganHariIni.show,
    showMenggabungkanKunjunganIbuDanBayi:
      state.module.kunjungan.menggabungkanKunjunganIbuDanBayi.show,
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
  showKunjunganHariIni: PropTypes.bool,
  showMenggabungkanKunjunganIbuDanBayi: PropTypes.bool,
  activeTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
