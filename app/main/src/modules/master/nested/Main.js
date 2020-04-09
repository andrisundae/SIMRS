import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import { getPermissions } from '../../auth';

import FooterActions from './containers/FooterActions';

const containerStyles = {
  zIndex: 21,
  position: 'absolute',
  top: 42.5,
  width: '100%',
};

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

    const { isChildren, showFooterActions } = this.props;
    // const childrenStyles = isChildren ?{ ...bodyStyles } : { ...bodyStyles};
    let containerProps = {
      size: 'mini',
    };

    if (isChildren) {
      containerProps = { ...containerProps, style: containerStyles };
    }

    return (
      <Fragment>
        <Segment secondary className="content-header">
          <Header as="h4">
            <Icon name={this.props.icon} />
            {this.props.caption || this.props.t(`${this.props.resource}:title`)}
          </Header>
        </Segment>
        <Segment {...containerProps}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Segment padded>{this.props.filter}</Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{this.props.list}</Grid.Column>
            </Grid.Row>
            {this.props.create && (
              <Fragment>
                <Grid.Row>
                  <Grid.Column>
                    <Segment padded>{this.props.create}</Segment>
                  </Grid.Column>
                </Grid.Row>
              </Fragment>
            )}
          </Grid>
        </Segment>
        {showFooterActions && this._renderFooterActions()}
        <PageLoader
          active={this.props.isLoading}
          message={this.props.loaderMessage}
        />
      </Fragment>
      // <Segment {...containerProps} className="content-container">
      //     <Header as='h5' style={{ marginBottom: 10 }}>
      //         <Icon name={this.props.icon} />
      //         {this.props.caption}
      //     </Header>
      //     <Segment size="mini" style={{ marginBottom: 10 }}>
      //         <Grid className="content-grid">
      //             <Grid.Row>
      //                 <Grid.Column>
      //                     <Segment padded>
      //                         {this.props.filter}
      //                     </Segment>
      //                 </Grid.Column>
      //             </Grid.Row>
      //             <Grid.Row>
      //                 <Grid.Column>
      //                     {this.props.list}
      //                 </Grid.Column>
      //             </Grid.Row>
      //             {this.props.create &&
      //                 <Fragment>
      //                 <Grid.Row>
      //                     <Grid.Column>
      //                         <Segment padded>
      //                             {this.props.create}
      //                         </Segment>
      //                     </Grid.Column>
      //                 </Grid.Row>
      //                 </Fragment>
      //             }
      //         </Grid>
      //     </Segment>
      //     {showFooterActions &&
      //         this._renderFooterActions()
      //     }
      //     <PageLoader active={this.props.isLoading} message={this.props.loaderMessage} />
      // </Segment>
    );
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  _renderFooterActions() {
    const footer = this.props.footerActions || (
      <FooterActions
        i18n={this.props.i18n}
        t={this.props.t}
        resource={this.props.resource}
        subResource={this.props.subResource}
        permissions={getPermissions(this.props.permissions)}
      />
    );
    return footer;
  }
}

Main.propTypes = {
  openForm: PropTypes.func,
  isLoading: PropTypes.bool,
  loaderMessage: PropTypes.string,
  showFooterActions: PropTypes.bool,
  filter: PropTypes.node.isRequired,
  list: PropTypes.node.isRequired,
  create: PropTypes.node,
  footerActions: PropTypes.node,
  resource: PropTypes.string.isRequired,
  style: PropTypes.object,
  caption: PropTypes.string,
  icon: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  subResource: PropTypes.string.isRequired,
  permissions: PropTypes.array,
};

Main.defaultProps = {
  icon: 'list',
  showFooterActions: true,
  permissions: [],
};

export default Main;
