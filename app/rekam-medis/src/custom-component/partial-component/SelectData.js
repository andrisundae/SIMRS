import React, { Component } from 'react';
// import update from 'immutability-helper';
// import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'semantic-ui-react';

const whiteSpace = 20;

const labelStyle = (style) => {
  if (!style) {
    return;
  }

  if ('undefined' !== typeof style.heading) {
    return style.heading;
  }

  const bold =
      'undefined' !== typeof style.bold && style.bold ? '' : 'text-normal',
    italic =
      'undefined' !== typeof style.italic && style.italic ? 'text-italic' : '',
    underline =
      'undefined' !== typeof style.underline && style.underline
        ? 'text-underline'
        : '';

  return bold + ' ' + italic + ' ' + underline;
};

const Label = (props) => {
  let styles = {
    float: 'left',
    marginLeft: whiteSpace * props.level + 'px',
    textAlign: 'left',
  };

  if ('undefined' === typeof props.style.heading) {
    styles.fontSize =
      ('undefined' !== typeof props.style.font_size
        ? props.style.font_size
        : 14) + 'px';
  }

  return (
    <div className={labelStyle(props.style)} style={styles}>
      {props.children}
    </div>
  );
};

Label.defaultProps = {
  style: {},
};

class SelectData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedData: [],
      openData: false,
      openDataChild: false,
      selectedCellKey: -1,
      selectedCellLabel: [],
    };

    this._onToggleModal = this._onToggleModal.bind(this);
    this._onToggleModalChild = this._onToggleModalChild.bind(this);
  }

  render() {
    const selectedData = this.state.selectedData;
    let level = this.props.level,
      btnStyle =
        undefined !== this.props.buttonStyle ? this.props.buttonStyle : {},
      btnLabel = undefined !== btnStyle.label ? btnStyle.label : 'Pilih Data';

    return (
      <div>
        <Form.Group widths="equal">
          <Form.Field>
            <Label level={level} style={this.props.style}>
              {this.props.label}
            </Label>
          </Form.Field>
          <Form.Field>
            <input
              type="hidden"
              form={this.props.form}
              name={this.props.name}
              value={JSON.stringify(selectedData)}
            />
            <Button
              color="blue"
              size="tiny"
              icon="list"
              content={btnLabel}
              onClick={() => this._onToggleModal()}
            />
          </Form.Field>
        </Form.Group>
        {0 < Object.keys(this.state.selectedData).length &&
          (typeof this.props.children[0].type === 'function'
            ? React.cloneElement(this.props.children[0], {
                ...this.props.children[0],
                level: this.props.level,
                selectedData: this.state.selectedData,
                selectedCellLabel: this.state.selectedCellLabel,
                multiSelect: this.props.multiSelect,
                selectCell: this.props.selectCell,
                multiSelectChild: this.props.multiSelectChild,
                childHasParent: this.props.childHasParent,
              })
            : this.props.children[0])}

        {Object.keys(this.state.selectedData).length > 0 && <br />}

        <Modal
          id="parentModal"
          closeIcon
          closeOnDimmerClick={false}
          centered={false}
          size="fullscreen"
          open={this.state.openData}
          onClose={() => this._onToggleModal()}
        >
          <Modal.Header>{this.props.label}</Modal.Header>
          <Modal.Content>{this.props.children[1]}</Modal.Content>
          <Modal.Actions>
            <Button
              icon="close"
              content="Tutup"
              onClick={() => this._onToggleModal()}
            />
          </Modal.Actions>
        </Modal>

        <Modal
          id="childModal"
          closeIcon
          closeOnDimmerClick={false}
          centered={false}
          size="fullscreen"
          open={this.state.openDataChild}
          onClose={() => this._onToggleModalChild()}
        >
          <Modal.Header>{this.props.labelChild}</Modal.Header>
          <Modal.Content>{this.props.children[2]}</Modal.Content>
          <Modal.Actions>
            <Button
              icon="close"
              content="Tutup"
              onClick={() => this._onToggleModalChild()}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  onSelectItem(data, forceUpdate) {
    if (this.props.multiSelect) {
      let store = this.state.selectedData;

      let index = store
        .map((e) => {
          return e.kode;
        })
        .indexOf(data.kode);
      if (index === -1) {
        store.push(data);
      } else {
        store.splice(index, 1);
      }
      this.setState({
        selectedData: store,
      });
    } else {
      this.setState((prevState) => ({
        selectedData: data,
        openData: !prevState.openData,
      }));
    }

    if (forceUpdate.constructor === Function) {
      forceUpdate();
    }
  }

  onSelectCell(obj) {
    let countUniqueKey =
      undefined !== obj.uniqueKey ? Object.keys(obj.uniqueKey).length : 0;
    let uniqueKeyValue = {};
    let dataKeyValue = {};
    let store =
      this.state.selectedData[0] === undefined
        ? {}
        : this.state.selectedData[0];

    if (this.state.selectedCellKey === -1) {
      if (undefined !== obj.uniqueKey) {
        Object.keys(obj.uniqueKey).map((v, i) => {
          uniqueKeyValue[v] = obj.uniqueKey[v];
          return null;
        });
      }
      Object.keys(obj.keyValue).map((v, i) => {
        dataKeyValue[v] = obj.keyValue[v];
        return null;
      });

      this.setState({
        selectedCellKey: obj.index,
        selectedData: [
          {
            key: obj.index,
            ...uniqueKeyValue,
            ...dataKeyValue,
          },
        ],
      });
    } else if (this.state.selectedCellKey === obj.index) {
      Object.keys(obj.keyValue).map((v, i) => {
        if (store.hasOwnProperty(v)) {
          delete store[v];
        } else {
          if (!store.hasOwnProperty(v)) {
            store[v] = obj.keyValue[v];
          }
        }
        return null;
      });

      this.setState({
        selectedData: [store],
      });
    }

    if (Object.keys(store).length - countUniqueKey === 1) {
      this.setState({
        selectedData: [],
        selectedCellLabel: [],
        selectedCellKey: -1,
      });
    }

    if (obj.forceUpdate.constructor === Function) {
      obj.forceUpdate();
    }
  }

  onSelectChild(obj, parentOnly = false) {
    let store =
      this.state.selectedData.length === 0 ? [] : this.state.selectedData;

    if (Object.keys(store).length === 0 || !store.hasOwnProperty(obj.key)) {
      store[obj.key] = obj.parent;
      if (Object.keys(obj.child).length > 0 && parentOnly === false) {
        store[obj.key].details.push(obj.child);
      }
    } else {
      if (parentOnly) {
        if (undefined !== store[obj.key]) {
          delete store[obj.key];
        }
      } else {
        const selectedIndex = store[obj.key].details.findIndex(
            (selectedData) => {
              // selectedData = Immutable.fromJS(selectedData);
              // return Immutable.is(selectedData, Immutable.fromJS(obj.child));
            }
          ),
          hasData = -1 < selectedIndex;

        if (hasData) {
          store[obj.key].details.splice(selectedIndex, 1);

          if (store[obj.key].details.length === 0) {
            delete store[obj.key];
          }
        } else {
          if (Object.keys(obj.child).length > 0) {
            store[obj.key].details.push(obj.child);
          }
        }
      }
    }

    this.setState({
      selectedData: store,
    });

    if (obj.forceUpdate.constructor === Function) {
      obj.forceUpdate();
    }
  }

  getSelectedData() {
    return this.state.selectedData;
  }

  resetSelectedData() {
    this.setState({
      selectedData: [],
    });
  }

  _onToggleModal() {
    this.setState((prevState) => ({
      openData: !prevState.openData,
    }));
  }

  _onToggleModalChild() {
    this.setState((prevState) => ({
      openDataChild: !prevState.openDataChild,
    }));
  }
}

SelectData.defaultProps = {
  multiSelect: false,
  selectCell: false,
  multiSelectChild: false,
  childHasParent: false,
};

const SelectedData = (props) => {
  const empty = '';

  return (
    <div>
      {(() => {
        if (props.multiSelect) {
          return (
            <table
              className="table table-bordered table-condensed table-striped"
              style={{
                width: 'calc(100% - ' + whiteSpace * props.level + 'px)',
                marginLeft: whiteSpace * props.level + 'px',
              }}
            >
              <thead>
                <tr>
                  {React.Children.map(props.children, (children) => {
                    const align = children.props.align || 'left';

                    return (
                      <th className={'text-' + align}>
                        {children.props.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {props.selectedData.map((selectedData, index) => {
                  return (
                    <tr key={index}>
                      {React.Children.map(props.children, (children) => {
                        const align = children.props.align || 'left';

                        return (
                          <td className={'text-' + align}>
                            {React.cloneElement(children, {
                              data: selectedData,
                              customValue: children.props.customValue,
                              value: selectedData[children.props.name] || empty,
                            })}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        } else if (props.multiSelectChild) {
          let data = props.selectedData;
          return Object.keys(data).map((keyCode, index) => {
            let listDetails = data[keyCode].details;
            let returnData = '';

            if (props.childHasParent) {
              let parents = listDetails.map((list, indexList) => {
                return list.parent;
              }, []);

              let uniqueKeys = parents.reduce((a, b) => {
                if (a.indexOf(b) < 0) a.push(b);
                return a;
              }, []);

              returnData = uniqueKeys.map((parent, indexParent) => {
                return [
                  <tr key={'a' + indexParent}>
                    {React.Children.map(props.children, (children) => {
                      const align = children.props.align || 'left';
                      if (children.props.colspan !== undefined) {
                        return (
                          <td
                            className={'text-' + align}
                            colSpan={children.props.colspan}
                          >
                            {parent}
                          </td>
                        );
                      }
                    })}
                  </tr>,
                  listDetails.map((list, indexList) => {
                    if (list.parent === parent) {
                      return (
                        <tr key={'b' + indexList}>
                          {React.Children.map(props.children, (children) => {
                            const align = children.props.align || 'left';
                            return (
                              <td className={'text-' + align}>
                                {React.cloneElement(children, {
                                  data: list,
                                  customValue: children.props.customValue,
                                  value:
                                    (children.props.name === 'parent'
                                      ? ''
                                      : list[children.props.name]) || empty,
                                })}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  }),
                ];
              });
            } else {
              returnData = listDetails.map((list, indexList) => {
                return (
                  <tr key={indexList}>
                    {React.Children.map(props.children, (children) => {
                      const align = children.props.align || 'left';
                      return (
                        <td className={'text-' + align}>
                          {React.cloneElement(children, {
                            data: list,
                            customValue: children.props.customValue,
                            value: list[children.props.name] || empty,
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              });
            }

            return (
              <div key={index}>
                <div className="form-group">
                  <div className="col-xs-12">
                    <Label level={1}>
                      <h4>
                        <strong>
                          {data[keyCode].nama} - {data[keyCode].tanggal}
                        </strong>
                      </h4>
                    </Label>
                  </div>
                </div>
                <table
                  className="table table-bordered table-condensed table-striped"
                  style={{
                    width: 'calc(100% - ' + whiteSpace * props.level + 'px)',
                    marginLeft: whiteSpace * props.level + 'px',
                  }}
                >
                  <thead>
                    <tr>
                      {React.Children.map(props.children, (children) => {
                        const align = children.props.align || 'left';
                        return (
                          <th className={'text-' + align}>
                            {children.props.label}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>{returnData}</tbody>
                </table>
              </div>
            );
          });
        } else if (props.selectCell) {
          return null;
          // let data = props.selectedData[0];
          // let label = props.selectedCellLabel[0];
          // if (data !== undefined) {
          //     return Object.keys(data).map((keyName, index) => {
          //         if (keyName !== 'key') {
          //             return React.Children.map(props.children, (children) => {
          //                 return React.cloneElement(children, {
          //                     ...children.props,
          //                     label: label[keyName] || empty,
          //                     value: data[keyName] || empty,
          //                 });
          //             });
          //         } else {
          //             return null;
          //         }
          //     });
          // }
        } else {
          return React.Children.map(props.children, (children) => {
            return React.cloneElement(children, {
              ...children.props,
              value: props.selectedData[0][children.props.name] || empty,
            });
          });
        }
      })()}
    </div>
  );
};

SelectedData.Item = (props) => {
  const Decorator = props.valueDecorator;

  return (
    <div className="form-group">
      <Label level={props.level}>{props.label}</Label>
      <div className="col-xs-6">
        <p className="form-control-static">
          <Decorator>{props.value}</Decorator>
        </p>
      </div>
    </div>
  );
};

SelectedData.Item.propTypes = {
  valueDecorator: PropTypes.func,
};

SelectedData.Item.defaultProps = {
  valueDecorator: (props) => <span>{props.children}</span>,
};

SelectedData.Column = (props) => {
  return (
    <div>
      {undefined !== props.customValue
        ? props.customValue(props.data)
        : props.value}
    </div>
  );
};

const DataList = (props) => {
  return props.children;
};

const DataListChild = (props) => {
  return props.children;
};

export { SelectData as default, Label, SelectedData, DataList, DataListChild };
