import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Form, Grid, Divider } from 'semantic-ui-react';

import { FileUpload } from '@simrs/components';

import { ProgressMessage } from '../components';
import actions from '../actions';
import actionTypes from '../actionTypes';

class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      progressGlobal: 0,
      progressMessage: '',
    };

    this._onFileChange = this._onFileChange.bind(this);
    this.rws = new ReconnectingWebSocket(
      process.env.REACT_APP_SOCKET_SERVER_DOMAIN
    );
  }

  render() {
    let {
      statusForm,
      mimes,
      helpBlockFile,
      isStartedUpload,
      post,
      children,
      fileRef,
      inputRef,
      t,
    } = this.props;
    const { progressGlobal, progress, progressMessage } = this.state;

    return (
      <Form id={this.formId} size="small">
        <Grid>
          <Grid.Row>
            <Grid.Column width="10">
              <Grid className="p-10">
                <Grid.Row>
                  <Grid.Column width="4" className="required field">
                    <label>{t(this._getKey('label.field.file'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <FileUpload
                      inputRef={inputRef}
                      fileRef={fileRef}
                      value={post.file.name || ''}
                      onChange={this._onFileChange}
                      accept={mimes}
                      disabled={isStartedUpload}
                    />
                    <span className="help-block">{helpBlockFile}</span>
                  </Grid.Column>
                </Grid.Row>
                {children && children}
                {statusForm === actionTypes.START_IMPORT && (
                  <Fragment>
                    <Divider />
                    <Grid.Row>
                      <Grid.Column>
                        <ProgressMessage
                          progress={progress}
                          progressGlobal={progressGlobal}
                          progressMessage={progressMessage}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Fragment>
                )}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
      </Form>
    );
  }

  componentDidMount() {
    this.props.action.openForm(this.props.resource);
    this._webSocketRun();
  }

  componentDidUpdate() {
    const { statusForm, isStartedUpload } = this.props;
    if (statusForm === actionTypes.START_IMPORT && !isStartedUpload) {
      this._uploadFile();
    }
  }

  componentWillUnmount() {
    this.rws.close();
    this._removeListener();
  }

  _uploadFile() {
    const _this = this;
    const { post, action, resource, onUpload, t } = this.props;

    onUpload(
      post,
      {
        beforeSend: function (xhrObject) {
          action.onStartedUpload(resource, {
            isStartedUpload: true,
          });
          xhrObject.upload.onprogress = function (e) {
            let percent = 0;
            if (e.lengthComputable) {
              percent = Math.floor((e.loaded / e.total) * 100);
              _this.setState({
                progress: percent,
              });
            }
          };
        },
      },
      (error, res, body) => {
        if (error || res.statusCode >= 400) {
          action.onImportFailure(
            resource,
            t(this._getKey('import.message.failure'), { error: error.message })
          );
          toastr.error('Error', error.message);
        } else {
          if (body.status) {
            _this.setState({
              progressGlobal: _this._stepProgress('upload'),
              progressMessage: t(this._getKey('progress.message.readfile')),
            });
          } else {
            action.onImportFailure(
              resource,
              t(this._getKey('import.message.failure'), { error: body.message })
            );
            toastr.error('Error', body.message);
          }
        }
      }
    );
  }

  _stepProgress(step) {
    let progress = 0;

    switch (step) {
      case 'validasi':
      case 'upload':
        progress = 25;
        break;
      case 'iterasi':
        progress = 50;
        break;
      case 'simpan':
        progress = 90;
        break;
      case 'sukses':
        progress = 100;
        break;

      default:
        progress = this.state.progressGlobal;
        break;
    }

    return progress;
  }

  _onFileChange(e) {
    const files = e.target.files;
    if (files[0]) {
      this.props.action.onFileChange(this.props.resource, {
        file: files[0],
      });
    }
  }

  _onOpen() {
    let data = {
      type: 'subscribe',
      module: [this.props.resource],
    };
    this.rws.send(JSON.stringify(data));
    this.props.action.onConnectedSocket(this.props.resource);
  }

  _onMessage({ data }) {
    let response = JSON.parse(data);
    const { resource, action, statusForm, t } = this.props;

    if (response.data) {
      let data = response.data;
      switch (data.status) {
        case 'onProgress':
          if ('undefined' != typeof data.source) {
            let source = data.source;
            let message = '';
            let progress = this.state.progress;
            if (source.current_step === 'iterasi') {
              message = t(this._getKey('progress.message.iterasi'), {
                current: source.current_data,
                total: source.total_row,
              });
              progress = source.persentase;
            } else if (source.current_step === 'validasi') {
              message = t(this._getKey('progress.message.validasi'));
            } else if (source.current_step === 'simpan') {
              message = t(this._getKey('progress.message.simpan'));
            }

            if (statusForm !== actionTypes.START_IMPORT) {
              action.onStartedUpload(resource, {
                isStartedUpload: true,
              });
              action.onStartImport(resource);
            }

            this.setState({
              progress: progress,
              progressGlobal: this._stepProgress(source.current_step),
              progressMessage: message,
            });
          }
          break;
        case 'onError':
          action.onImportFailure(
            resource,
            t(this._getKey('import.message.failure'), { error: data.message })
          );
          this._resetState();
          // this.props.action.onReset(this.props.resource);
          toastr.error('Error', data.message);
          break;
        case 'onSuccess':
          action.onImportSuccess(
            resource,
            t(this._getKey('import.message.success'), {
              total: data.source.total_row,
            })
          );
          this._resetState();
          // this.props.action.onReset(this.props.resource);
          toastr.success('Success', t(this._getKey('toast.message.success')));
          break;
        default:
          break;
      }
    }
  }

  _resetState() {
    this.setState({
      progress: 0,
      progressGlobal: 0,
      progressMessage: '',
    });
  }

  _onClose({ target }) {
    if (target.retryCount % 3 === 0) {
      // toastr.warning('Error', 'Tidak terhubung dengan socket server!');
      console.log('Tidak terhubung dengan socket server!');
      this.props.action.onDisconnectedSocket(this.props.resource);
    }
  }

  _onError() {
    this.props.action.onDisconnectedSocket(this.props.resource);
    // toastr.warning('Error', 'Ada masalah dengan socket server!');
    console.log('Ada masalah dengan socket server!');
  }

  _webSocketRun() {
    this.rws.addEventListener('open', (e) => this._onOpen(e));
    this.rws.addEventListener('message', (e) => this._onMessage(e));
    this.rws.addEventListener('error', (e) => this._onError(e));
    this.rws.addEventListener('close', (e) => this._onClose(e));
  }

  _removeListener() {
    this.rws.removeEventListener('open', this._onOpen);
    this.rws.removeEventListener('message', this._onMessage);
    this.rws.removeEventListener('error', this._onError);
    this.rws.removeEventListener('close', this._onClose);
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const {
    statusForm,
    focusElement,
    mimes,
    post,
    isStartedUpload,
  } = state.module;

  return {
    statusForm,
    focusElement,
    mimes,
    post,
    isStartedUpload,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onReset: actions.onReset,
        onImportSuccess: actions.onImportSuccess,
        onImportFailure: actions.onImportFailure,
        onFileChange: actions.onFileChange,
        onReady: actions.onReady,
        openForm: actions.openForm,
        onStartedUpload: actions.onStartedUpload,
        onStartImport: actions.onStartImport,
        onConnectedSocket: actions.onConnectedSocket,
        onDisconnectedSocket: actions.onDisconnectedSocket,
      },
      dispatch
    ),
  };
};

Import.propTypes = {
  action: PropTypes.object,
  fileRef: PropTypes.object.isRequired,
  inputRef: PropTypes.object.isRequired,
  post: PropTypes.object,
  isLoading: PropTypes.bool,
  isStartedUpload: PropTypes.bool,
  isDisableForm: PropTypes.bool,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  resource: PropTypes.string,
  caption: PropTypes.string.isRequired,
  helpBlockFile: PropTypes.string,
  mimes: PropTypes.array,
  onUpload: PropTypes.func,
  children: PropTypes.node,
};

export default connect(mapStateToProps, mapDispatchToProps)(Import);
