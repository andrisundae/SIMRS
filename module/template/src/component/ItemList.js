import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import { List, Icon, Modal, Button, Label } from 'semantic-ui-react';
import { namaTemplateChange, modalItemChange } from '../reducer/form';
import item, {
  labelItemChange,
  referensiChange,
  fontStyleChange,
  tipeComponentChange,
  labelComponentChange,
  textComponentChange,
  dropdownComponentChange,
  dropdownDBComponentChange,
  checkboxComponentChange,
  radioComponentChange,
  multipleComponentChange,
  dataComponentChange,
} from '../reducer/item';

const tempData = [
  {
    kode: '219001',
    kodeTemplate: '219',
    kodeTree: '001',
    nama: null,
    detil: {
      label: 'Diagnosis ICD IX',
      referensi: '',
      style: {
        font_size: '14',
      },
      type: 'data',
      source: {
        key: '0.5',
        label: 'Diagnosis ICD IX (All) (Multi Select Row)',
        parent: 'Master Diagnosis',
        value: 'master_diagnosis_ix_all_multiselect',
      },
    },
    kodePersonel: 'LINKAR001',
    tStamp: '2021-08-10 11:23:47.273',
  },
  {
    kode: '219002',
    kodeTemplate: '219',
    kodeTree: '002',
    nama: null,
    detil: {
      label: 'Anamnesis',
      referensi: '',
      style: {
        font_size: 14,
      },
      type: 'data',
      source: {
        key: '30.1',
        label: 'Medis',
        parent: 'Anamnesis',
        value: 'anamnesis_medis',
      },
    },
    kodePersonel: 'LINKAR001',
    tStamp: '2021-08-23 11:37:43.477',
  },
  {
    kode: '219003',
    kodeTemplate: '219',
    kodeTree: '003',
    nama: null,
    detil: {
      label: 'Anamnesis (Cell)',
      referensi: '',
      style: {
        font_size: 14,
      },
      type: 'data',
      source: {
        key: '30.9',
        label: 'Semua PPA (Select Cell)',
        parent: 'Anamnesis',
        value: 'anamnesis_all_selective',
      },
    },
    kodePersonel: 'LINKAR001',
    tStamp: '2021-09-22 10:27:57.310',
  },
];

export default function ItemList() {
  const dispatch = useDispatch();
  const { modalItem } = useSelector((state) => state.form);
  const {
    fontStyle,
    labelComponent,
    textComponent,
    dropdownComponent,
    dropdownDBComponent,
    checkboxComponent,
    radioComponent,
    multipleComponent,
    dataComponent,
  } = useSelector((state) => state.item);

  const [modalHapusItemList, setModalHapusItemList] = useState(false);

  function handleModalHapusItemList() {
    setModalHapusItemList(!modalHapusItemList);
  }

  function buildFontStyle(style) {
    return {
      fontSize: style?.font_size ? style.font_size : fontStyle.fontSize,
      bold: style?.bold ? +style.bold : +fontStyle.bold,
      italic: style?.italic ? +style.italic : +fontStyle.italic,
      underline: style?.underline ? +style.underline : +fontStyle.underline,
    };
  }

  function buildAndSetDataItems(data) {
    switch (data.type) {
      case 'text':
        dispatch(textComponentChange(textComponent));
        break;

      case 'dropdown':
        dispatch(dropdownComponentChange(dropdownComponent));
        break;

      case 'dropdown_form_data':
        dispatch(dropdownDBComponentChange(dropdownDBComponent));
        break;

      case 'checkbox':
        dispatch(checkboxComponentChange(checkboxComponent));
        break;

      case 'radio':
        dispatch(radioComponentChange(radioComponent));
        break;

      case 'multiple':
        dispatch(multipleComponentChange(multipleComponent));
        break;

      case 'data':
        dispatch(
          dataComponentChange({
            value: data.source,
            nilaiKosong: data.source?.nilaiKosong
              ? +data.source?.nilaiKosong
              : +false,
          })
        );
        break;

      default:
        dispatch(labelComponentChange(labelComponent));
        break;
    }
  }

  return (
    <>
      <List celled className="pt-2 pb-5">
        {tempData.map((v, i) => {
          const source = v.detil.source;
          return (
            <List.Item key={i} className="py-2 pl-5">
              <List.Content>
                <Icon
                  name="edit outline"
                  bordered
                  inverted
                  color="blue"
                  className="cursor-pointer"
                  onClick={() => {
                    const items = v.detil;
                    const tempFontStyle = buildFontStyle(items.style);

                    dispatch(namaTemplateChange(items.label));
                    dispatch(referensiChange(items.referensi));
                    dispatch(fontStyleChange(tempFontStyle));
                    dispatch(tipeComponentChange(items.type));
                    buildAndSetDataItems(items);

                    dispatch(modalItemChange(!modalItem));
                  }}
                />
                <Icon
                  name="trash alternate outline"
                  bordered
                  inverted
                  color="red"
                  className="cursor-pointer ml-2"
                  onClick={handleModalHapusItemList}
                />
                <span
                  className={className('ml-10', {
                    'font-bold': fontStyle.bold,
                    italic: fontStyle.italic,
                    underline: fontStyle.underline,
                  })}
                >
                  {v.detil.label}
                  <Label basic className="float-right">
                    {source?.parent} - {source?.label}
                  </Label>
                </span>
              </List.Content>
            </List.Item>
          );
        })}
      </List>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="mini"
        open={modalHapusItemList}
        onClose={handleModalHapusItemList}
      >
        <Modal.Header className="text-xl">
          <Icon name="trash alternate outline" className="mr-2" />
          Hapus Item
        </Modal.Header>
        <Modal.Content>Apakah anda yakin?</Modal.Content>
        <Modal.Actions>
          <Button icon="trash alternate outline" color="red" content="Hapus" />
          <Button
            icon="undo"
            content="Batal"
            onClick={handleModalHapusItemList}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
