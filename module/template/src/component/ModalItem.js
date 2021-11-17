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
import TipeComponent from './items/ItemsComponent';
import {
  modalItemChange,
  modalIndukChange,
  modalUrutanChange,
} from '../reducer/form';
import {
  tipeComponentChange,
  fontStyleChange,
  resetState,
} from '../reducer/item';
import ModalInduk from './ModalInduk';
import ModalUrutan from './ModalUrutan';

export default function ModalItem() {
  const dispatch = useDispatch();
  const { modalItem, modalInduk, modalUrutan } = useSelector(
    (state) => state.form
  );
  const { induk, fontStyle, tipeComponent } = useSelector(
    (state) => state.item
  );

  function handleCloseModalItem() {
    dispatch(modalItemChange(!modalItem));
    dispatch(resetState());
  }

  return (
    <>
      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={modalItem}
        onClose={handleCloseModalItem}
      >
        <Modal.Header className="text-xl">
          <Icon.Group className="mr-2">
            <Icon name="tasks" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          Tambah Item
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Induk</label>
              <Input
                readOnly
                action={{
                  icon: 'ordered list',
                  onClick: () => dispatch(modalIndukChange(!modalInduk)),
                }}
                value={induk.text}
              />
            </Form.Field>
            <Form.Field>
              <label>Urutan</label>
              <span>
                Data yang baru diinputkan akan ditempatkan pada urutan terakhir
                sesuai dengan <strong>Induk</strong>, klik{' '}
                <Icon
                  className="ml-1"
                  name="list"
                  color="blue"
                  bordered
                  inverted
                  link
                  onClick={() => dispatch(modalUrutanChange(!modalUrutan))}
                />{' '}
                untuk mengubah urutan item
              </span>
            </Form.Field>
            <Form.Field>
              <label>Label</label>
              <Input />
            </Form.Field>
            <Form.Field>
              <label>Sebagai Referensi</label>
              <Select
                defaultValue="-"
                options={[{ key: 0, value: '-', text: 'Pilih' }]}
              />
            </Form.Field>
            <Form.Field>
              <label>Style</label>
              <div>
                <Select
                  defaultValue={fontStyle.fontSize}
                  options={[
                    { key: 0, value: '14', text: 'Ukuran Font (default 14)' },
                    { key: 1, value: '15', text: '15' },
                    { key: 2, value: '16', text: '16' },
                    { key: 3, value: '17', text: '17' },
                    { key: 4, value: '18', text: '18' },
                    { key: 5, value: '19', text: '19' },
                    { key: 6, value: '20', text: '20' },
                    { key: 7, value: '21', text: '21' },
                    { key: 8, value: '22', text: '22' },
                    { key: 9, value: '23', text: '23' },
                    { key: 10, value: '24', text: '24' },
                  ]}
                  onChange={(e, { value }) =>
                    dispatch(
                      fontStyleChange({
                        ...fontStyle,
                        fontSize: value,
                      })
                    )
                  }
                />
                <Checkbox
                  className="ml-10"
                  label={<label className="font-bold">Bold</label>}
                  checked={1 === fontStyle.bold ? true : false}
                  onChange={() =>
                    dispatch(
                      fontStyleChange({
                        ...fontStyle,
                        bold: +!fontStyle.bold,
                      })
                    )
                  }
                />
                <Checkbox
                  className="ml-5"
                  label={<label className="italic">Italic</label>}
                  checked={1 === fontStyle.italic ? true : false}
                  onChange={() =>
                    dispatch(
                      fontStyleChange({
                        ...fontStyle,
                        italic: +!fontStyle.italic,
                      })
                    )
                  }
                />
                <Checkbox
                  className="ml-5"
                  label={<label className="underline">Underline</label>}
                  checked={1 === fontStyle.underline ? true : false}
                  onChange={() =>
                    dispatch(
                      fontStyleChange({
                        ...fontStyle,
                        underline: +!fontStyle.underline,
                      })
                    )
                  }
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Tipe</label>
              <Select
                defaultValue={tipeComponent}
                options={[
                  { key: 0, value: 'label', text: 'Label' },
                  { key: 1, value: 'text', text: 'Text' },
                  { key: 2, value: 'dropdown', text: 'Dropdown' },
                  {
                    key: 3,
                    value: 'dropdown_form_data',
                    text: 'Dropdown dari Database',
                  },
                  { key: 4, value: 'checkbox', text: 'Checkbox' },
                  { key: 5, value: 'radio', text: 'Radio' },
                  { key: 6, value: 'multiple', text: 'Multiple' },
                  { key: 7, value: 'data', text: 'Data' },
                ]}
                onChange={(e, { value }) =>
                  dispatch(tipeComponentChange(value))
                }
              />
            </Form.Field>
            <TipeComponent tipe={tipeComponent} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="save" color="green" content="Simpan" />
          <Button icon="close" content="Tutup" onClick={handleCloseModalItem} />
        </Modal.Actions>
      </Modal>

      <ModalInduk />
      <ModalUrutan />
    </>
  );
}
