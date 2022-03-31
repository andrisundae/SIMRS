import React, {useCallback} from 'react';
import { Grid, Modal, Icon, Divider } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import {
  useModuleTrans,
  SaveButton,
  AddButton,
  EditButton,
  DeleteButton,
  CancelButton,
  useAppState,
  constDatatable,
  confirmation,
} from '@simrs/components';
import {
  disabledElement,
  selectedRowSelector,
  postSelector,
  dataSelector,
  selectedOptionSelector,
  focusElementSelector,
  loaderPelaksanaSelector,
  statusFormSelector,
  datatableSelector,
} from '../redux/pelaksanaTambahan/selector';
import {
  postSelector as tindakanPostSelector,
  postItemSelector as tindakanDetailPostSelector,
} from '../redux/selector';
import * as actions from '../redux/pelaksanaTambahan/actions';
import * as actionTypes from '../redux/pelaksanaTambahan/actionTypes';
import PelaksanaTambahanTable from '../components/PelaksanaTambahanTable';
import FormPelaksanaTambahan from '../components/FormPelaksanaTambahan';
import { staticConst } from '../static';

const PelaksanaTambahan = ({ show, onHide }) => {
  const trans = useModuleTrans();
  const { t } = useTranslation();
  const { resource } = useAppState();
  const dispatch = useDispatch();
  const tableRef = React.useRef();

  const selectedRow = useSelector(selectedRowSelector);
  const post = useSelector(postSelector);
  const dataForm = useSelector(dataSelector);
  const disabledTable = useSelector((state) =>
    disabledElement(state, staticConst.TABLE_PELAKSANA_TAMBAHAN)
  );
  const selectedOption = useSelector(selectedOptionSelector);
  const disabledAdd = useSelector((state) => disabledElement(state, 'add'));
  const disabledEdit = useSelector((state) => disabledElement(state, 'edit'));
  const disabledDelete = useSelector((state) =>
    disabledElement(state, 'delete')
  );
  const disabledSave = useSelector((state) => disabledElement(state, 'save'));
  const disabledCancel = useSelector((state) =>
    disabledElement(state, 'cancel')
  );
  const disabledForm = useSelector((state) =>
    disabledElement(state, 'form_pelaksana_tambahan')
  );
  const focusElement = useSelector(focusElementSelector);
  const postTindakan = useSelector(tindakanPostSelector);
  const loaderPelaksana = useSelector(loaderPelaksanaSelector);
  const tindakanDetail = useSelector(tindakanDetailPostSelector);
  const statusForm = useSelector(statusFormSelector);
  const datatable = useSelector(datatableSelector);

  const selectedHandler = (data) =>
    dispatch(actions.onSelected(resource, data));

  const getDataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const payload = {
          length: 10,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          idKunjunganUnitDetail: tindakanDetail.id,
        };
        dispatch(
          actions.getAllPelaksanaTambahan.request(resource, payload, params)
        );
      },
    };
  };

  const addHandler = useCallback(() => {
    dispatch(actions.onAdd(resource));
  });
  const editHandler = useCallback(() => {
    dispatch(
      actions.onEdit(resource, {
        ...post,
        id_unit_layanan: postTindakan.id_unit_layanan,
      })
    );
  });
  const deleteHandler = useCallback(() => {
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () =>
        dispatch(
          actions.deletePelaksanaTambahan.request(resource, { id: post.id })
        ),
    });
  });
  const saveHandler = useCallback(() => {
    const payload = {
      id_kunjungan_unit_detail: tindakanDetail.id,
      id_pelaksana: post.id_pelaksana,
      st_utama: post.st_utama || 0,
      id_spesialisasi: post.id_spesialisasi,
    };
    if (post.id) {
      payload.id = post.id;
    }
    dispatch(actions.save.request(resource, payload));
  });
  const cancelHandler = useCallback(() => {
    dispatch(actions.onCancel(resource));
  });

  const isCanAdd = React.useMemo(() => {
    return !disabledAdd;
  }, [disabledAdd]);
  const isCanEdit = React.useMemo(() => {
    return !disabledEdit && selectedRow;
  }, [selectedRow, disabledEdit]);
  const isCanDelete = React.useMemo(() => {
    return !disabledDelete && selectedRow;
  }, [selectedRow, disabledDelete]);
  const isCanSave = React.useMemo(() => {
    return !disabledSave;
  }, [disabledSave]);
  const isCanCancel = React.useMemo(() => {
    return !disabledCancel;
  }, [disabledCancel]);

  const gridApi = useCallback(() => {
    return tableRef.current.gridApi;
  }, []);

  const selectRow = (id) => {
    if (tableRef.current) {
      tableRef.current.selectRow(id);
    }
  };

  const reload = useCallback((reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
      gridApi().purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      gridApi().refreshInfiniteCache();
    }
  }, [gridApi]);

  React.useEffect(() => {
    if (show) {
      dispatch(actions.openForm(resource));
    }
  }, [dispatch, resource, show]);

  React.useEffect(() => {
    if (datatable.isReload) {
      reload(datatable.reloadType);
    }
  }, [datatable, reload]);

  React.useEffect(() => {
    const tableApi = gridApi();
    switch (statusForm) {
      case actionTypes.ADD_PELAKSANA_TAMBAHAN:
        if (disabledTable && tableApi) {
          tableApi.deselectAll();
        }
        break;
      case actionTypes.READY_PELAKSANA_TAMBAHAN:
        if (selectedRow) {
          selectRow(selectedRow);
        } else {
          if (tableApi) {
            tableApi.deselectAll();
            tableApi.clearFocusedCell();
          }
        }
        break;
      default:
        return;
    }
  }, [statusForm, gridApi, disabledTable, selectedRow]);

  const changeSelectHanlder = (name, selected) =>
    dispatch(
      actions.onChangeSelect2(resource, name, {
        ...selected,
        id_unit_layanan: postTindakan.id_unit_layanan,
      })
    );

  const focusElementHandler = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      dispatch(actions.onFocusElement(resource, nameRef));
    }
  };

  React.useEffect(() => {
    if (show) {
      MouseTrap.bindGlobal('alt+t', function (e) {
        e.preventDefault();
        if (isCanAdd) {
          addHandler();
        }
      });

      MouseTrap.bindGlobal('alt+k', function (e) {
        e.preventDefault();
        if (isCanEdit) {
          editHandler();
        }
      });

      MouseTrap.bindGlobal('alt+h', function (e) {
        e.preventDefault();
        if (isCanDelete) {
          deleteHandler();
        }
      });

      MouseTrap.bindGlobal('alt+s', function (e) {
        e.preventDefault();
        if (isCanSave) {
          saveHandler();
        }
      });

      MouseTrap.bindGlobal(['alt+b', 'esc'], function (e) {
        e.preventDefault();
        if (isCanCancel) {
          cancelHandler();
        }
      });

      MouseTrap.bindGlobal('f2', function (e) {
        e.preventDefault();
        tableRef.current.setFirstRowSelected();
      });

      MouseTrap.bindGlobal('alt+r', function (e) {
        e.preventDefault();
        reload(constDatatable.reloadType.purge);
      });
    }
    return () => {
      MouseTrap.unbind('alt+t');
      MouseTrap.unbind('alt+k');
      MouseTrap.unbind('alt+h');
      MouseTrap.unbind('alt+s');
      MouseTrap.unbind('alt+b');
      MouseTrap.unbind('f2');
      MouseTrap.unbind('alt+r');
    };
  }, [show, isCanAdd, isCanEdit, isCanDelete, isCanSave, isCanCancel, addHandler, editHandler, deleteHandler, saveHandler, cancelHandler, reload]);

  return (
    <Modal
      closeIcon={<Icon name="close" color="black" />}
      dimmer="inverted"
      open={show}
      onClose={onHide}
      size="tiny"
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name="user" />
        {trans('pelaksana_tambahan')}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <PelaksanaTambahanTable
                ref={tableRef}
                disabled={disabledTable}
                dataSource={getDataSource}
                onRowSelected={selectedHandler}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <FormPelaksanaTambahan
                disabled={disabledForm}
                data={dataForm}
                selectedOption={selectedOption}
                onChangeSelect={changeSelectHanlder}
                onFocusElement={focusElementHandler}
                focusElement={focusElement}
                loaderPelaksana={loaderPelaksana}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions style={{ textAlign: 'left' }}>
        {isCanAdd && <AddButton onClick={addHandler} />}
        {isCanEdit && <EditButton onClick={editHandler} />}
        {isCanDelete && <DeleteButton onClick={deleteHandler} />}
        {isCanSave && <SaveButton onClick={saveHandler} />}
        {isCanCancel && <CancelButton onClick={cancelHandler} />}
      </Modal.Actions>
    </Modal>
  );
};

PelaksanaTambahan.propTypes = {
  disabled: PropTypes.bool,
  dataSource: PropTypes.func,
  onRowSelected: PropTypes.func,
};

export default PelaksanaTambahan;
