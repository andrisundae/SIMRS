import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { checkboxComponentChange } from '../../reducer/item';

export default function CheckboxItemComponent() {
  const dispatch = useDispatch();
  const { checkboxComponent } = useSelector((state) => state.item);

  return (
    <>
      <Form.Field>
        <label>Horisontal</label>
        <Input
          type="number"
          value={checkboxComponent.horisontal}
          onChange={(e, { value }) =>
            dispatch(
              checkboxComponentChange({
                ...checkboxComponent,
                horisontal: value,
              })
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <label>Pilihan</label>
        <Select
          options={checkboxComponent.options}
          search
          selection
          fluid
          multiple
          allowAdditions
          noResultsMessage={null}
          value={checkboxComponent.value}
          onAddItem={(e, { value }) => {
            if (
              _.findIndex(checkboxComponent.options, ['text', value]) === -1
            ) {
              dispatch(
                checkboxComponentChange({
                  ...checkboxComponent,
                  options: [
                    { text: value, value },
                    ...checkboxComponent.options,
                  ],
                  value: [...checkboxComponent.value, value],
                })
              );
            }
          }}
          onChange={(e, { value }) => {
            dispatch(
              checkboxComponentChange({
                ...checkboxComponent,
                options: checkboxComponent.options.filter(
                  (v) => value.indexOf(v.text) > -1
                ),
                value: value,
              })
            );
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>Pilihan Lain</label>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              type="number"
              fluid
              placeholder="Panjang Karakter"
              value={checkboxComponent.pilihanLain.panjangKarakter}
              onChange={(e, { value }) =>
                dispatch(
                  checkboxComponentChange({
                    ...checkboxComponent,
                    pilihanLain: {
                      ...checkboxComponent.pilihanLain,
                      panjangKarakter: value,
                    },
                  })
                )
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              placeholder="Placeholder"
              value={checkboxComponent.pilihanLain.placeholder}
              onChange={(e, { value }) =>
                dispatch(
                  checkboxComponentChange({
                    ...checkboxComponent,
                    pilihanLain: {
                      ...checkboxComponent.pilihanLain,
                      placeholder: value,
                    },
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
