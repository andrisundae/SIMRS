import React, { Fragment, Component } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { remote } from 'electron';
import isDev from 'electron-is-dev';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

import { store, menu, templates } from '@simrs/common';
import authActions from '../../auth/authActions';

const { BrowserWindow, app, ipcMain } = remote;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

class Main extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
    this._renderContextsMenu = this._renderContextsMenu.bind(this);
    this.handleSessionExpired = this.handleSessionExpired.bind(this);
  }

  componentDidMount() {
    ipcMain.on('session-expired', this.handleSessionExpired);
  }

  componentWillUnmount() {
    ipcMain.removeListener('session-expired', this.handleSessionExpired);
  }

  handleSessionExpired() {
    this._logout();
    app.quit();
  }

  getEnvApp = () => {
    const config = {
      billing: {},
      farmasi: {},
      emr: {},
      sistem: {},
    };
    const billingPath = resolveApp('../billing/.env');
    const farmasiPath = resolveApp('../farmasi/.env');
    const sistemPath = resolveApp('../system/.env');
    const emrPath = resolveApp('../emr/.env');

    if (fs.existsSync(billingPath)) {
      config.billing = dotenv.parse(fs.readFileSync(billingPath));
    }

    if (fs.existsSync(farmasiPath)) {
      config.farmasi = dotenv.parse(fs.readFileSync(farmasiPath));
    }

    if (fs.existsSync(sistemPath)) {
      config.sistem = dotenv.parse(fs.readFileSync(sistemPath));
    }

    if (fs.existsSync(emrPath)) {
      config.emr = dotenv.parse(fs.readFileSync(emrPath));
    }

    return config;
  };

  render() {
    let { t } = this.props;
    const hasOpenedApp = 0 < store.main.get('user.openedApp');

    return (
      <Fragment>
        <div className="form-title">
          <span className="form-title">{t('main:portal.title')}</span>
          <br />
          <span className="form-subtitle">{t('main:portal.subtitle')}</span>
        </div>
        {this._renderContextsMenu()}
        <div>
          <small className="divider">atau</small>
          <Button
            type="button"
            fluid
            basic
            inverted
            loading={this.props.isLoading}
            disabled={hasOpenedApp}
            title={hasOpenedApp ? t('main:portal.action.exit.title') : null}
            onClick={this._logout}
          >
            KELUAR
          </Button>
        </div>
      </Fragment>
    );
  }

  _renderContextsMenu() {
    return menu.getContexts().map((context, index) => {
      return (
        <Segment
          key={index}
          inverted
          size="tiny"
          color="black"
          style={{ marginTop: 5, marginBottom: 5, padding: 5 }}
        >
          <Button
            onClick={() => this._createWindow(context.key, index + 1)}
            icon
            labelPosition="right"
            color={context.warna}
            inverted
            size="tiny"
            type="button"
            fluid
          >
            <Icon name={context.icon} /> {context.nama}
          </Button>
        </Segment>
      );
    });
  }

  _createMenu(menu, template) {
    menu.forEach((row) => {
      if (row.children) {
        template.push({
          label: row.nama,
          submenu: this._createMenu(row.children, []),
        });
      } else {
        template.push({
          label: row.nama,
          // click: () => { window.location.href(`/billing/master/jenis-layanan?route=${row.key_menu}`)}
        });
      }
    });

    return template;
  }

  _createMenuTemplate(appKey) {
    const appMenu = menu.getMenuAplikasi(appKey);
    let template = this._createMenu(appMenu, []);

    return template;
  }

  createSplashWindow(conf) {
    let splash = new BrowserWindow({
      width: 350,
      height: 200,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      center: true,
      modal: true,
      skipTaskbar: true,
    });
    let file =
      'data:text/html;charset=UTF-8,' +
      encodeURIComponent(templates.splashTemplate(conf));
    splash.loadURL(file);

    return splash;
  }

  _createWindow(app, id) {
    let windowApp = new BrowserWindow({
      width: 1000,
      height: 800,
      frame: false,
      show: false,
      center: true,
      id,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    windowApp.on('show', () => {
      const openedApp = store.main.get('user.openedApp') + 1;
      store.main.set('user.openedApp', openedApp);
      this.forceUpdate();
    });
    windowApp.on('closed', () => {
      windowApp = null;

      const openedApp = store.main.get('user.openedApp') - 1;
      store.main.set('user.openedApp', openedApp);
      this.forceUpdate();
    });

    const envApp = this.getEnvApp();

    let url = '';
    let titleApp = '';
    let color = '';
    switch (app) {
      case '_billing':
        url = isDev
          ? `http://localhost:${envApp.billing ? envApp.billing.PORT : '9001'}`
          : remote.app.getAppPath() + '/build/billing/index.html';
        titleApp = envApp.billing ? envApp.billing.REACT_APP_NAME : 'Billing';
        color = '#26C281';
        break;
      case '_farmasi':
        url = isDev
          ? `http://localhost:${envApp.farmasi ? envApp.farmasi.PORT : '9003'}`
          : remote.app.getAppPath() + '/build/farmasi/index.html';
        titleApp = envApp.farmasi ? envApp.farmasi.REACT_APP_NAME : 'Farmasi';
        color = '#f3c200';
        break;
      case '_rekam_medis':
        url = isDev
          ? `http://localhost:${envApp.emr ? envApp.emr.PORT : '9004'}`
          : remote.app.getAppPath() + '/build/emr/index.html';
        titleApp = envApp.emr ? envApp.emr.REACT_APP_NAME : 'RM';
        color = '#e7505a';
        break;
      case '_system':
        url = isDev
          ? `http://localhost:${envApp.sistem ? envApp.sistem.PORT : '9002'}`
          : remote.app.getAppPath() + '/build/system/index.html';
        titleApp = envApp.sistem ? envApp.sistem.REACT_APP_NAME : 'Sistem';
        color = '#3598dc';
        break;
      default:
        url = isDev
          ? 'http://localhost:9001'
          : remote.app.getAppPath() + '/build/billing/index.html';
        titleApp = 'Billing';
        color = '#5c97bd';
        break;
    }

    let splash = this.createSplashWindow({
      brand: 'SIMRS',
      productName: titleApp,
      color,
    });

    windowApp.on('ready-to-show', () => {
      splash.destroy();
      windowApp.show();
      windowApp.focus();
    });

    windowApp.on('unmaximize', () => {
      windowApp.center();
    });

    // const template = this._createMenuTemplate(app);
    // const menu = Menu.buildFromTemplate(template)
    // windowApp.setMenu(menu)
    // windowApp.maximize();
    windowApp.loadURL(url);
    // windowApp.show();
  }

  _logout() {
    this.props.action.onLogout();
  }
}

const mapStateToProps = function (state) {
  let { loader } = state;

  return {
    isLoading: loader.count > 0,
    // isValidLogout: auth.get('isValidLogout')
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onLogout: authActions.logout.request,
      },
      dispatch
    ),
  };
};

Main.propTypes = {
  history: PropTypes.object,
  action: PropTypes.object,
  isLoading: PropTypes.bool,
  // isValidLogout: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Main));
