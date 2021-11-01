import React from 'react';
import _ from 'lodash';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import CustomComponent from '@simrs/rekam-medis/src/custom-component/CustomComponent';
import { Input, Form, Divider } from 'semantic-ui-react';

const ComponentFunction = {
  nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2'
    );
  },
  EmptyReplace: (oldValue, newValue) => {
    return null !== oldValue || '' !== oldValue.trim() ? oldValue : newValue;
  },
  EmptyLabel: function (type) {
    switch (type) {
      case 'ada':
        return 'Tidak Ada';
      case 'tanya':
        return 'Tidak Ditanyakan';
      case 'perlu':
        return 'Tidak Diperlukan';
      case 'periksa':
        return 'Tidak Diperiksa';
      case 'b-isi':
        return 'Belum Diisi';
      case 't-ukur':
        return 'Tidak Terukur';
      default:
        return '';
    }
  },
  CustomPreStyle: (custom = {}) => {
    let styles = {
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    };
    Object.assign(styles, custom);
    return styles;
  },
  ParseJSON: function (data) {
    let parsed = true;
    try {
      JSON.parse(data);
    } catch (e) {
      parsed = false;
    }
    if (parsed) {
      let tempData = JSON.parse(data);
      if (tempData === null) {
        return data;
      } else if (
        tempData.constructor === Array ||
        tempData.constructor === Object
      ) {
        return tempData;
      } else {
        return data;
      }
    } else {
      return data;
    }
  },
  BuildParams: function (data, exclude = null) {
    let tempData = data,
      response = {};
    if (exclude !== null && exclude.constructor === Array) {
      if (Object.keys(tempData).length > 0 && exclude.length > 0) {
        for (var i = 0; i < exclude.length; i++) {
          delete tempData[exclude[i]];
        }
      }
    }

    for (var j = 0; j < Object.keys(tempData).length; j++) {
      let dataKey = Object.keys(tempData)[j];
      response[dataKey] = ComponentFunction.ParseJSON(tempData[dataKey]);
      if (response[dataKey] === null) {
        response[dataKey] = '';
      } else if (response[dataKey].constructor === Array) {
        response[dataKey] =
          response[dataKey].length > 0 ? response[dataKey] : {};
      } else if (typeof response[dataKey] === 'number') {
        response[dataKey] = response[dataKey].toString();
      }
    }
    return response;
  },
  JoinParams: function (data, dataLain) {
    let tempData = data;
    if (tempData instanceof Object) {
      tempData =
        Object.keys(tempData).length > 0
          ? Object.keys(tempData)
              .map((k) => {
                return tempData[k];
              })
              .join(', ')
          : '';
      if (tempData === '' && dataLain === '') {
        tempData = '';
      } else if (tempData === '' && dataLain !== '') {
        tempData = dataLain;
      } else if (tempData !== '' && dataLain === '') {
        tempData = tempData;
      } else {
        tempData = [tempData, dataLain].join(', ');
      }
    }
    return tempData;
  },
  RemoveParams: function (data, remove, reverse = false) {
    let tempData = data;
    if (Object.keys(tempData).length > 0 && remove.length > 0) {
      if (reverse) {
        Object.keys(tempData).map((k) => {
          if (-1 === remove.indexOf(k)) {
            delete tempData[k];
          }
        });
      } else {
        for (var i = 0; i < Object.keys(remove).length; i++) {
          delete tempData[remove[i]];
        }
      }
    }
    return tempData;
  },
  AutoComplete: (props) => {
    const className = props?.className ? props.className : '',
      style = props?.style ? props.style : {},
      placeholder = props?.placeholder ? props.placeholder : '',
      id = props?.id ? props.id : 'inputAutoComplete';

    return (
      <div className={`mb-2 ${className}`} style={style}>
        <Input
          id={id}
          placeholder={placeholder}
          fluid
          action={{
            icon: 'search',
            color: 'blue',
            onClick: () => {
              if (
                props?.onButtonClick &&
                props.onButtonClick.constructor === Function
              ) {
                props.onButtonClick(document.getElementById(id)?.value);
              }
            },
          }}
          autoComplete="off"
          onKeyUp={(e) => {
            if (props?.onKeyUp && props.onKeyUp.constructor === Function) {
              props.onKeyUp(e);
            }
          }}
        />
      </div>
    );
  },
  DoFilterAutoComplete: (data, value, callback) => {
    let tempData = [],
      tempValue =
        value.constructor === Object
          ? _.lowerCase(value.filter).trim()
          : _.lowerCase(value).trim();

    if ('' === tempValue) {
      tempData = data;
    } else {
      data.map((v, i) => {
        let columnOne =
            value.constructor === Object ? v[value.column[0]] : v.kode,
          columnTwo =
            value.constructor === Object ? v[value.column[1]] : v.nama;

        if (
          -1 !== _.lowerCase(columnOne).indexOf(tempValue) ||
          -1 !== _.lowerCase(columnTwo).indexOf(tempValue)
        ) {
          v.indexParent = i;
          tempData.push(v);
        }
      });
    }

    if (callback.constructor === Function) {
      callback(tempData);
    } else {
      return tempData;
    }
  },
  RenderSelectedDataTable: (props) => {
    const data = props?.data ? props.data : [];
    if (data.length === 0) {
      return null;
    }

    return (
      <>
        <TableContainer maxHeight="300">
          <ReactTable
            celled
            compact
            data={data}
            cellRowClassName="cursor-pointer"
            getRowProps={props?.getRowProps}
            getCellProps={props?.getCellProps}
            columns={props?.columns ? props.columns : []}
            onRowClick={(row) => {
              if (
                props?.onRowClick &&
                props.onRowClick.constructor === Function
              ) {
                props.onRowClick(row.original);
              }
            }}
          />
        </TableContainer>
        <Divider />
      </>
    );
  },
  RenderSelectedData: function (key, label, level, data) {
    const Component = CustomComponent,
      Label = Component.SelectData.Label;

    return (
      <Form.Group key={key} widths="equal">
        <Form.Field>
          <Label level={level}>{label}</Label>
        </Form.Field>
        <Form.Field>
          <p className="py-1.5 mb-0">
            <span style={ComponentFunction.CustomPreStyle()}>{data}</span>
          </p>
        </Form.Field>
      </Form.Group>
    );
    return (
      <div key={key} className="form-group">
        <g.Label level={level}>{label}</g.Label>
        <div className="col-xs-6">
          <p className="form-control-static">
            <span style={ComponentFunction.CustomPreStyle()}>{data}</span>
          </p>
        </div>
      </div>
    );
  },
  onSelectItem: (selectedData, data, componenRef = {}, type = 'multi') => {
    const isMulti = selectedData.constructor === Array;
    let tempData = selectedData;
    let store = [];
    if (isMulti) {
      store = data;
      if (tempData.length > 0) {
        let index = tempData
          .map((e) => {
            return e.kode;
          })
          .indexOf(data.kode);
        if (index > -1) {
          tempData.splice(index, 1);
        } else {
          tempData.push(data);
        }
      } else {
        tempData.push(data);
      }
    } else {
      store = data;
    }

    if (Object.keys(componenRef).length > 0) {
      const selectData = componenRef.selectData,
        forceUpdate = componenRef.forceUpdate;
      selectData.current.onSelectItem(store, forceUpdate);
    }

    return isMulti ? tempData : data;
  },
};

export default ComponentFunction;
