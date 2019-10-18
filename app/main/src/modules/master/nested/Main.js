import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Header, Grid, Divider } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';

import FooterActions from './containers/FooterActions';

const containerStyles = {
    zIndex: 21,
    position: 'absolute',
    top: -1,
    width: '100%',
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        const { isChildren, showFooterActions } = this.props;
        // const childrenStyles = isChildren ?{ ...bodyStyles } : { ...bodyStyles};
        let containerProps = {
            size: 'mini'
        }

        if (isChildren) {
            containerProps = { ...containerProps, style: containerStyles };
        }

        return (
            <Segment {...containerProps}>
                <Header as='h5' attached='top' block>
                    <Icon name={this.props.icon} />
                    {this.props.caption}
                </Header>
                <Segment attached size="mini" style={{ minHeight: 540 }}>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded>    
                                    {this.props.filter}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.props.list}
                            </Grid.Column>
                        </Grid.Row>
                        {this.props.create &&
                            <Fragment>
                            <Grid.Row>
                                <Grid.Column>
                                    <Segment padded>
                                        {this.props.create}
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            </Fragment>
                        }
                    </Grid>
                </Segment>
                {showFooterActions &&
                    this._renderFooterActions()
                }
                <PageLoader active={this.props.isLoading} message={this.props.loaderMessage} />
            </Segment>
        );
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    _renderFooterActions() {
        const Footer = this.props.footerActions || <FooterActions i18n={this.props.i18n} t={this.props.t} resource={this.props.resource} subResource={this.props.subResource} />;
        return Footer;
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
};

Main.defaultProps = {
    // style: { marginLeft: 0, marginRight: 0 },
    icon: 'list',
    showFooterActions: true
}

export default Main;
