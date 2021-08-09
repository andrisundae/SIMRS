import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Icon, Segment } from 'semantic-ui-react';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
  SelectedButton,
  CancelButton,
} from '@simrs/components';
import { useKunjunganAktifRawatInap } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';

const CariKunjungan = ({ innerRef, onRowSelected, show, onHide, idPasien }) => {
  const t = useModuleTrans();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const {
    data: kunjunganAktifRawatInap,
    isLoading,
    status,
  } = useKunjunganAktifRawatInap(idPasien);

  // , {
  //   onSuccess: (data) => {
  //     if (gridApi && idPasien) {
  //       if (data) {
  //         const dataSource = {
  //           rowCount: null,
  //           getRows: (params) => {
  //             params.successCallback(data, data.length);
  //           },
  //         };
  //         gridApi.setDatasource(dataSource);
  //       } else {
  //         gridApi.setDatasource(emptySource);
  //       }
  //     }
  //   },
  // }

  const columns = [
    {
      headerName: t('tanggal_masuk'),
      field: 'tgl_mulai',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('tanggal_selesai'),
      field: 'tgl_selesai',
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('norm'),
      field: 'norm',
    },
    {
      headerName: t('no_billing'),
      field: 'kode_kunjungan_unit',
    },
    {
      headerName: t('nama_pasien'),
      field: 'nama_pasien',
    },
    {
      headerName: t('unit_layanan'),
      field: 'nama_unit_layanan',
    },
  ];

  const dataSource = useMemo(() => {
    if (!kunjunganAktifRawatInap || status === 'error' || status === 'loading') {
      return emptySource;
    }

    return {
      rowCount: null,
      getRows: (params) => {
        params.successCallback(kunjunganAktifRawatInap, kunjunganAktifRawatInap.length);
      },
    };
  }, [emptySource, kunjunganAktifRawatInap, status]);

  React.useEffect(() => {
    if (gridApi && idPasien && kunjunganAktifRawatInap && status === 'success') {
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, dataSource, idPasien, kunjunganAktifRawatInap]);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name="search" />
        {t('kunjungan_pasien')}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <Segment loading={isLoading}>
                <DatatableServerSide
                  dataSource={emptySource}
                  ref={innerRef}
                  columns={columns}
                  name={staticConst.TABLE_KUNJUNGAN_AKTIF_RAWAT_INAP}
                  navigateToSelect={true}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={100}
                  containerHeight="200px"
                  getRowNodeId={getRowNodeId}
                  sizeColumnsToFit={true}
                  // onRowDoubleClicked={this.onRowDoubleClickHandler}
                  // onRowEntered={this.onRowEnteredHandler}
                  onGridReady={onGridReady}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <SelectedButton />
        <CancelButton onClick={onHide} />
      </Modal.Actions>
    </Modal>
  );
};

CariKunjungan.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <CariKunjungan innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
