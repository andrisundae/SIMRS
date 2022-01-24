import React, { useCallback } from 'React';
import { Checkbox } from 'semantic-ui-react';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, onChange, onAfterChanged, data, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    const changeHandler = useCallback((e, {checked}) => {
      if (typeof onChange === 'function') {
        onChange(e);
      }
      if (typeof onAfterChanged === 'function') {
        onAfterChanged(checked, data);
      }
    }, [data, onAfterChanged, onChange]);

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    // return <input type="checkbox" ref={resolvedRef} {...rest} />;
    return <Checkbox ref={resolvedRef} {...rest} onChange={changeHandler} />;
  }
);

export default IndeterminateCheckbox;
