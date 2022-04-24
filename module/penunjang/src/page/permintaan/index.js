import React, {
  useEffect,
  useState,
  useCallback,
  // useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button, Segment } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import {
  useModuleTrans,
  // useDatatable,
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
import ListPermintaan from '../components/ListPermintaan';
import { staticConst } from '../../static';
import { selectedSelector, disabledActionsSelector } from './redux/selectors';
import {
  openForm as onOpenForm,
  add as onAdd,
  edit as onEdit,
  reset as onReset,
} from './redux/slice';
import Create from './Create';

const PermintaanPenunjang = ({ show }) => {
  const history = useHistory();
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const t = useModuleTrans();

  const reloadHandler = useCallback(() => {
    queryClient.invalidateQueries([
      '/billing/transaksi/penunjang/view',
      params,
    ]);
  }, [params, queryClient]);

  const clickBackHandler = useCallback(() => history.goBack(), [history]);
  const clickAddHandler = useCallback(() => {
    dispatch(onAdd());
    setShowAddModal(true);
  }, []);
  const clickEditHandler = useCallback(() => {
    dispatch(onEdit());
    setShowEditModal(true);
  }, []);

  useEffect(() => {
    dispatch(onOpenForm(resource));
    return () => {
      dispatch(onReset({ resource }));
    };
  }, [dispatch, resource]);

  const { data, isLoading } = useListPenunjang(params, {
    enabled: !!params?.id,
  });

  const deleteMutation = useDeletePermintaanPenunjang();

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

  const statusChangeHandler = useCallback(
    (value) =>
      setParams((prevState) => ({ ...prevState, st_status_penunjang: value })),
    []
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
              toastr.success('Permintaan berhasil dihapus.');
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

  const hideAddModalHandler = useCallback(() => setShowAddModal(false), []);
  const hideEditModalHandler = useCallback(() => setShowEditModal(false), []);

  return (
    <Modal
      // dimmer="inverted"
      open={show}
      onClose={clickBackHandler}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      // size="small"
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
          {/* <DatatableServerSide
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
            onGridReady={onGridReady}
            rowModelType={constDatatable.rowModelType.clientSide}
          /> */}
          <ListPermintaan
            data={data || []}
            loading={isLoading}
            onReload={reloadHandler}
          />
          <div className="flex w-full items-center justify-center mt-3">
            <div className="h-32 w-102 shadow-md bg-gray-100 border border-gray-400 px-3 py-2 rounded">
              <p className="text-gray-700">{selected?.details}</p>
            </div>
          </div>
        </Segment>
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          {checkAction.isCanAdd && <AddButton onClick={clickAddHandler} />}
          {checkAction.isCanEdit && <EditButton onClick={clickEditHandler} />}
          {checkAction.isCanDelete && <DeleteButton onClick={deleteHandler} />}
        </div>
        <div className="flex space-x-2">
          <SelectedButton />
          <CancelButton onClick={clickBackHandler} />
        </div>
      </Modal.Actions>
      {showAddModal && (
        <Create isAdd onClose={hideAddModalHandler} show={showAddModal} />
      )}
      {showEditModal && (
        <Create
          onClose={hideEditModalHandler}
          show={showEditModal}
          data={selected}
          onReload={reloadHandler}
        />
      )}
    </Modal>
  );
};

PermintaanPenunjang.propTypes = {
  match: PropTypes.object,
  resource: PropTypes.string,
  show: PropTypes.bool,
};

export default PermintaanPenunjang;
