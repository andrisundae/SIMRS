import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

// const aktifGetter = (params) => {
//   if (!params.data) {
//     return '';
//   }
//   return params.data.aktif ? 'Ya' : 'Tidak';
// };

const Main = (props) => {
  const columns = useMemo(() => {
    return [
      {
        headerName: props.t(`${props.resource}:header.column.nama`),
        field: 'nama',
        width: 300,
      },
      {
        headerName: props.t(`${props.resource}:header.column.nama_cetakan`),
        field: 'nama_cetakan',
        width: 300,
      },
      {
        headerName: props.t(`${props.resource}:header.column.tarif`),
        field: 'tarif',
        width: 100,
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
        headerClass: 'ag-right-aligned-header',
      },
      {
        headerName: props.t(`${props.resource}:header.column.detail_komponen`),
        field: 'detail_komponen',
      },
      {
        headerName: props.t(`${props.resource}:header.column.status`),
        field: 'aktif',
        width: 60,
        cellRenderer: 'activeRenderer',
      },
    ];
  }, []);
  return (
    <Module
      {...props}
      filter={<Filter {...props} />}
      list={<List columnDefs={columns} {...props} />}
      create={<Create {...props} />}
    />
  );
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
