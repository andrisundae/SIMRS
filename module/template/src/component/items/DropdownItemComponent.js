import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { dropdownComponentChange } from '../../reducer/item';

export default function DropdownItemComponent() {
  const dispatch = useDispatch();
  const { dropdownComponent } = useSelector((state) => state.item);

  return (
    <>
      <Form.Field>
        <label>Pilihan</label>
        <Select
          options={dropdownComponent.options}
          search
          selection
          fluid
          multiple
          allowAdditions
          noResultsMessage={null}
          value={dropdownComponent.value}
          onAddItem={(e, { value }) => {
            if (
              _.findIndex(dropdownComponent.options, ['text', value]) === -1
            ) {
              dispatch(
                dropdownComponentChange({
                  ...dropdownComponent,
                  options: [
                    { text: value, value },
                    ...dropdownComponent.options,
                  ],
                  value: [...dropdownComponent.value, value],
                })
              );
            }
          }}
          onChange={(e, { value }) => {
            dispatch(
              dropdownComponentChange({
                ...dropdownComponent,
                options: dropdownComponent.options.filter(
                  (v) => value.indexOf(v.text) > -1
                ),
                value: value,
              })
            );
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>
          Keterangan (merupakan tambahan keterangan dari pilihan di atas)
        </label>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              type="number"
              fluid
              placeholder="Panjang Karakter"
              value={dropdownComponent.panjangKarakter}
              onChange={(e, { value }) =>
                dispatch(
                  dropdownComponentChange({
                    ...dropdownComponent,
                    panjangKarakter: value,
                  })
                )
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              placeholder="Placeholder"
              value={dropdownComponent.placeholder}
              onChange={(e, { value }) =>
                dispatch(
                  dropdownComponentChange({
                    ...dropdownComponent,
                    placeholder: value,
                  })
                )
              }
            />
            <div className="mt-2 text-gray-500">
              Teks yang muncul saat isian masih kosong
            </div>
          </Form.Field>
        </Form.Group>
      </Form.Field>
    </>
  );
}
