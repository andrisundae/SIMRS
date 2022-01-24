import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TextArea, Modal, Icon, Button, Form } from 'semantic-ui-react';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
  SelectedButton,
  CancelButton,
  AddButton,
  EditButton,
  DeleteButton,
} from '@simrs/components';
// import { useKunjunganAktifRawatInap } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';
import CreatePermintaanPenunjang from '../CreatePermintaanPenunjang';

const PermintaanPenunjang = ({
  innerRef,
  onRowSelected,
  show,
  onHide,
  idPasien,
}) => {
  const [showForm, setShowForm] = useState(false);
  const t = useModuleTrans();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  // const {
  //   data: kunjunganAktifRawatInap,
  //   isLoading,
  //   status,
  // } = useKunjunganAktifRawatInap(idPasien);

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
      headerName: t('tanggal_permintaan'),
      field: 'tgl_kunjungan',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('unit_layanan'),
      field: 'nama_unit_layanan',
    },
    {
      headerName: t('nama_pasien'),
      field: 'nama_pasien',
    },
    {
      headerName: t('total_permintaan'),
      field: 'biaya',
    },
    {
      headerName: t('status'),
      field: 'status',
    },
    {
      headerName: t('dokter_perujuk'),
      field: 'dpjp_asal',
    },
    {
      headerName: t('unit_layanan_perujuk'),
      field: 'nama_unit_layanan_perujuk',
    },
    {
      headerName: t('dokter_tujuan'),
      field: 'dpjp_tujuan',
    },
  ];

  const dataSource = useMemo(() => {
    return emptySource;
    // if (!kunjunganAktifRawatInap || status === 'error' || status === 'loading') {
    //   return emptySource;
    // }

    // return {
    //   rowCount: null,
    //   getRows: (params) => {
    //     params.successCallback(kunjunganAktifRawatInap, kunjunganAktifRawatInap.length);
    //   },
    // };
  }, [emptySource]);

  // React.useEffect(() => {
  //   if (gridApi && idPasien && kunjunganAktifRawatInap && status === 'success') {
  //     gridApi.setDatasource(dataSource);
  //   }
  // }, [gridApi, dataSource, idPasien, kunjunganAktifRawatInap]);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="fullscreen"
    >
      <Modal.Header className="p-3">
        <Icon name="phone volume" />
        {t('daftar_permintaan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 p-3 shadow-lg">
        <div className="flex mb-3 items-center">
          <Button.Group compact size="small" className="flex-wrap">
            <Button onClick={() => {}}><Icon name="tasks" />Semua</Button>
            <Button onClick={() => {}}><Icon name="bullhorn" /> Permintaan</Button>
            <Button onClick={() => {}}>
              <Icon name="check" /> Dipenuhi
            </Button>
            <Button onClick={() => {}}>
              <Icon name="stop" /> Ditolak
            </Button>
          </Button.Group>
        </div>
        <DatatableServerSide
          dataSource={emptySource}
          ref={innerRef}
          columns={columns}
          name={staticConst.TABLE_PERMINTAAN_PENUNJANG}
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
        <div className="flex w-full items-center justify-center mt-3">
          <Form>
            <TextArea style={{width: 400}} rows={4} placeholder="Catatan" />
          </Form>
        </div>
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <AddButton onClick={() => setShowForm(true)} />
          <EditButton />
          <DeleteButton />
        </div>
        <div className="flex space-x-2">
          <SelectedButton />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
      <CreatePermintaanPenunjang show={showForm} onHide={() => setShowForm(false)} />
    </Modal>
  );
};

PermintaanPenunjang.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <PermintaanPenunjang innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
