import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';

import { masterActions } from './actions';
import FooterActions from './containers/FooterActions';
import { getPermissions } from '../../auth';

import './static/css/main.css';
class Main extends Component {
  constructor(props) {
    super();

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { permissions, masterForm, noPaddingTopBot } = this.props;
    const { marginBottom, marginTop } = this.props.style;
    const footer = this.props.footerActions || (
      <FooterActions
        i18n={this.props.i18n}
        t={this.props.t}
        resource={this.props.resource}
        permissions={getPermissions(permissions)}
      />
    );

    return (
      <Fragment>
        <Segment secondary className="content-header">
          <Header as="h4">
            <Icon name={this.props.icon} />
            {this.props.caption || this.props.t(`${this.props.resource}:title`)}
          </Header>
        </Segment>
        <Segment>
          <Grid className="content-grid">
            <Grid.Row
              style={{ marginTop: marginTop }}
              className={noPaddingTopBot ? 'form-mepet' : ''}
            >
              <Grid.Column>
                <Segment padded>{masterForm}</Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className={noPaddingTopBot ? 'form-mepet' : ''}>
              <Grid.Column>{this.props.detailList}</Grid.Column>
            </Grid.Row>
            {this.props.useLabel && (
              <Grid.Row
                className={noPaddingTopBot ? 'form-mepet' : ''}
                style={{
                  textAlign: 'right',
                  fontSize: 'initial',
                  fontWeight: 'bold',
                }}
              >
                <Grid.Column>{this.props.labelHarga}</Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row
              style={{ marginBottom: marginBottom }}
              className={noPaddingTopBot ? 'form-mepet' : ''}
            >
              <Grid.Column>
                <Segment padded>{this.props.detailForm}</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {footer}
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

  componentDidCatch() {
    this.setState({ hasError: true });
  }
}

const mapStateToProps = function (state) {
  return {
    isLoading: state.loader.count > 0,
    loaderMessage: state.loader.message,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    openForm: (resource) => dispatch(masterActions.openForm(resource)),
  };
};

Main.propTypes = {
  openForm: PropTypes.func,
  isLoading: PropTypes.bool,
  useLabel: PropTypes.bool.isRequired,
  masterForm: PropTypes.node.isRequired,
  noPaddingTopBot: PropTypes.bool,
  footerActions: PropTypes.node,
  labelHarga: PropTypes.node,
  resource: PropTypes.string.isRequired,
  style: PropTypes.object,
  caption: PropTypes.string,
  icon: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  loaderMessage: PropTypes.string,
  permissions: PropTypes.array,
};

Main.defaultProps = {
  style: { marginTop: 5, marginBottom: 5 },
  icon: 'list',
  permissions: [],
  useLabel: false,
  noPaddingTopBot: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
