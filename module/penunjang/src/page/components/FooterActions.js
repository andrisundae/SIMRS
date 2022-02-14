import React, { useMemo, useCallback } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FooterActionsContainer,
  EditButton,
  SaveButton,
  CancelButton,
  FinishButton,
  AddButton,
  PreviewButton,
} from '@simrs/components';
import { disabledActionsSelector } from '../../redux/reducer/selector';
import { finish as onFinish } from '../../redux/reducer';

function FooterActions() {
  // const [openPrint, setOpenPrint] = useState(false);
  const dispatch = useDispatch();
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
    return !disableActions.add;
  }, [disableActions.add]);
  const isCanEditDpjp = useMemo(() => {
    return !disableActions.edit_dpjp;
  }, [disableActions.edit_dpjp]);
  const finishHandler = useCallback(() => dispatch(onFinish()), [dispatch]);
  return (
    <FooterActionsContainer>
      <>
        {isCanEdit && (
          <Menu.Item className="pr-0">
            <EditButton
            // onClick={this.onEdit}
            // inputRef={this.edit}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanAdd && (
          <Menu.Item className="pr-0">
            <AddButton
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
            // onClick={this.onCancel}
            // inputRef={this.cancel}
            // onKeyDown={this._onFocusElement}
            />
          </Menu.Item>
        )}
        {isCanEditDpjp && (
          <Menu.Item className="pr-0">
            <EditButton
              title="Edit DPJP"
              // onClick={this.onEdit}
              // inputRef={this.edit}
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
          <Menu.Item className="pr-0">
            <FinishButton
              onClick={finishHandler}
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

export default FooterActions;
