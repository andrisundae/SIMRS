import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, constDatatable } from '@simrs/components';

class PenjaminPasienTable extends Component {
  constructor(props) {
    super(props);

    this.clickRowHandler = this.clickRowHandler.bind(this);
  }

  columns = [
    {
      headerName: 'No. Anggota',
      field: 'nomor_anggota',
      cellRenderer: 'loadingRenderer',
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
    },
    {
      headerName: 'Penjamin',
      field: 'nama_penjamin',
    },
    {
      headerName: 'Kelas',
      field: 'nama_kelas',
    },
    {
      headerName: 'Status Kepesertaan',
      field: 'status_kepesertaan',
    },
    {
      headerName: 'Aktif',
      field: 'string_aktif',
    },
  ];

  componentDidMount() {
    const refDatatable = this.getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate() {
    const { isReload, reloadType } = this.props;
    if (isReload) {
      this.reload(reloadType);
    }
  }

  getRefDatatable() {
    return this.props.innerRef.current.refs[this.props.name];
  }

  reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.setInfiniteRowCount(1);
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  }

  clickRowHandler() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.props.onRowSelected(selectedRows[0]);
    }
  }

  render() {
    const { dataSource, innerRef, name } = this.props;

    return (
      <DatatableServerSide
        ref={innerRef}
        columns={this.columns}
        name={name}
        navigateToSelect={true}
        // enableServerSideSorting={true}
        datasource={dataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={25}
        containerHeight="230.5px"
        sizeColumnsToFit={true}
        onRowSelected={this.clickRowHandler}
      />
    );
  }
}

PenjaminPasienTable.propTypes = {
  name: PropTypes.string.isRequired,
  dataSource: PropTypes.func.isRequired,
  onRowSelected: PropTypes.func,
  isReload: PropTypes.bool,
  reloadType: PropTypes.string,
  innerRef: PropTypes.object,
};

export default React.forwardRef((props, ref) => (
  <PenjaminPasienTable innerRef={ref} {...props} />
));
