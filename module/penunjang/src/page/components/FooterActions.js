import React, { useMemo, useCallback } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FooterActionsContainer,
  EditButton,
  SaveButton,
  CancelButton,
  FinishButton,
  AddButton,
  DeleteButton,
  PreviewButton,
  useAppAction,
} from '@simrs/components';
import { useEditStatusPenunjang } from '@simrs/billing/src/fetcher/penunjang';
import { disabledActionsSelector } from '../pemenuhan/redux/selectors';
import {
  add as onAdd,
  edit as onEdit,
  cancel as onCancel,
} from '../pemenuhan/redux/slice';

function FooterActions({ isResetStatusPemenuhan, idKunjunganUnit, onResetForm }) {
  const history = useHistory();
  // const [openPrint, setOpenPrint] = useState(false);
  const dispatch = useDispatch();
  const appActions = useAppAction();
  const disableActions = useSelector(disabledActionsSelector);
  const isCanEdit = useMemo(() => {
    return !disableActions.edit;
  }, [disableActions.edit]);
  const isCanFinish = useMemo(() => {
    return !disableActions.finish;
  }, [disableActions.finish]);
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

  const editStatusMutation = useEditStatusPenunjang();

  const finishHandler = useCallback(() => {
    history.goBack();
    if (isResetStatusPemenuhan) {
      editStatusMutation.mutate({
        id: idKunjunganUnit,
        st_status_penunjang: 'PERMINTAAN',
      });
    }
  }, [editStatusMutation, history, idKunjunganUnit, isResetStatusPemenuhan]);
  const addHandler = useCallback(() => {
    dispatch(onAdd());
    appActions.deactivateMainMenu();
  }, [appActions, dispatch]);
  const editHandler = useCallback(() => {
    dispatch(onEdit());
    appActions.deactivateMainMenu();
  }, [appActions, dispatch]);
  const cancelHandler = useCallback(() => {
    dispatch(onCancel());
    appActions.activateMainMenu();
  }, [appActions, dispatch]);
  return (
    <FooterActionsContainer>
      <>
        {isCanAdd && (
          <Menu.Item className="pr-0">
            <AddButton
              onClick={addHandler}
              // inputRef={this.finish}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanEdit && (
          <Menu.Item className="pr-0">
            <EditButton
              onClick={editHandler}
              // inputRef={this.edit}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanDelete && (
          <Menu.Item className="pr-0">
            <DeleteButton
            // onClick={this.onFinish}
            // inputRef={this.finish}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanSave && (
          <Menu.Item className="pr-0">
            <SaveButton
            // onClick={this.onSave}
            // inputRef={this.save}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanCancel && (
          <Menu.Item className="pr-0">
            <CancelButton
              onClick={cancelHandler}
              // inputRef={this.cancel}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {/* {isCanEditDpjp && (
          <Menu.Item className="pr-0">
            <EditButton
              title="Edit DPJP"
              // onClick={this.onEdit}
              // inputRef={this.edit}
              // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )} */}
        <Menu.Menu position="right" className="absolute right-4">
          <Menu.Item className="pr-0">
            <PreviewButton
            // onClick={() => setOpenPrint(true)}
            // inputRef={this.finish}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
          {/* {isCanFinish && (
            <Menu.Item className="pr-0">
              <FinishButton
                onClick={finishHandler}
                // inputRef={this.finish}
                // onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )} */}
          <Menu.Item className="pr-0">
            <Button size="mini">
              <Icon name="file alternate outline" />
              Isi Hasil
            </Button>
          </Menu.Item>
          {isCanFinish && (
            <Menu.Item className="pr-0">
              <FinishButton
                onClick={finishHandler}
                // inputRef={this.finish}
                // onKeyDown={this._onFocusElement}
              />
            </Menu.Item>
          )}
        </Menu.Menu>
        ƒ
      </>
    </FooterActionsContainer>
  );
}

FooterActions.propTypes = {
  isResetStatusPemenuhan: PropTypes.bool,
  idKunjunganUnit: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default FooterActions;
