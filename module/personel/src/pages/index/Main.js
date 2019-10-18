import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Header, Grid, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { Trans } from 'react-i18next';

import { PageLoader, confirmation } from '@simrs/components';
import { isGranted, authActions } from '@simrs/main/src/modules/auth';

import Filter from './containers/Filter';
import Create from './containers/Create';
import UploadGambar from './containers/UploadGambar';
import { List, FooterActions, moduleActions, isDisableForm } from '@simrs/main/src/modules/master/default';
import actions, {uploadGambarActions} from './actions';

class Main extends Component {
    componentDidMount() {
        this.props.action.openForm(this.props.resource);
        this._bindKey();
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    componentWillUnmount() {
        this.unbindKey();
    }

    unbindKey() {
        MouseTrap.unbind("alt+n");
        MouseTrap.unbind("alt+e");
        MouseTrap.unbind("alt+l");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('alt+n', function (e) {
            e.preventDefault();
            if ((_this.props.permissions.canChangeStatus && !_this.props.isDisableForm && _this.props.isRowSelected)) {
                _this._onChangeStatus();
            }
        });

        MouseTrap.bindGlobal('alt+e', function (e) {
            e.preventDefault();
            if ((_this.props.permissions.canResetPassword && !_this.props.isDisableForm && _this.props.isRowSelected)) {
                _this._onResetPassword();
            }
        });

        MouseTrap.bindGlobal('alt+l', function (e) {
            e.preventDefault();
            if ((_this.props.permissions.canForceLogout && !_this.props.isDisableForm && _this.props.isRowSelected)) {
                _this._onForceLogout();
            }
        });
    }

    _renderTitleBtnStatus() {
        const { post: { string_aktif}, resource } = this.props;
        return (
            (() => {
                if (string_aktif === 'Ya') {
                    return <Trans i18nKey={`${resource}:action.status.non_aktif`} />
                } else if (string_aktif === 'Tidak') {
                    return <Trans i18nKey={`${resource}:action.status.aktif`} />
                } else {
                    return <Trans i18nKey={`${resource}:action.status.default`} />
                }
            })()
        )
    }

    _onChangeStatus = () => {
        const { post: { nama, nip, string_aktif}, t, resource } = this.props;
        let subActionMessage = string_aktif === 'Ya' ? 'menonaktifkan' : 'mengaktifkan';
        confirmation({
            onOk: () => this.props.action.changeStatus(this.resource, { id: this.props.selectedRow }),
            message: t(`${resource}:dialog.confirmation.change_status`, {subActionMessage, nama, nip}),
        });
    }

    _onResetPassword = () => {
        const { post: { nama, nip }, t, resource } = this.props;
        confirmation({
            onOk: () => this.props.action.resetPassword(this.resource, { id: this.props.selectedRow }),
            message: t(`${resource}:dialog.confirmation.reset_password`, { nama, nip }),
        });
    }

    _onForceLogout = () => {
        const { post: { nama, nip }, t, resource } = this.props;
        confirmation({
            onOk: () => this.props.action.forceLogout(this.resource, { id: this.props.selectedRow }),
            message: t(`${resource}:dialog.confirmation.force_logout`, { nama, nip }),
        });
    }

    getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nip`),
                field: "nip",
                width: 120
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.inisial`),
                field: "inisial",
                width: 100
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.telp`),
                field: "telp",
                width: 140
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.jenis_kelamin`),
                field: "jenis_kelamin",
                width: 140
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.pendidikan`),
                field: "pendidikan",
                width: 120
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.jenis_pegawai`),
                field: "jenis_pegawai",
                width: 140
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.spesialisasi_pegawai`),
                field: "spesialisasi_pegawai",
                width: 140
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.jabatan_fungsional`),
                field: "jabatan_fungsional",
                width: 150
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status_aplikasi`),
                field: "status_aplikasi",
                width: 140
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.username`),
                field: "username",
                width: 120
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.status`),
                field: "string_aktif",
                width: 70
            },
        ]
    }

    onUploadGambar = () => {
        const { action, resource, post} = this.props;
        action.openUploadGambar(resource, post);
    }

    render() {
        const { t, permissions, resource, i18n, isRowSelected, isShowUploadGambar} = this.props;
        return (
            <Segment size="mini">
                <Header as='h5' attached='top' block>
                    <Icon name="user outline" />
                    {this.props.t(`${this.props.resource}:title`)}
                </Header>
                <Segment attached size="mini" style={{ minHeight: 540 }}>
                    <Grid className="content-grid">
                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded>
                                    <Filter t={t} resource={resource} i18n={i18n} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Grid columns="2">
                                    <Grid.Row>
                                        <Grid.Column>
                                            <List sizeColumnsToFit={false} columnDefs={this.getColumnDefs()} t={t} resource={resource} />
                                            {(permissions.canChangeStatus || permissions.canResetPassword || permissions.canForceLogout) &&
                                            <Fragment>
                                                <Divider />
                                                {permissions.canChangeStatus &&
                                                    <Button
                                                        name="change_status"
                                                        size="tiny"
                                                        disabled={isDisableForm && !isRowSelected}
                                                        onClick={this._onChangeStatus}
                                                        fluid
                                                        style={{marginBottom: 8}}
                                                        primary
                                                    >
                                                        {this._renderTitleBtnStatus()}
                                                    </Button>
                                                }
                                                {permissions.canResetPassword &&
                                                    <Button
                                                        name="reset_password"
                                                        size="tiny"
                                                        disabled={isDisableForm && !isRowSelected}
                                                        onClick={this._onResetPassword}
                                                        fluid
                                                        style={{ marginBottom: 8 }}
                                                        primary
                                                    >
                                                        R<u>e</u>set Password
                                                    </Button>
                                                }
                                                {permissions.canForceLogout &&
                                                    <Button
                                                        name="force_logout"
                                                        size="tiny"
                                                        disabled={isDisableForm && !isRowSelected}
                                                        onClick={this._onForceLogout}
                                                        fluid
                                                        style={{ marginBottom: 8 }}
                                                        primary
                                                    >
                                                        Force <u>L</u>ogout
                                                    </Button>
                                                }
                                                {permissions.canUploadGambar &&
                                                    <Button
                                                        name="upload_gambar"
                                                        size="tiny"
                                                        disabled={isDisableForm && !isRowSelected}
                                                        onClick={this.onUploadGambar}
                                                        fluid
                                                        style={{ marginBottom: 8 }}
                                                        primary
                                                    >
                                                        Upload Gambar
                                                    </Button>
                                                }
                                            </Fragment>
                                        }
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Segment padded style={{ marginBottom: 8 }}>
                                                <Create t={t} resource={resource} i18n={i18n} />
                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {isShowUploadGambar &&
                    <UploadGambar
                        t={t}
                        i18n={i18n}
                        resource={resource}
                    />
                }
                <FooterActions t={t} resource={resource} />
                <PageLoader active={this.props.isLoading} message={this.props.loaderMessage} />
            </Segment>
        );
    }
}

const mapStateToProps = function (state) {
    const { module, uploadGambar: {show} } = state.default;

    return {
        isLoading: state.loader.count > 0,
        isDisableForm: !isDisableForm(module),
        isRowSelected: module.selectedRow > 0,
        selectedRow: module.selectedRow,
        post: module.post,
        permissions: {
            canChangeStatus: isGranted(state.acl, 'ganti_status'),
            canUploadGambar: isGranted(state.acl, 'upload_gambar'),
            canResetPassword: module.auth.resetPassword,
            canForceLogout: module.auth.forceLogout
        },
        isShowUploadGambar: show
    }
}

const mapDispatchToProps = function (dispatch) {
    const { resetPassword, forceLogout } = authActions.default;

    return {
        openForm: (resource) => dispatch(moduleActions.openForm(resource)),
        action: bindActionCreators(
            {
                openForm: moduleActions.openForm,
                changeStatus: actions.changeStatusAplikasi.request,
                resetPassword: resetPassword.request,
                forceLogout: forceLogout.request,
                openUploadGambar: uploadGambarActions.openUploadGambar
            },
            dispatch
        ),
    }
}

Main.propTypes = {
    resource: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    isLoading: PropTypes.bool,
    isDisableForm: PropTypes.bool,
    permissions: PropTypes.object.isRequired,
    isRowSelected: PropTypes.bool,
    isShowUploadGambar: PropTypes.bool,
    selectedRow: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
