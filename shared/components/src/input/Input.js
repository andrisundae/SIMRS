import React, { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, Input as SmInput } from 'semantic-ui-react';
import FormErrorMessage from '../FormErrorMessage';

const Input = React.forwardRef(({ name, rules = {}, ...props }, ref) => {
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
      <SmInput {...inputProps} ref={ref} value={inputProps.value} {...props} />
      {invalid && <FormErrorMessage message={error?.message} />}
    </Form.Field>
  );
});

export default memo(Input);
