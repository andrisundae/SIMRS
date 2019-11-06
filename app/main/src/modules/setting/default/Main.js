import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import FilterableSettingList from './containers/FilterableSettingList';
import FilterableSumberList from './containers/FilterableSumberList';
import ActionButtons from './containers/ActionButtons';

import { moduleActions } from './actions';

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

        const {resource, sizeColumnsToFitSetting,
            sizeColumnsToFitSumber, dataSetting,
            settingColumns, sumberColumns, t, i18n,
            containerHeightSetting, containerHeightSumber,
            settings
        } = this.props;

        return (
            <Segment size="mini" className="content-container">
                <Header as='h5' attached='top' block>
                    <Icon name={this.props.icon} />
                    {this.props.caption || this.props.t(`${this.props.resource}:title`)}
                </Header>
                <Segment attached size="mini" style={{ minHeight: 540 }}>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded>
                                    {this.props.filterSumberLain}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <FilterableSumberList
                                    resource={resource}
                                    sizeColumnsToFit={sizeColumnsToFitSumber}
                                    columnDefs={sumberColumns}
                                    t={t}
                                    i18n={i18n}
                                    containerHeight={containerHeightSumber}
                                    settings={settings}
                                />
                            </Grid.Column>
                            <Grid.Column width={2} verticalAlign="middle">
                                {dataSetting &&
                                    <div style={{position: 'absolute', top: -125}}>
                                        {dataSetting}
                                    </div>
                                }
                                <ActionButtons resource={resource} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <FilterableSettingList
                                    resource={resource}
                                    sizeColumnsToFit={sizeColumnsToFitSetting}
                                    columnDefs={settingColumns}
                                    t={t}
                                    i18n={i18n}
                                    containerHeight={containerHeightSetting}
                                    settings={settings}
                                />
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
    resource: PropTypes.string.isRequired,
    caption: PropTypes.string,
    icon: PropTypes.string,
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    loaderMessage: PropTypes.string,
    filterSumberLain: PropTypes.node.isRequired,
    dataSetting: PropTypes.node,
    sizeColumnsToFitSumber: PropTypes.bool,
    sizeColumnsToFitSetting: PropTypes.bool,
    settingColumns: PropTypes.array.isRequired,
    sumberColumns: PropTypes.array.isRequired,
    containerHeightSetting: PropTypes.string,
    containerHeightSumber: PropTypes.string,
    settings: PropTypes.array,
};

Main.defaultProps = {
    icon: 'setting',
    sizeColumnsToFitSumber: true,
    sizeColumnsToFitSetting: true,
    settings: [],
    containerHeightSetting: '400px',
    containerHeightSumber: '400px'
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
