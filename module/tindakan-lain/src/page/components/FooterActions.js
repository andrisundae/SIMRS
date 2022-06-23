import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import {
  FooterActionsContainer,
  EditButton,
  SaveButton,
  CancelButton,
  AddButton,
  DeleteButton,
  PreviewButton,
  useAppAction,
  confirmation,
  useModuleTrans,
} from '@simrs/components';
import { useDeleteTindakanLain } from '@simrs/billing/src/fetcher/tindakanLain';
import { toastr } from '@simrs/common';
import {
  disabledActionsSelector,
  selectedSelector,
} from '../index/redux/selectors';
import {
  add as onAdd,
  edit as onEdit,
  cancel as onCancel,
  showLoader,
  hideLoader,
} from '../index/redux/slice';

function FooterActions({ onResetForm, formRef }) {
  const now = dayjs();
  const history = useHistory();
  const dispatch = useDispatch();
  const appActions = useAppAction();
  const t = useModuleTrans();

  const actionRefs = {
    add: useRef(),
    edit: useRef(),
    delete: useRef(),
    cancel: useRef(),
    save: useRef(),
  };

  const disableActions = useSelector(disabledActionsSelector);
  const selected = useSelector(selectedSelector);
  const isCanEdit = useMemo(() => {
    return !disableActions.edit;
  }, [disableActions.edit]);
  const isCanSave = useMemo(() => {
    return !disableActions.save;
  }, [disableActions.save]);
  const isCanCancel = useMemo(() => {
    return !disableActions.cancel;
  }, [disableActions.cancel]);
  const isCanAdd = useMemo(() => {
    return disableActions.save;
  }, [disableActions.save]);
  const isCanDelete = useMemo(() => {
    return !disableActions.delete;
  }, [disableActions.delete]);

  // Mutation query
  const deleteMutation = useDeleteTindakanLain();

  const resetFormHandler = useCallback(() => {
    if (typeof onResetForm === 'function') {
      onResetForm({
        tanggal: now.toDate(),
        kode: '',
        nama: '',
        alamat: '',
        desa: '',
        total_biaya: 0,
        bayar: 0,
        uang_diterima: 0,
        kembali: 0,
        keterangan: '',
      });
    }
  }, [onResetForm]);

  const addHandler = useCallback(() => {
    dispatch(onAdd());
    resetFormHandler();
    appActions.deactivateMainMenu();
  }, [appActions, dispatch, resetFormHandler]);

  const editHandler = useCallback(() => {
    dispatch(onEdit());
    appActions.deactivateMainMenu();
  }, [appActions, dispatch]);

  const cancelHandler = useCallback(() => {
    dispatch(onCancel());
    appActions.activateMainMenu();
  }, [appActions, dispatch]);

  const saveHandler = useCallback(() => {
    // dispatch(onCancel());
    // appActions.activateMainMenu();
    formRef?.current?.handleSubmit();
  }, [formRef]);

  const deleteHandler = useCallback(() => {
    confirmation({
      title: t(`common:dialog.confirmation.title`, false),
      message: t(`common:dialog.confirmation.delete`, false),
      buttons: [
        t(`common:dialog.action.yes`, false),
        t(`common:dialog.action.no`, false),
      ],
      onOk: () => {
        dispatch(showLoader());
        deleteMutation.mutate(
          { id: selected?.id },
          {
            onSuccess: ({ data }) => {
              if (data.status) {
                toastr.success('Tindakan berhasil dihapus.');
                // onReloadTindakan();
                // onReloadPenunjang();
                resetFormHandler();
              } else {
                if (data.message) {
                  toastr.error(data.message);
                }
              }
            },
            onError: (error) => {
              toastr.warning(
                error && error.message
                  ? error.message
                  : 'Terjadi masalah server'
              );
            },
            onSettled: () => dispatch(hideLoader()),
          }
        );
      },
    });
  }, [
    deleteMutation,
    dispatch,
    // onReloadPenunjang,
    // onReloadTindakan,
    resetFormHandler,
    selected.id,
    t,
  ]);

  useEffect(() => {
    const key = process.platform === 'darwin' ? 'ctrl' : 'alt';
    Mousetrap.bind(`${key}+t`, () => {
      if (actionRefs.add.current) {
        actionRefs.add.current.handleClick();
      }
    });

    Mousetrap.bind(`${key}+k`, () => {
      if (actionRefs.edit.current) {
        actionRefs.edit.current.handleClick();
      }
    });

    Mousetrap.bind(`${key}+h`, () => {
      if (actionRefs.delete.current) {
        actionRefs.delete.current.handleClick();
      }
    });

    Mousetrap.bind(`${key}+b`, () => {
      if (actionRefs.cancel.current) {
        actionRefs.cancel.current.handleClick();
      }
    });

    return () => {
      Mousetrap.unbind(`${key}+t`);
      Mousetrap.unbind(`${key}+k`);
      Mousetrap.unbind(`${key}+h`);
      Mousetrap.unbind(`${key}+b`);
    };
  }, [actionRefs.add, actionRefs.cancel, actionRefs.delete, actionRefs.edit]);
  return (
    <FooterActionsContainer>
      <>
        {isCanAdd && (
          <Menu.Item className="pr-0">
            <AddButton
              onClick={addHandler}
              inputRef={actionRefs.add}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanEdit && (
          <Menu.Item className="pr-0">
            <EditButton
              onClick={editHandler}
              inputRef={actionRefs.edit}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanDelete && (
          <Menu.Item className="pr-0">
            <DeleteButton
              onClick={deleteHandler}
              inputRef={actionRefs.delete}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanSave && (
          <Menu.Item className="pr-0">
            <SaveButton
              onClick={saveHandler}
              inputRef={actionRefs.save}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanCancel && (
          <Menu.Item className="pr-0">
            <CancelButton
              onClick={cancelHandler}
              inputRef={actionRefs.cancel}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        <Menu.Menu position="right" className="absolute right-4">
          <Menu.Item className="pr-0">
            <PreviewButton
            // onClick={() => setOpenPrint(true)}
            // inputRef={this.finish}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        </Menu.Menu>
        ƒ
      </>
    </FooterActionsContainer>
  );
}

FooterActions.propTypes = {
  // isResetStatusPemenuhan: PropTypes.bool,
  // idKunjunganUnit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onResetForm: PropTypes.func,
  formRef: PropTypes.object,
  mutationLoading: PropTypes.bool,
  // onReloadPenunjang: PropTypes.func,
  // onReloadTindakan: PropTypes.func,
};

export default FooterActions;
