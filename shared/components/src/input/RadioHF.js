import React, { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import FormErrorMessage from '../FormErrorMessage';
import Radio from './Radio';

const RadioHF = React.forwardRef(({ name, rules = {}, ...props }, ref) => {
  const { control } = useFormContext();
  const {
    field: { ref: innerRef, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <Form.Field error={invalid}>
      <Radio
        {...inputProps}
        ref={ref}
        value={inputProps.value}
        checked={inputProps.value ? true : false}
        {...props}
      />
      {invalid && <FormErrorMessage message={error?.message} />}
    </Form.Field>
  );
});

export default memo(RadioHF);
