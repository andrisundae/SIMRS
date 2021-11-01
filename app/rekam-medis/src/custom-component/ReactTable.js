import React, { useImperativeHandle } from 'react';
import className from 'classname';
import { Table, Icon } from 'semantic-ui-react';
import {
  useTable,
  useExpanded,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import _ from 'lodash';

const defaultPropGetter = () => ({});

const ReactTable = React.forwardRef(
  (
    {
      columns,
      data,
      getHeaderProps = defaultPropGetter,
      getColumnProps = defaultPropGetter,
      getRowProps = defaultPropGetter,
      getCellProps = defaultPropGetter,
      filterData = [],
      filterDataKey = 'key',
      filterState = false,
      reverseFilter = false,
      noResultFilter = false,
      celled = false,
      striped = false,
      selectable = false,
      sortable = false,
      compact = false,
      isLoading = false,
      renderLoader = null,
      renderNoData = null,
      useSorting = false,
      useCustomExpanded = false,
      tableClassName = '',
      tableStyle = {},
      onRowClick = null,
      headerClassName = '',
      headerStyle = {},
      bodyClassName = '',
      bodyStyle = {},
      headerRowClassName = '',
      headerRowStyle = {},
      cellRowClassName = '',
      cellRowStyle = {},
      defaultSorted = [],
      hideColumns = [],
      defaultExpanded = [],
    },
    ref
  ) => {
    const instance = useTable(
      {
        columns,
        data: noResultFilter && filterState ? filterData : data,
        disableSortRemove: true,
        initialState: {
          sortBy: defaultSorted,
          hiddenColumns: hideColumns,
          expanded: defaultExpanded,
        },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      useExpanded
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = instance;

    const semanticTableProps = {
      celled,
      striped,
      selectable,
      sortable,
      compact,
    };

    useImperativeHandle(ref, () => instance);

    function getLastColumn(columns, depth) {
      if (2 < depth) {
        return getLastColumn(columns[0].columns, depth - 1);
      } else {
        return columns[0];
      }
    }

    let nomor = 1;

    return (
      <Table
        {...getTableProps()}
        {...semanticTableProps}
        className={tableClassName}
        style={tableStyle}
      >
        <Table.Header className={headerClassName} style={headerStyle}>
          {headerGroups.map((headerGroup) => {
            return (
              <Table.Row
                {...headerGroup.getHeaderGroupProps()}
                className={headerRowClassName}
                style={headerRowStyle}
              >
                {headerGroup.headers.map((column) => {
                  if (-1 < ('' + column.render('Header')).indexOf('_hidden')) {
                    return null;
                  }

                  let headerCellProps = column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                    column.sort === false || !useSorting
                      ? ''
                      : column.getSortByToggleProps(),
                  ]);

                  if (column.rowSpan) {
                    const nextRowColumn = getLastColumn(
                      column.columns,
                      column.rowSpan
                    );
                    const nextHeaderProps = nextRowColumn.getHeaderProps([
                      {
                        className: column.className,
                        style: column.style,
                      },
                      getColumnProps(column),
                      getHeaderProps(column),
                      column.sort === false || !useSorting
                        ? ''
                        : nextRowColumn.getSortByToggleProps(),
                    ]);
                    headerCellProps = {
                      ...headerCellProps,
                      ...nextHeaderProps,
                      rowSpan: column.rowSpan,
                    };
                    column = { ...nextRowColumn, render: column.render };
                  }

                  return (
                    <Table.HeaderCell
                      {...headerCellProps}
                      className={className(
                        column.className,
                        column.headerClassName,
                        {
                          'pointer-events-none cursor-default':
                            column.sort === false,
                          sorted: column.isSorted,
                          // 'ascending' : column.isSorted && !column.isSortedDesc,
                          // 'descending' : column.isSorted && column.isSortedDesc
                        }
                      )}
                      style={{
                        ...column.style,
                        ...column.headerStyle,
                      }}
                    >
                      {column.render('Header')}
                      {column.isSorted && (
                        <Icon
                          className="p-0 m-0 ml-0.5"
                          name={column.isSortedDesc ? 'caret down' : 'caret up'}
                        />
                      )}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Header>
        <Table.Body
          {...getTableBodyProps()}
          className={bodyClassName}
          style={bodyStyle}
        >
          {isLoading && null !== renderLoader && renderLoader()}
          {!isLoading &&
            rows.length === 0 &&
            null !== renderNoData &&
            renderNoData()}
          {rows.map((row, i) => {
            prepareRow(row);

            if (useCustomExpanded && row.depth === 0) {
              return (
                <Table.Row
                  {...row.getRowProps([
                    {
                      className: cellRowClassName,
                      style: cellRowStyle,
                    },
                    getRowProps(row),
                  ])}
                >
                  {row.cells.map((cell) => {
                    const originalDataRow = cell.row.original;
                    if (filterData?.length > 0) {
                      const checkIndex = filterData
                        .map((e) => {
                          return e[filterDataKey];
                        })
                        .indexOf(originalDataRow[filterDataKey]);
                      if (reverseFilter) {
                        if (checkIndex > -1) {
                          return null;
                        }
                      } else {
                        if (checkIndex === -1) {
                          return null;
                        }
                      }
                    }
                    if (undefined !== cell.column.colSpan) {
                      return (
                        <Table.Cell
                          {...cell.getCellProps([
                            {
                              className: className(
                                cell.column.className,
                                cell.column.customCellClassName
                              ),
                              style: {
                                ...cell.column.style,
                                ...cell.column.customCellStyle,
                              },
                              colSpan: cell.column.colSpan,
                            },
                            getColumnProps(cell.column),
                            getCellProps(cell),
                          ])}
                        >
                          {cell.column.customCell(cell.row.original)}
                        </Table.Cell>
                      );
                    }

                    return null;
                  })}
                </Table.Row>
              );
            } else {
              return (
                <Table.Row
                  {...row.getRowProps([
                    {
                      className: cellRowClassName,
                      style: cellRowStyle,
                    },
                    getRowProps(row),
                  ])}
                  onClick={() => (null !== onRowClick ? onRowClick(row) : {})}
                >
                  {row.cells.map((cell) => {
                    const originalDataRow = cell.row.original;
                    if (filterData?.length > 0) {
                      const checkIndex = filterData
                        .map((e) => {
                          return e[filterDataKey];
                        })
                        .indexOf(originalDataRow[filterDataKey]);
                      if (reverseFilter) {
                        if (checkIndex > -1) {
                          return null;
                        }
                      } else {
                        if (checkIndex === -1) {
                          return null;
                        }
                      }
                    }
                    let value =
                      cell.column.id === 'iteration'
                        ? nomor++
                        : cell.render('Cell');
                    return (
                      <Table.Cell
                        {...cell.getCellProps([
                          {
                            className: className(
                              cell.column.className,
                              cell.column.cellClassName
                            ),
                            style: {
                              ...cell.column.style,
                              ...cell.column.cellStyle,
                            },
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        ])}
                      >
                        {value}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    );
  }
);

const RTCustomFilter = (filterValue = '', data = [], key = 'key') => {
  let tempData = [],
    value = _.lowerCase(filterValue).trim();

  if ('' === value) {
    tempData = data;
  } else {
    data.map((v, i) => {
      if (key.constructor === Array) {
        let tempIndex = [];
        key.map((vk) => {
          if (-1 !== _.lowerCase(v[vk]).indexOf(value)) {
            tempIndex.push(1);
          }
          return null;
        });
        if (_.indexOf(tempIndex, 1) > -1) {
          tempData.push({
            ...v,
            indexFilter: i,
          });
        }
      } else {
        if (-1 !== _.lowerCase(v[key]).indexOf(value)) {
          tempData.push({
            ...v,
            indexFilter: i,
          });
        }
      }
      return null;
    });
  }

  return tempData;
};

export { ReactTable as default, RTCustomFilter };
