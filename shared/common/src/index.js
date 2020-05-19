var store = require('./store');
var request = require('./helpers/request');
var xhrRequest = require('./helpers/xhrRequest');
var redux = require('./helpers/redux');
var { Translation } = require('./helpers/Translation');
var { i18n } = require('./helpers/i18n');
var { emitter, actions } = require('./helpers/toastr');
var validator = require('./utils/validator');
var formatter = require('./utils/formatter');
var menu = require('./utils/menu');
var templates = require('./utils/templates');
var findNextElement = require('./utils/findNextElement');
var { id } = require('./utils/locale');
var utils = require('./utils');

module.exports = {
  store,
  request,
  xhrRequest,
  redux,
  validator,
  formatter,
  menu,
  templates,
  findNextElement,
  Translation,
  i18n,
  toastr: emitter,
  toastrActions: actions,
  localeId: id,
  utils,
};
