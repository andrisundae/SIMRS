import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from 'semantic-ui-react';
import {Select, Checkbox, Radio} from '@simrs/components';
import {elementType as staticType} from  '../../../static';

const CustomInput = ({elementType, innerRef, ...props}) => {
  let Component = null;
  switch (elementType) {
    case staticType.COMBOBOX : {
      Component = Select;
      break;
    }
    case staticType.CHECKBOX: {
      Component = Checkbox;
      break;
    }
    case staticType.RADIO: {
      Component = Radio;
      break;
    }
    case staticType.TEXTAREA: {
      Component = TextArea;
      break;
    }

    default: {
      Component = Input;
    }
  }

  return <Component ref={innerRef} {...props} />;
};

CustomInput.defaultProps = {
  elementType: staticType.TEXTBOX
};

CustomInput.propTypes = {
  elementType: PropTypes.number.isRequired,
  innerRef: PropTypes.func
};



export default React.forwardRef((props, ref) => <CustomInput innerRef={ref} {...props} />);