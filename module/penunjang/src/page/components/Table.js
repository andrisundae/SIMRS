import React, { useRef } from 'react';
import { useTable, useExpanded, useRowSelect } from 'react-table';
import classNames from 'classnames';
import { NoRowsOverlay } from '@simrs/components';

function TreeTable({ columns: userColumns, data, onSelectedRow }) {
  const tbodyRef = useRef(null);

  // const expandedRows = useMemo(() => {
  //   const ids = {};
  //   data.forEach((row) => {
  //     ids[row.id.toString()] = true;
  //   });
  //   return ids;
  // }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      // initialState: {
      //   expanded: expandedRows,
      //   selectedRowIds,
      // },
      columns: userColumns,
      data,
      autoResetExpanded: false,
      manualExpandedKey: 'expanded',
      manualRowSelectedKey: 'isSelected',
      autoResetSelectedRows: true,
    },
    // useFilters, // useFilters!
    // useGlobalFilter, // useGlobalFilter!
    useExpanded,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     // Let's make a column for selection
    //     {
    //       id: 'selection',
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  // Function to handle key press on a row
  const handleKeyDown = (event, row) => {
    event.stopPropagation();
    event.preventDefault();
    const currentRow = tbodyRef.current?.children.namedItem(row.id);
    switch (event.keyCode) {
      case 38:
        currentRow?.previousElementSibling?.focus();
        break;
      case 40:
        currentRow?.nextElementSibling?.focus();
        break;
      case 32:
        // row.toggleRowSelected();
        if (typeof onSelectedRow === 'function') {
          onSelectedRow(!row.original.isSelected, row);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="shadow relative w-full overflow-y-scroll border-b border-gray-200 sm:rounded-lg h-100 overflow-x-hidden">
      <table className="w-full" {...getTableProps()}>
        <thead className="bg-gray-100 w-full">
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    key={index}
                    // scope="row"
                    className={classNames(
                      'bg-gray-100 sticky top-0 z-50 w-1/4 px-6 py-3 font-semibold uppercase',
                      column.className
                    )}
                    align={column.textAlign || 'left'}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          ref={tbodyRef}
          className="bg-white divide-y divide-gray-200 w-full"
        >
          {rows.length <= 0 ? (
            <tr>
              <td className="h-300px" colSpan={userColumns.length}>
                <div className="flex items-center justify-center">
                  <NoRowsOverlay />
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={i}
                  positive={row.isSelected}
                  id={row.id}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, row)}
                  className={`focus:bg-gray-300 w-1/4 ${
                    row.original.isSelected ? 'bg-green-100' : ''
                  }`}
                >
                  {row.cells.map((cell, key) => {
                    return (
                      <td
                        // textAlign={cell.column?.textAlign || 'left'}
                        {...cell.getCellProps()}
                        key={key}
                        className="py-0 px-3 whitespace-nowrap"
                        align={cell.column?.textAlign || 'left'}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TreeTable;
