import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { radioComponentChange } from '../../reducer/item';

export default function RadioItemComponent() {
  const dispatch = useDispatch();
  const { radioComponent } = useSelector((state) => state.item);

  return (
    <>
      <Form.Field>
        <label>Horisontal</label>
        <Input
          type="number"
          value={radioComponent.horisontal}
          onChange={(e, { value }) =>
            dispatch(
              radioComponentChange({
                ...radioComponent,
                horisontal: value,
              })
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <label>Pilihan</label>
        <Select
          options={radioComponent.options}
          search
          selection
          fluid
          multiple
          allowAdditions
          noResultsMessage={null}
          value={radioComponent.value}
          onAddItem={(e, { value }) => {
            if (_.findIndex(radioComponent.options, ['text', value]) === -1) {
              dispatch(
                radioComponentChange({
                  ...radioComponent,
                  options: [{ text: value, value }, ...radioComponent.options],
                  value: [...radioComponent.value, value],
                })
              );
            }
          }}
          onChange={(e, { value }) => {
            dispatch(
              radioComponentChange({
                ...radioComponent,
                options: radioComponent.options.filter(
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
              value={radioComponent.pilihanLain.panjangKarakter}
              onChange={(e, { value }) =>
                dispatch(
                  radioComponentChange({
                    ...radioComponent,
                    pilihanLain: {
                      ...radioComponent.pilihanLain,
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
              value={radioComponent.pilihanLain.placeholder}
              onChange={(e, { value }) =>
                dispatch(
                  radioComponentChange({
                    ...radioComponent,
                    pilihanLain: {
                      ...radioComponent.pilihanLain,
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
