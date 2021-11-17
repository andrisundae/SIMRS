import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Modal,
  Icon,
  List,
} from 'semantic-ui-react';
import { modalShowHasilChange } from '../reducer/form';
import TemplateRenderer from './TemplateRenderer';

export default function ModalShowHasil() {
  const dispatch = useDispatch();
  const { modalShowHasil } = useSelector((state) => state.form);

  return (
    <>
      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={modalShowHasil}
        onClose={() => dispatch(modalShowHasilChange(!modalShowHasil))}
      >
        <Modal.Header className="text-xl">
          <Icon name="archive" className="mr-2" />
          Hasil
        </Modal.Header>
        <Modal.Content>
          <TemplateRenderer
            formType="template"
            templateProps={{
              headingOtomatis: false,
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="close"
            content="Tutup"
            onClick={() => dispatch(modalShowHasilChange(!modalShowHasil))}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
