import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { multipleComponentChange } from '../../reducer/item';

export default function MultipleItemComponent() {
  const dispatch = useDispatch();
  const { multipleComponent } = useSelector((state) => state.item);

  return (
    <>
      <Form.Field>
        <label>Panjang Karakter</label>
        <Input
          type="number"
          value={multipleComponent.panjangKarakter}
          onChange={(e, { value }) =>
            dispatch(
              multipleComponentChange({
                ...multipleComponent,
                panjangKarakter: value,
              })
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <label>Placeholder</label>
        <Input
          value={multipleComponent.placeholder}
          onChange={(e, { value }) =>
            dispatch(
              multipleComponentChange({
                ...multipleComponent,
                placeholder: value,
              })
            )
          }
        />
        <div className="mt-2 text-gray-500">
          Teks yang muncul saat isian masih kosong
        </div>
      </Form.Field>
    </>
  );
}
