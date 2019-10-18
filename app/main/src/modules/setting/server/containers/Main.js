import React, { Component, createRef } from 'react';
import { Button, Modal, Label, Icon, Form } from 'semantic-ui-react';
import _ from 'lodash';
import { remote } from 'electron';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import { withTranslation } from 'react-i18next';

import { store, validator } from '@simrs/common';
import { messageBox } from '@simrs/components';

class Main extends Component {
    constructor(props) {
        super(props);

        this._onChangeServer = this._onChangeServer.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onCheckServer = this._onCheckServer.bind(this);

        this.state = {
            server: store.main.get('config.api'),
            errors: {},
        }

        this.server = createRef();
    }

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} size="tiny">
                <Modal.Header><Icon name="setting" /> Atur Alamat Server</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field error={(this.state.errors.server) ? true : false} required>
                            <label>Server</label>
                            <input
                                ref={this.server}
                                name="server"
                                value={this.state.server}
                                autoFocus
                                placeholder='Contoh: https://simrs.test'
                                onChange={this._onChangeServer}
                            />
                            {this.state.errors.server &&
                                <Label basic color="red" pointing>{_.first(this.state.errors.server)}</Label>
                            }
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        negative
                        onClick={this.props.onClose}
                        icon="cancel"
                        labelPosition='right'
                        content="Batal"
                    />
                    <Button
                        positive
                        icon='save'
                        labelPosition='right'
                        content="Simpan"
                        onClick={this._onSave}
                    />
                    <Button
                        color="orange"
                        onClick={this._onCheckServer}
                        icon="check circle"
                        labelPosition='right'
                        content="Test Server"
                    />
                </Modal.Actions>
            </Modal>
        );
    }

    _onChangeServer(e) {
        this.setState({ server: e.target.value, errors: {} });
    }

    async _onCheckServer() {
        try {
            const response = await fetch(this.state.server);
            if (response.status) {
                messageBox({
                    title: 'Info',
                    message: 'Alamat server ditemukan.',
                });
            }
        } catch (error) {
            messageBox({
                type: 'warning',
                title: 'Warning',
                message: 'Alamat server tidak ditemukan!!',
            });
        }
    }

    _onSave() {
        const { server } = this.state;
        let { rules, messages } = this._getValidator();
        let errors = validator.default({ server }, rules, messages);
        if (_.isEmpty(errors)) {
            if (this._isValidURL(server)) {
                store.main.set('config.api', server);
                messageBox({
                    title: 'Informasi',
                    message: 'Alamat server berhasil diganti, klik tombol OK untuk mereload halaman.',
                    onOk: () => {
                        this.props.onClose();
                        remote.getCurrentWindow().reload();
                    },
                });
            } else {
                this.setState({
                    errors: {
                        server: ['Alamat server tidak valid!']
                    }
                });
                this.server.current.focus();
            }
            
        } else {
            this.setState({
                errors: errors
            });
            this.server.current.focus();
        }
    }

    _getValidator() {
        return {
            rules: {
                server: { required: true },
            },
            messages: {
                server: { required: 'Server harus diisi!' },
            }
        }
    }

    _isValidURL(server) {
        var res = server.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }
}

// const mapStateToProps = function (state) {
//     let { loader } = state;

//     return {
//         isLoading: loader > 0,
//         // isValidLogout: auth.get('isValidLogout')
//     }
// }

// const mapDispatchToProps = function (dispatch) {
//     return {

//     }
// }

Main.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

Main.defaultProps = {
    open: false
}

export default Main;

// export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Main));
