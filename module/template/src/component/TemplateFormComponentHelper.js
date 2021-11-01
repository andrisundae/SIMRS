import React from 'react';
import _ from 'lodash';
import ComponentData from './component-data/ComponentData';

const TemplateFormComponentHelper = {
  whiteSpace: 20,
  handleYesterday: function (today, yesterday) {
    yesterday = parseInt(yesterday, 10);
    var pasien = JSON.parse(localStorage.getItem('pasien'));
    let minDate = today,
      maxDate = today;

    if (yesterday === 0) {
      minDate = 0;
      maxDate = 0;
    } else if (yesterday === 1) {
      minDate = today.add(-1, 'd');
    } else if (yesterday === 2) {
      // minDate = moment(pasien.TglMulai, 'YYYY-MM-DD 00:00:00');
      maxDate = 0;
    } else if (yesterday === 3) {
      // minDate = moment(pasien.TglMulai, 'YYYY-MM-DD HH:mm:ss');
      // maxDate = moment(
      //   null === pasien.TglSelesai ? today : pasien.TglSelesai,
      //   'YYYY-MM-DD HH:mm:ss'
      // );
    }

    return {
      minDate: minDate,
      maxDate: maxDate,
    };
  },
  labelStyle: function (style) {
    if (!style) {
      return;
    }

    if ('undefined' != typeof style.heading) {
      return style.heading;
    }

    var bold =
        'undefined' != typeof style.bold && style.bold ? '' : 'text-normal',
      italic =
        'undefined' != typeof style.italic && style.italic ? 'text-italic' : '',
      underline =
        'undefined' != typeof style.underline && style.underline
          ? 'text-underline'
          : '';

    return bold + ' ' + italic + ' ' + underline;
  },
  createWhiteSpace: function (length) {
    return (
      <div
        style={{
          float: 'left',
          width: this.whiteSpace * length + '%',
          height: '10px',
        }}
      />
    );
  },
  createFormLabel: function (label, level, style) {
    let styles = {
      float: 'left',
      marginLeft: this.whiteSpace * level + 'px',
      textAlign: 'left',
    };

    if ('undefined' == typeof style.heading) {
      styles.fontSize =
        ('undefined' != typeof style.font_size ? style.font_size : '14') + 'px';
    }

    return (
      <label className="col-xs-6 control-label">
        <div style={styles} className={this.labelStyle(style)}>
          {label}
        </div>
      </label>
    );
  },
  createLabel: function (label, level, style) {
    let styles = {
      float: 'left',
      marginLeft: this.whiteSpace * level + 'px',
      textAlign: 'left',
    };

    if ('undefined' == typeof style.heading) {
      styles.fontSize =
        ('undefined' != typeof style.font_size ? style.font_size : '14') + 'px';
    }

    return (
      <div className="form-group">
        <label className="col-xs-12 control-label">
          <div style={styles} className={this.labelStyle(style)}>
            {label}
          </div>
        </label>
      </div>
    );
  },
  createLabelWithCheckbox: function (form, name, label, level, style) {
    return (
      <div
        className="checkbox"
        style={{ width: '100%', marginBottom: '10px !important' }}
      >
        <label
          style={{
            float: 'left',
            marginLeft: this.whiteSpace * level + 'px',
            textAlign: 'left',
          }}
        >
          <input
            type="checkbox"
            form={form}
            name={name}
            id={_.camelCase(name)}
          />
          <span className={this.labelStyle(style)}>{label}</span>
        </label>
      </div>
    );
  },
  createText: function (
    form,
    type,
    name,
    label,
    format,
    length,
    placeholder,
    rows,
    yesterday,
    level,
    style,
    dateTimeDefaultValue
  ) {
    if ('textarea' == type && 10 < rows && 0 == level) {
      return (
        <div>
          <div className="form-group">
            {this.createFormLabel(label, level, style)}
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <textarea
                name={name}
                id={_.camelCase(name)}
                className="form-control"
                placeholder={placeholder}
                rows={rows}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="form-group">
        {this.createFormLabel(label, level, style)}
        <div className="col-xs-6">
          {/* {(() => {
            if (length) {
              if ('textarea' === type) {
                return (
                  <CustomComponent.InputWithCounter.MultiLine
                    form={form}
                    name={name}
                    id={_.camelCase(name)}
                    count={length}
                    rows={rows}
                    maxLength={length}
                    placeholder={placeholder}
                    counterPositionStyle={{
                      float: 'right',
                      marginTop: -3,
                    }}
                  />
                );
              } else {
                return (
                  <CustomComponent.InputWithCounter.OneLine
                    form={form}
                    name={name}
                    id={_.camelCase(name)}
                    count={length}
                    maxLength={length}
                    placeholder={placeholder}
                    counterPositionStyle={{
                      float: 'right',
                      marginTop: -3,
                    }}
                  />
                );
              }
            } else {
              let today = moment(dateTimeDefaultValue, 'YYYY-MM-DD HH:mm:ss');

              switch (format) {
                case 'date':
                  return (
                    <div
                      className="input-group dateonly date"
                      id={_.camelCase(name)}
                    >
                      <input
                        type="text"
                        data-yesterday={yesterday}
                        form={form}
                        name={name}
                        id={_.camelCase(name)}
                        className="form-control"
                        autoComplete="off"
                        placeholder={placeholder}
                        defaultValue={today.format('DD/MM/YYYY')}
                      />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar" />
                      </span>
                    </div>
                  );

                case 'time':
                  return (
                    <div
                      className="input-group time date"
                      id={_.camelCase(name)}
                    >
                      <input
                        type="text"
                        form={form}
                        name={name}
                        id={_.camelCase(name)}
                        className="form-control"
                        autoComplete="off"
                        placeholder={placeholder}
                        defaultValue={today.format('HH:mm')}
                      />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-time" />
                      </span>
                    </div>
                  );

                case 'datetime':
                  return (
                    <div
                      className="input-group datetime date"
                      id={_.camelCase(name)}
                    >
                      <input
                        type="text"
                        data-yesterday={yesterday}
                        form={form}
                        name={name}
                        id={_.camelCase(name)}
                        className="form-control"
                        autoComplete="off"
                        placeholder={placeholder}
                        defaultValue={today.format('DD/MM/YYYY HH:mm')}
                      />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar" />
                      </span>
                    </div>
                  );

                default:
                  if ('textarea' == type) {
                    return (
                      <textarea
                        form={form}
                        name={name}
                        id={_.camelCase(name)}
                        className="form-control"
                        placeholder={placeholder}
                        rows={rows}
                      />
                    );
                  }

                  format = 'text';

                  break;
              }

              return (
                <input
                  type={format}
                  form={form}
                  name={name}
                  id={_.camelCase(name)}
                  className="form-control"
                  autoComplete="off"
                  placeholder={placeholder}
                />
              );
            }
          })()} */}
        </div>
      </div>
    );
  },
  createTextWithUnit: function (
    form,
    name,
    label,
    length,
    placeholder,
    unit,
    level,
    style
  ) {
    return (
      <div className="form-group">
        {this.createFormLabel(label, level, style)}
        <div className="col-xs-6">
          <div
            className="input-group"
            style={{
              marginBottom: false === length ? 0 : 18,
            }}
          >
            {/* {false === length ? (
              <input
                type="text"
                form={form}
                name={name}
                id={_.camelCase(name)}
                className="form-control"
                autoComplete="off"
                placeholder={placeholder}
              />
            ) : (
              <CustomComponent.InputWithCounter.OneLine
                form={form}
                name={name}
                id={_.camelCase(name)}
                count={length}
                maxLength={length}
                placeholder={placeholder}
                counterPositionStyle={{
                  position: 'absolute',
                  marginTop: 31,
                  right: 0,
                }}
              />
            )} */}
            <span className="input-group-addon">{unit}</span>
          </div>
        </div>
      </div>
    );
  },
  createDropdown: function (
    form,
    name,
    label,
    options,
    placeholder,
    level,
    style
  ) {
    var optionNodes = [],
      inputText = null;

    if (placeholder) {
      optionNodes.push(<option value="">{placeholder}</option>);
    }

    // for (var key in options) {
    //   if ('object' == typeof options[key]) {
    //     if ('undefined' != typeof options[key].rows) {
    //       inputText = (
    //         <CustomComponent.InputWithCounter.MultiLine
    //           form={form}
    //           name={name + '[description]'}
    //           id={_.camelCase(key)}
    //           count={options[key].length}
    //           rows={
    //             'undefined' != typeof options[key].rows ? options[key].rows : 0
    //           }
    //           maxLength={options[key].length}
    //           placeholder={options[key].placeholder}
    //           counterPositionStyle={{
    //             float: 'right',
    //             marginTop: -3,
    //           }}
    //         />
    //       );
    //     } else {
    //       inputText = (
    //         <CustomComponent.InputWithCounter.OneLine
    //           form={form}
    //           name={name + '[description]'}
    //           id={_.camelCase(key)}
    //           count={options[key].length}
    //           maxLength={options[key].length}
    //           placeholder={options[key].placeholder}
    //           counterPositionStyle={{
    //             float: 'right',
    //             marginTop: -3,
    //           }}
    //         />
    //       );
    //     }
    //   } else {
    //     optionNodes.push(<option value={options[key]}>{options[key]}</option>);
    //   }
    // }

    return (
      <div className="form-group">
        {this.createFormLabel(label, level, style)}
        <div className="col-xs-6">
          <select
            className="form-control"
            form={form}
            name={name + '[value]'}
            id={_.camelCase(name)}
          >
            {optionNodes}
          </select>
          {null != inputText ? (
            <>
              <div style={{ display: 'block', marginTop: '10px' }} />
              {inputText}
            </>
          ) : (
            inputText
          )}
        </div>
      </div>
    );
  },
  createDropdownFromData: function (
    form,
    name,
    label,
    source,
    placeholder,
    level,
    style
  ) {
    return (
      <div className="form-group">
        {this.createFormLabel(label, level, style)}
        <div className="col-xs-6">
          {/* <CustomComponent.DropDownFromAPI
            form={form}
            name={name}
            id={_.camelCase(name)}
            apiPath={servicePath + '/dokumen_medis/dropdown/source/' + source}
            placeholder={placeholder}
          /> */}
        </div>
      </div>
    );
  },
  DataSourceComponent: function (props, source) {
    switch (source) {
      case 'master_diagnosis_ix_all_multiselect':
        return <ComponentData.MasterDiagnosis {...props} versi={9} />;

      case 'anamnesis_medis':
        return <ComponentData.Anamnesis {...props} />;

      case 'anamnesis_all_selective':
        return <ComponentData.Anamnesis {...props} selective />;

      default:
        return null;
    }
  },
};

export default TemplateFormComponentHelper;
