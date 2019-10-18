import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import {PageLoader} from '@simrs/components';

import { moduleActions } from './actions';
import FooterActions from './containers/FooterActions';

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

        const Footer = this.props.footerActions || <FooterActions i18n={this.props.i18n} t={this.props.t} resource={this.props.resource} />;
        
        return (
            <Segment size="mini">
                <Header as='h5' attached='top' block>
                    <Icon name={this.props.icon} />
                    {this.props.caption || this.props.t(`${this.props.resource}:title`)}
                </Header>
                <Segment attached size="mini" style={{minHeight: 540}}>
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
                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded>
                                    {this.props.create}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {Footer}
                <PageLoader active={this.props.isLoading} message={this.props.loaderMessage}/>
            </Segment>
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
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        openForm: (resource) => dispatch(moduleActions.openForm(resource)),
    }
}

Main.propTypes = {
    openForm: PropTypes.func,
    isLoading: PropTypes.bool,
    filter: PropTypes.node.isRequired,
    list: PropTypes.node.isRequired,
    create: PropTypes.node,
    footerActions: PropTypes.node,
    resource: PropTypes.string.isRequired,
    style: PropTypes.object,
    caption: PropTypes.string,
    icon: PropTypes.string,
    i18n: PropTypes.object.isRequired,
    loaderMessage: PropTypes.string,
};

Main.defaultProps = {
    // style: { marginLeft: 0, marginRight: 0 },
    icon: 'list'
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
