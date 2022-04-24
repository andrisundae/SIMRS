import React, { useCallback, memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import FormErrorMessage from '../FormErrorMessage';

const DatePickerHF = React.forwardRef(
  (
    { name, rules = {}, onAfterChange, dateFormat = 'dd/MM/yyyy', ...props },
    ref
  ) => {
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
        <DatePicker
          {...inputProps}
          inputRef={ref}
          selected={inputProps.value}
          dateFormat={dateFormat}
          {...props}
          onChange={changeHandler}
        />
        {invalid && <FormErrorMessage message={error?.message} />}
      </Form.Field>
    );
  }
);

export default memo(DatePickerHF);
