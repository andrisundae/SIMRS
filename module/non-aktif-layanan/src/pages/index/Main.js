import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';

import Filter from './containers/Filter';
import List from './containers/List';

import {moduleActions} from './actions';

class Main extends Component {
    render() {
        return (
            <Segment size="mini" className="content-container">
                <Header as='h5' attached='top' block>
                    <Icon name="list" />
                    {this.props.t(`${this.props.resource}:title`)}
                </Header>
                <Segment attached size="mini" style={{ minHeight: 540 }}>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column>
                                <Filter {...this.props} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <List {...this.props} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <PageLoader active={this.props.isLoading} message={this.props.loaderMessage} />
            </Segment>
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
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        openForm: (resource) => dispatch(moduleActions.openForm(resource))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
