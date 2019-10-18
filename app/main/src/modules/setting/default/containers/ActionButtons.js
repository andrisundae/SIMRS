import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Button, Icon } from 'semantic-ui-react';

import { confirmation } from '@simrs/components';
import { sumberActions, settingActions } from '../actions';

class ActionButtons extends Component {
    constructor(props) {
        super(props);

        this._push = this._push.bind(this);
        this._pushAll = this._pushAll.bind(this);
        this._revert = this._revert.bind(this);
        this._revertAll = this._revertAll.bind(this);
    }

    render() {

        return (
            <Button.Group fluid vertical labeled icon>
                <Button
                    onClick={this._push}
                    name="push"
                    primary
                    size="mini"
                    fluid
                >
                    <Icon name='angle right' />
                    <u>1</u>
                </Button>
                <Button
                    onClick={this._pushAll}
                    name="push_all"
                    primary
                    size="mini"
                    fluid
                >
                    <Icon name='angle double right' />
                    <u>2</u>
                </Button>
                <Button
                    onClick={this._revert}
                    name="revert"
                    primary
                    size="mini"
                    fluid
                >
                    <Icon name='angle left' />
                    <u>3</u>
                </Button>
                <Button
                    onClick={this._revertAll}
                    name="revert_all"
                    primary
                    size="mini"
                    fluid
                >
                    <Icon name='angle double left' />
                    <u>4</u>
                </Button>
            </Button.Group>
        );
    }

    componentDidMount() {
        this._bindKey();
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("alt+1");
        MouseTrap.unbind("alt+2");
        MouseTrap.unbind("alt+3");
        MouseTrap.unbind("alt+4");
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    _push() {
        let { post, action, resource, selectedRowsSumber } = this.props;
        let data = { id: { ...post, sumber: selectedRowsSumber } };
        action.onPush(resource, data);
    }

    _pushAll() {
        confirmation({
            onOk: () => {
                let { post, action, resource, searchBar } = this.props;
                let data = { id: { ...post }, action: 'pushAll', search: searchBar.sumber };
                action.onPushAll(resource, data);
            },
            message: 'Apakah data ingin disetting semua ?'
        });
    }

    _revert() {
        let { post, action, resource, selectedRowsSetting } = this.props;
        let data = { id: { ...post, setting: selectedRowsSetting } };
        action.onRevert(resource, data);
    }

    _revertAll() {
        confirmation({
            onOk: () => {
                let { post, action, resource, searchBar } = this.props;
                let data = { id: { ...post }, action: 'pushAll', search: searchBar.setting };
                action.onRevertAll(resource, data);
            },
            message: 'Apakah data ingin dihapus dari setting semua ?'
        });
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+1', function (e) {
            e.preventDefault();
            _this._push();
        });

        MouseTrap.bindGlobal('alt+2', function (e) {
            e.preventDefault();
            _this._pushAll();
        });

        MouseTrap.bindGlobal('alt+3', function (e) {
            e.preventDefault();
            _this._revert();
        });

        MouseTrap.bindGlobal('alt+4', function (e) {
            e.preventDefault();
            _this._revertAll();
        });
    }

}

const mapStateToProps = function (state) {
    const page = state.page;

    return {
        post: page.post,
        selectedRowsSumber: page.sumber.selectedRows,
        selectedRowsSetting: page.setting.selectedRows,
        searchBar: {
            sumber: page.sumber.searchBar,
            setting: page.setting.searchBar
        }
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onPush: sumberActions.push.request,
            onPushAll: sumberActions.pushAll.request,
            onRevert: settingActions.revert.request,
            onRevertAll: settingActions.revertAll.request,
        }, dispatch)
    }
}

ActionButtons.propTypes = {
    resource: PropTypes.string.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    selectedRowsSumber: PropTypes.array,
    selectedRowsSetting: PropTypes.array,
    searchBar: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);
