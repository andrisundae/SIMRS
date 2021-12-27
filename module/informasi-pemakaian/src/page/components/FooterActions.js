import React, { useMemo, useCallback, useRef } from 'react';
import { Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FooterActionsContainer,
  EditButton,
  SaveButton,
  CancelButton,
  FinishButton,
  AddTransaksi,
  AddItem,
  DeleteButton,
  DeleteTransaksi,
  PrintButton,
  CancelTransaksi,
} from '@simrs/components';
import { disabledActionsSelector } from '../../redux/reducer/selector';
import { addTransaksi, simpan, batal } from '../../redux/reducer';

function FooterActions() {
  const btnRef = {
    tambahTransaksi: useRef(),
    tambahItem: useRef(),
    simpan: useRef(),
    batal: useRef(),
  };
  const dispatch = useDispatch();
  const disableActions = useSelector(disabledActionsSelector);

  const isCanAdd = useMemo(() => {
    return !disableActions.tambahTransaksi;
  }, [disableActions.tambahTransaksi]);
  const isCanAddItem = useMemo(() => {
    return false;
  }, []);

  const isCanSave = useMemo(() => {
    return !disableActions.save;
  }, [disableActions.save]);
  // const isCanEdit = useMemo(() => {
  //   return false;
  // }, []);

  // const isCanEditDpjp = useMemo(() => {
  //   return !disableActions.edit_dpjp;
  // }, [disableActions.edit_dpjp]);
  const onAddTransaksi = useCallback(() => dispatch(addTransaksi()), [
    dispatch,
    addTransaksi,
  ]);

  const doSave = useCallback(() => dispatch(simpan()), [dispatch, simpan]);

  const onCancel = useCallback(() => dispatch(batal()), [dispatch, batal]);

  return (
    <FooterActionsContainer>
      <>
        {isCanAdd && (
          <Menu.Item className="pr-0">
            <AddTransaksi
              onClick={onAddTransaksi}
              inputRef={btnRef.tambahTransaksi}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <AddItem
              title="Tambah Item"
              inputRef={btnRef.tambahItem}
              // onClick={this.onFinish}
              // inputRef={this.finish}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanSave && (
          <Menu.Item className="pr-0">
            <SaveButton
              onClick={doSave}
              inputRef={btnRef.save}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanSave && (
          <Menu.Item className="pr-0">
            <CancelButton
              onClick={onCancel}
              inputRef={btnRef.cancel}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <EditButton
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <DeleteButton
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <DeleteTransaksi
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <PrintButton
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAddItem && (
          <Menu.Item className="pr-0">
            <CancelTransaksi
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}

        {isCanAddItem && (
          <Menu.Menu position="right" className="absolute right-5">
            <Menu.Item className="pr-0">
              <FinishButton
                onClick={() => {}}
                // inputRef={this.finish}
                // onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          </Menu.Menu>
        )}
      </>
    </FooterActionsContainer>
  );
}

export default FooterActions;
