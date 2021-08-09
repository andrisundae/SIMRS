import React from 'react';
import {
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  Form,
  Input as SmInput,
  Transition,
} from 'semantic-ui-react';

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
      <SmInput {...props} {...inputProps} ref={ref} />
      {invalid && (
        <Transition.Group animation="fade down" duration={300}>
          <div style={{ color: '#9f3a38', fontSize: '.85714286rem' }}>
            {error?.message}
          </div>
        </Transition.Group>
      )}
    </Form.Field>
  );
});

export default Input;
