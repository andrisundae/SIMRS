import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import {PageLoader} from '@simrs/components';
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
                <Segment secondary className="content-header">
                    <Header as='h4'>
                        <Icon name="settings" />
                        {this.props.t(`${this.props.resource}:title`)}
                    </Header>
                </Segment>
                <Segment>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded>
                                    <Create {...this.props} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <FooterActions resource={this.props.resource} permissions={this.props.permissions} />
                <PageLoader active={this.props.isLoading} message={this.props.loaderMessage} />
            </Fragment>
        );
    }
}

const mapStateToProps = function (state) {

    return {
        isLoading: state.loader.count > 0,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        openForm: (resource) => dispatch(actions.openForm(resource)),
    }
}

Main.propTypes = {
    openForm: PropTypes.func,
    isLoading: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
    permissions: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);