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

const ReactTable = React.forwardRef(
  (
    {
      columns,
      data,
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
        data,
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

                  let headerCellProps = column.getHeaderProps(
                    column.sort === false || !useSorting
                      ? ''
                      : column.getSortByToggleProps()
                  );

                  if (column.rowSpan) {
                    const nextRowColumn = getLastColumn(
                      column.columns,
                      column.rowSpan
                    );
                    const nextHeaderProps = nextRowColumn.getHeaderProps(
                      column.sort === false || !useSorting
                        ? ''
                        : nextRowColumn.getSortByToggleProps()
                    );
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
                  {...row.getRowProps()}
                  className={cellRowClassName}
                  style={cellRowStyle}
                >
                  {row.cells.map((cell) => {
                    if (undefined !== cell.column.colSpan) {
                      let cellProps = {
                        ...cell.getCellProps(),
                        colSpan: cell.column.colSpan,
                      };
                      return (
                        <Table.Cell
                          {...cellProps}
                          className={cell.column.customCellClassName}
                          style={cell.column.customCellStyle}
                        >
                          {cell.column.customCell(cell.row.original)}
                        </Table.Cell>
                      );
                    }
                  })}
                </Table.Row>
              );
            } else {
              return (
                <Table.Row
                  {...row.getRowProps()}
                  className={cellRowClassName}
                  style={cellRowStyle}
                  onClick={() => (null !== onRowClick ? onRowClick() : {})}
                >
                  {row.cells.map((cell) => {
                    let value =
                      cell.column.id === 'iteration'
                        ? nomor++
                        : cell.render('Cell');
                    return (
                      <Table.Cell
                        {...cell.getCellProps()}
                        className={className(
                          cell.column.className,
                          cell.column.cellClasName
                        )}
                        style={{
                          ...cell.column.style,
                          ...cell.column.cellStyle,
                        }}
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

export default ReactTable;
