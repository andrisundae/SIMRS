import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select } from 'semantic-ui-react';
import _ from 'lodash';
import { dropdownDBComponentChange } from '../../reducer/item';

export default function DropdownDBItemComponent() {
  const dispatch = useDispatch();
  const { dropdownDBComponent } = useSelector((state) => state.item);

  return (
    <Form.Field>
      <label>Diambil dari</label>
      <Select
        defaultValue={dropdownDBComponent.source}
        options={[
          { key: 0, value: 'diagnosis', text: 'Diagnosis' },
          { key: 1, value: 'tindakan_ok', text: 'Tindakan OK' },
          { key: 2, value: 'dokter_umum', text: 'Dokter Umum' },
          { key: 3, value: 'dokter_spesialis', text: 'Dokter Spesialis' },
          {
            key: 4,
            value: 'pelaksana_ok',
            text: 'Pelaksana OK (Dokter dan Perawat)',
          },
          { key: 5, value: 'dokter_pelaksana_ok', text: 'Dokter Pelaksana OK' },
          {
            key: 6,
            value: 'perawat_pelaksana_ok',
            text: 'Perawat Pelaksana OK',
          },
        ]}
        onChange={(e, { value }) =>
          dispatch(
            dropdownDBComponentChange({
              ...dropdownDBComponent,
              source: value,
            })
          )
        }
      />
    </Form.Field>
  );
}
