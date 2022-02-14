import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
  SelectedButton,
  CancelButton,
  AddButton,
  EditButton,
  DeleteButton,
  useModuleState,
  confirmation,
} from '@simrs/components';
import { toastr } from '@simrs/common';
import {
  useListPenunjang,
  useDeletePermintaanPenunjang,
} from '@simrs/billing/src/fetcher/penunjang';
import { staticConst } from '../../static';
import {
  selectedSelector,
  disabledActionsSelector,
} from '../../redux/selectors';
import { select as onSelect, openForm as onOpenForm } from '../../redux/slice';

const PermintaanPenunjang = ({ show, match }) => {
  const history = useHistory();
  const tableRef = useRef();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { resource } = useModuleState();
  const selected = useSelector(selectedSelector);
  const disableActions = useSelector(disabledActionsSelector);
  const [params, setParams] = useState({
    id: routeParams?.idKunjunganUnit,
    st_status_penunjang: '',
  });
  const t = useModuleTrans();
  const { getRowNodeId } = useDatatable();
  const [configuredTableReady, setConfiguredTableReady] = useState(false);

  const clickBackHandler = useCallback(() => history.goBack(), [history]);
  const clickAddHandler = useCallback(
    () => history.push(`${match?.url}/create`),
    [history, match.url]
  );

  useEffect(() => {
    dispatch(onOpenForm(resource));
  }, [dispatch, resource]);

  const { data, isLoading } = useListPenunjang(params, {
    enabled: !!params?.id,
    // onSuccess: successCallback,
  });

  const deleteMutation = useDeletePermintaanPenunjang();

  const [columns] = useState([
    {
      headerName: t('tanggal_permintaan'),
      field: 'tanggal',
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
      field: 'st_status_penunjang',
    },
    {
      headerName: t('dokter_perujuk'),
      field: 'nama_dokter_peminta_penunjang',
    },
    {
      headerName: t('unit_layanan_perujuk'),
      field: 'nama_unit_asal',
    },
    {
      headerName: t('dokter_tujuan'),
      field: 'nama_dokter_tujuan_penunjang',
    },
  ]);

  const checkAction = useMemo(() => {
    return {
      isCanEdit: !disableActions.edit,
      isCanFinish: !disableActions.finish,
      isCanAdd: !disableActions.add,
      isCanDelete: !disableActions.delete,
    };
  }, [
    disableActions.add,
    disableActions.delete,
    disableActions.edit,
    disableActions.finish,
  ]);

  // React.useEffect(() => {
  //   if (gridApi) {
  //     if (isFetched && Array.isArray(data)) {
  //       if (data.length === 0) {
  //         gridApi.showNoRowsOverlay();
  //       }
  //     }
  //   }
  // }, [gridApi, data, isFetched]);

  React.useEffect(() => {
    if (tableRef.current) {
      if (undefined === tableRef.current.gridApi && !configuredTableReady) {
        setConfiguredTableReady(true);
      } else {
        const gridApi = tableRef.current.gridApi;
        if (gridApi) {
          if (isLoading) {
            gridApi.showLoadingOverlay();
          } else {
            gridApi.hideOverlay();
            if (Array.isArray(data)) {
              gridApi.setDatasource({
                rowCount: null,
                getRows: (res) => {
                  res.successCallback(data, data.length);
                },
              });
            }
          }
        }
      }
    }
  }, [configuredTableReady, isLoading, data]);

  const statusChangeHandler = useCallback(
    (value) =>
      setParams((prevState) => ({ ...prevState, st_status_penunjang: value })),
    []
  );

  const rowSelectedHandler = useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(onSelect(params.data));
      }
    },
    [dispatch]
  );

  const deleteHandler = useCallback(() => {
    confirmation({
      title: t(`common:dialog.confirmation.title`, false),
      message: t(`common:dialog.confirmation.delete`, false),
      buttons: [
        t(`common:dialog.action.yes`, false),
        t(`common:dialog.action.no`, false),
      ],
      onOk: () => {
        deleteMutation.mutate(
          { id: selected?.id },
          {
            onSuccess: () => {
              toastr.success('Permintaan berhasil dilakukan.');
              queryClient.invalidateQueries([
                '/billing/transaksi/penunjang/view',
                params,
              ]);
            },
            onError: (error) => {
              toastr.warning(
                error && error.message
                  ? error.message
                  : 'Terjadi masalah server'
              );
            },
          }
        );
      },
    });
  }, [deleteMutation, params, queryClient, selected.id, t]);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={clickBackHandler}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="fullscreen"
    >
      <Modal.Header className="p-3">
        <Icon name="phone volume" />
        {t('daftar_permintaan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 p-3 shadow-lg">
        <Segment loading={isLoading || deleteMutation.isLoading}>
          <div className="flex mb-3 items-center">
            <Button.Group compact size="small" className="flex-wrap">
              <Button
                active={params.st_status_penunjang === ''}
                onClick={() => statusChangeHandler('')}
              >
                <Icon name="tasks" />
                Semua
              </Button>
              <Button
                active={params.st_status_penunjang === staticConst.PERMINTAAN}
                onClick={() => statusChangeHandler(staticConst.PERMINTAAN)}
              >
                <Icon name="bullhorn" /> Permintaan
              </Button>
              <Button
                active={params.st_status_penunjang === staticConst.DIPENUHI}
                onClick={() => statusChangeHandler(staticConst.DIPENUHI)}
              >
                <Icon name="check" /> Dipenuhi
              </Button>
              <Button
                active={params.st_status_penunjang === staticConst.DITOLAK}
                onClick={() => statusChangeHandler(staticConst.DITOLAK)}
              >
                <Icon name="stop" /> Ditolak
              </Button>
            </Button.Group>
          </div>
          <DatatableServerSide
            ref={tableRef}
            columns={columns}
            name={staticConst.TABLE_PERMINTAAN_PENUNJANG}
            navigateToSelect={true}
            rowBuffer={0}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={1}
            cacheBlockSize={100}
            containerHeight="300px"
            getRowNodeId={getRowNodeId}
            sizeColumnsToFit={false}
            onRowSelected={rowSelectedHandler}
            // onGridReady={onGridReady}
          />
          <div className="flex w-full items-center justify-center mt-3">
            {/* <Form>
              <TextArea
                disabled
                style={{ width: 400 }}
                rows={4}
                placeholder="Catatan"
                value={selected?.details}
              />
            </Form> */}
            <div className="h-32 w-102 shadow-md bg-gray-100 border border-gray-400 px-3 py-2 rounded">
              <p className="text-gray-700">{selected?.details}</p>
            </div>
          </div>
        </Segment>
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          {checkAction.isCanAdd && <AddButton onClick={clickAddHandler} />}
          {checkAction.isCanEdit && <EditButton />}
          {checkAction.isCanDelete && <DeleteButton onClick={deleteHandler} />}
        </div>
        <div className="flex space-x-2">
          <SelectedButton />
          <CancelButton onClick={clickBackHandler} />
        </div>
      </Modal.Actions>
    </Modal>
  );
};

PermintaanPenunjang.propTypes = {
  match: PropTypes.object,
  resource: PropTypes.string,
  show: PropTypes.bool,
};

export default PermintaanPenunjang;
