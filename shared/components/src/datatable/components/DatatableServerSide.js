import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ContextMenu,
  MenuItem as Item,
  ContextMenuTrigger,
} from 'react-contextmenu';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';

import { formatter } from '@simrs/common';

import CurrencyInputRenderer from './CurrencyInputRenderer';
import NumericInputRenderer from './NumericInputRenderer';
import FooterPinnedRowRenderer from './FooterPinnedRowRenderer';
import CheckboxRenderer from './CheckboxRenderer';
import imgLoading from '../../static/media/img/loading-spinner-grey.gif';

import alias from '../const';
import HeaderCheckboxRenderer from './HederCheckboxRenderer';

class DataTableServerSide extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      navigation: {
        shift: false,
      },
      focusData: {},
    };

    this._onGridReady = this._onGridReady.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onModelUpdated = this._onModelUpdated.bind(this);
    this._navigateToNextCell = this._navigateToNextCell.bind(this);
    this._onCellContextMenu = this._onCellContextMenu.bind(this);
    this._handleResizeWindow = this._handleResizeWindow.bind(this);
    this._onSuppressKeyboardEvent = this._onSuppressKeyboardEvent.bind(this);

    //Set css theme
    // this._setThemeCss();
  }

  _setThemeCss() {
    // switch (this.props.theme) {
    //     case alias.theme.balham:
    //         require('ag-grid/dist/styles/ag-theme-balham.css');
    //         break;
    //     case alias.theme.material:
    //         require('ag-grid/dist/styles/ag-theme-material.css');
    //         break;
    //     case alias.theme.fresh:
    //         require('ag-grid/dist/styles/ag-theme-fresh.css');
    //         break;
    //     case alias.theme.blue:
    //         require('ag-grid/dist/styles/ag-theme-blue.css');
    //         break;
    //     case alias.theme.dark:
    //         require('ag-grid/dist/styles/ag-theme-dark.css');
    //         break;
    //     case alias.theme.bootstrap:
    //         require('ag-grid/dist/styles/ag-theme-bootstrap.css');
    //         break;
    //     default:
    //         require('ag-grid/dist/styles/ag-theme-balham.css');
    // }
  }

  render() {
    const {
      data,
      name,
      columns,
      containerHeight,
      containerWidth,
      shortcut,
      contextMenuItems,
      navigateToSelect,
      disabled,
      messageDisabled,
      ...gridOptions
    } = this.props;

    let containerStyle = {
      height: containerHeight,
      width: containerWidth,
    };

    let options = {
      onGridReady: this._onGridReady,
      onCellContextMenu: this._onCellContextMenu,
      components: {
        loadingRenderer: this._renderLoading,
        dateRenderer: this._renderDate,
        currencyRenderer: this._renderCurrency,
      },
      onModelUpdated: this._onModelUpdated,
      overlayNoRowsTemplate: this._renderNoRowsTemplate(),
      overlayLoadingTemplate: this._renderLoadingTemplate(),
    };

    if (navigateToSelect === true) {
      options.navigateToNextCell = this._navigateToNextCell;
    }

    options = {
      ...gridOptions,
      ...options,
      frameworkComponents: {
        currencyInputRenderer: CurrencyInputRenderer,
        numericInputRenderer: NumericInputRenderer,
        headerCheckboxRenderer: HeaderCheckboxRenderer,
        footerPinnedRowRenderer: FooterPinnedRowRenderer,
        checkboxRenderer: CheckboxRenderer,
      },
    };

    return (
      <Segment
        loading={disabled}
        // style={{ height: containerHeight }}
        className="ag-grid-segment"
      >
        <ContextMenuTrigger id="context-menu-datatable">
          <div
            style={containerStyle}
            className={`${this.props.theme}`}
            onKeyUp={this._onKeyUp}
            onKeyDown={this._onKeyDown}
          >
            <AgGridReact
              ref={name}
              columnDefs={columns}
              suppressKeyboardEvent={this._onSuppressKeyboardEvent}
              {...options}
            />
          </div>
        </ContextMenuTrigger>
        {contextMenuItems.length > 0 && this._renderContextMenu()}
      </Segment>
      // <div
      //     style={containerStyle}
      //     className={`${this.props.theme}`}
      //     onKeyUp={this._onKeyUp}
      //     onKeyDown={this._onKeyDown}
      // >
      //     <AgGridReact
      //         ref={name}
      //         columnDefs={columns}
      //         {...options}
      //     >
      //     </AgGridReact>
      // </div>
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResizeWindow);
  }

  autoSizeAll = (params) => {
    var allColumnIds = [];
    params.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });

    params.columnApi.autoSizeColumns(allColumnIds, false);
  };

  _onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    if (this.props.shortcut) {
      this.props.shortcut(this.gridApi, this.columnApi);
    }

    if (this.props.sizeColumnsToFit) {
      this.gridApi.sizeColumnsToFit();
    }

    // this.autoSizeAll();

    window.addEventListener('resize', this._handleResizeWindow);
  }

  _handleResizeWindow() {
    let _this = this;
    setTimeout(function () {
      _this.gridApi.sizeColumnsToFit();
    });
  }

  _onModelUpdated(params) {
    let gridApi = params.api;

    if (gridApi.getInfiniteRowCount() <= 0) {
      gridApi.showNoRowsOverlay();
    } else {
      gridApi.hideOverlay();
      if (this.props.navigateToSelect === true) {
        let cell = gridApi.getFocusedCell();
        if (cell) {
          let selectedNodes = gridApi.getSelectedNodes();
          let firstNode = selectedNodes.length > 0 ? selectedNodes[0] : {};
          let startIndex = firstNode ? firstNode.rowIndex : 0;
          let endIndex = cell.rowIndex;
          let selectedIndex = [];

          if (startIndex < endIndex) {
            for (let i = startIndex; i <= endIndex; i++) {
              selectedIndex[i] = i;
            }
          } else {
            for (let i = startIndex; i >= endIndex; i--) {
              selectedIndex[i] = i;
            }
          }

          if (this.state.navigation.shift) {
            // this.gridApi.forEachNode((node) => {
            //     if (node.selectable) {
            //         if (selectedIndex[node.rowIndex]) {
            //             if (!node.isSelected()) {
            //                 node.setSelected(true);
            //             }
            //         }
            //     }
            // });
            if (selectedIndex.length > 0) {
              selectedIndex.forEach((row) => {
                let node = this._findNodeByRowIndex(row);
                if (node.selectable) {
                  if (selectedIndex[node.rowIndex]) {
                    if (!node.isSelected()) {
                      if (node.data) {
                        node.setSelected(true);
                      }
                    }
                  }
                }
              });
            }
          } else {
            let node = this._findNodeByRowIndex(endIndex);
            if (node) {
              if (node.selectable) {
                if (node.data) {
                  node.setSelected(true, true);
                }
              }
            }
          }
        }
      }
    }

    if (this.props.onModelUpdated) {
      this.props.onModelUpdated(params);
    }

    if (this.props.sizeColumnsToFit) {
      gridApi.sizeColumnsToFit();
    }

    if (this.props.autoSizeColumn) {
      this.autoSizeAll(params);
    }
  }

  _renderContextMenu() {
    return (
      <ContextMenu id="context-menu-datatable">
        {this.props.contextMenuItems.map((item, index) => {
          return (() => {
            if (item === alias.contextMenu.separator) {
              return <Item key={index} divider />;
            } else if (typeof item === 'object') {
              return (
                <Item
                  key={index}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick(this.gridApi, this.state.focusData);
                    }
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      {item.icon && <Icon name={item.icon} />}
                      {' ' + item.title}
                    </div>
                    {item.shortcut && (
                      <div className="col-md-6 text-right">{item.shortcut}</div>
                    )}
                  </div>
                </Item>
              );
            }
          })();
        })}
      </ContextMenu>
    );
  }

  _renderLoading(params) {
    if (params.value !== undefined) {
      return params.value;
    } else {
      return "<img src='" + imgLoading + "'/>";
    }
  }

  _renderDate(params) {
    if (params.value) {
      return formatter.dateFormatClient(params.value);
    } else {
      return params.value;
    }
  }

  _renderCurrency(params) {
    if (params.value) {
      return formatter.currency(params.value);
    } else {
      return params.value;
    }
  }

  _renderNoRowsTemplate() {
    return '<h4>Tidak ada data</h4>';
  }

  _renderLoadingTemplate() {
    return '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  _onCellContextMenu(params) {
    if (params.data) {
      this.setState({ focusData: params.data });
    }
  }

  _findNodeByRowIndex(rowIndex) {
    let currentNode = this.gridApi.getModel().getRow(rowIndex);

    return currentNode;
  }

  _navigateToNextCell(params) {
    let previousCell = params.previousCellPosition;
    let suggestedCell = params.nextCellPosition;
    let rowIndex = previousCell.rowIndex;
    if (rowIndex === 0) {
      rowIndex = params.key === alias.keyBoard.keyUp ? 0 : 1;
    } else {
      rowIndex = suggestedCell ? suggestedCell.rowIndex : rowIndex;
    }

    let suggestedCellNode = this._findNodeByRowIndex(rowIndex);

    if (suggestedCellNode) {
      rowIndex = suggestedCellNode.isSelected()
        ? previousCell.rowIndex
        : rowIndex;
      let currentNode = this._findNodeByRowIndex(rowIndex);
      if (currentNode) {
        if (currentNode.data) {
          switch (params.key) {
            case alias.keyBoard.keyUp:
              if (this.state.navigation.shift) {
                if (currentNode.isSelected()) {
                  if (rowIndex === 0) {
                    currentNode.setSelected(true);
                  } else {
                    currentNode.setSelected(false);
                  }
                } else {
                  currentNode.setSelected(true);
                }
              } else {
                currentNode.setSelected(true, true);
              }
              return suggestedCell;
            case alias.keyBoard.keyDown:
              if (this.state.navigation.shift) {
                if (currentNode.isSelected()) {
                  if (rowIndex === this.gridApi.getInfiniteRowCount() - 1) {
                    currentNode.setSelected(true);
                  } else {
                    currentNode.setSelected(false);
                  }
                } else {
                  currentNode.setSelected(true);
                }
              } else {
                currentNode.setSelected(true, true);
              }
              return suggestedCell;
            case alias.keyBoard.keyLeft:
            case alias.keyBoard.keyRight:
              return suggestedCell;
            default:
              return {};
            // throw "this will never happen, navigation is always on of the 4 keys above";
          }
        }
      }
    }
  }

  _onKeyUp(e) {
    if (e.keyCode === alias.keyBoard.shift) {
      this.setState((prevState) => {
        return {
          navigation: {
            ...prevState.navigation,
            shift: false,
          },
        };
      });
    }
  }

  _onKeyDown(e) {
    if (e.keyCode === alias.keyBoard.shift) {
      this.setState((prevState) => {
        return {
          navigation: {
            ...prevState.navigation,
            shift: true,
          },
        };
      });
    }

    if (e.keyCode === alias.keyBoard.enter) {
      if (this.props.onRowEntered) {
        this.props.onRowEntered();
      }
    }
  }

  _onSuppressKeyboardEvent(params) {
    let {
      keyDown,
      keyUp,
      keyRight,
      keyLeft,
      escape,
      enter,
      space,
    } = alias.keyBoard;
    let keysToSuppress = [
      keyDown,
      keyUp,
      keyRight,
      keyLeft,
      escape,
      enter,
      space,
    ];

    let event = params.event;
    let key = event.which;

    return keysToSuppress.indexOf(key) >= 0 ? false : true;
  }

  componentDidMount() {}
}

DataTableServerSide.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  theme: PropTypes.string,
  contextMenuItems: PropTypes.array,
  shortcut: PropTypes.func,
  navigateToSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  data: PropTypes.array,
  containerHeight: PropTypes.string,
  messageDisabled: PropTypes.string,
  containerWidth: PropTypes.string,
  rowSelection: PropTypes.string,
  onRowEntered: PropTypes.func,
  sizeColumnsToFit: PropTypes.bool,
  autoSizeColumn: PropTypes.bool,
  onModelUpdated: PropTypes.func,
  rowHeight: PropTypes.number,
};

DataTableServerSide.defaultProps = {
  rowModelType: alias.rowModelType.infinite,
  rowSelection: alias.selectionSingle,
  theme: alias.theme.balham,
  containerHeight: '326px',
  containerWidth: '100%',
  enableSorting: false,
  copyInColumn: '',
  navigateToSelect: true,
  rowDeselection: false,
  disabled: false,
  messageDisabled: '',
  cacheBlockSize: 10,
  rowHeight: 30,
  sizeColumnsToFit: true,
  autoSizeColumn: true,
  contextMenuItems: [],
};

export default DataTableServerSide;
