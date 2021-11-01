import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Checkbox } from 'semantic-ui-react';
import { labelComponentChange } from '../../reducer/item';

export default function LabelItemComponent() {
  const dispatch = useDispatch();
  const { labelComponent } = useSelector((state) => state.item);

  return (
    <Form.Field>
      <Checkbox
        label="Dengan Checkbox"
        checked={1 === labelComponent.withCheckbox ? true : false}
        onChange={() =>
          dispatch(
            labelComponentChange({
              ...labelComponent,
              withCheckbox: +!labelComponent.withCheckbox,
            })
          )
        }
      />
    </Form.Field>
  );
}
