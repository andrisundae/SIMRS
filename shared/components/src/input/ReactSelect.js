import React, { useCallback, memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import Select from './Select';
import FormErrorMessage from '../FormErrorMessage';

const ReactSelect = React.forwardRef(
  ({ name, rules = {}, onAfterChange, ...props }, ref) => {
    const { control, setValue } = useFormContext();
    const {
      field: { ref: innerRef, ...inputProps },
      fieldState: { invalid, error },
    } = useController({
      name,
      control,
      rules,
    });

    const changeHandler = useCallback(
      (selected) => {
        setValue(name, selected, { shouldValidate: true });
        if (typeof onAfterChange === 'function') {
          onAfterChange(selected);
        }
      },
      [name, onAfterChange, setValue]
    );
    return (
      <Form.Field error={invalid}>
        <Select
          {...inputProps}
          inputRef={ref}
          value={inputProps.value}
          {...props}
          onChange={changeHandler}
        />
        {invalid && <FormErrorMessage message={error?.message} />}
      </Form.Field>
    );
  }
);

export default memo(ReactSelect);
