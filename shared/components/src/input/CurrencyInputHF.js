import React, { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import FormErrorMessage from '../FormErrorMessage';
import CurrencyInput from './CurrencyInput';

const CurrencyInputHF = React.forwardRef(
  ({ name, rules = {}, ...props }, ref) => {
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
        <CurrencyInput
          {...inputProps}
          inputRef={ref}
          value={inputProps.value}
          {...props}
        />
        {invalid && <FormErrorMessage message={error?.message} />}
      </Form.Field>
    );
  }
);

export default memo(CurrencyInputHF);
