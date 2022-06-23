import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

// import { Select } from '@simrs/components';

const MultiValueLabel = (props) => {
  let { data } = props;
  return (
    <components.MultiValueLabel {...props}>
      <div>
        {data.label} | {data.order}
      </div>
    </components.MultiValueLabel>
  );
};

const SelectOrder = (props) => {
  return (
    <Select
      isMulti
      styles={props.styles}
      components={{ MultiValueLabel }}
      {...props}
    />
  );
};

SelectOrder.propTypes = {
  name: PropTypes.string,
  styles: PropTypes.object,
  maxMenuHeight: PropTypes.number,
};

// SelectOrder.defaultProps = {
//     styles: {
//         multiValueLabel: base => ({
//             ...base,
//             color: 'black',
//             fontSize: 12,
//             marginTop: -3
//         }),
//         multiValue: base => ({
//             ...base,
//             marginTop: -2,
//             maxHeight: 23,
//             border: '1px solid #cccccc',
//             verticalAlign: 'center'
//         }),
//         groupHeading: base => ({
//             ...base,
//             fontSize: 14,
//             fontWeight: 'bold',
//             color: 'black'
//         }),
//     },
//     maxMenuHeight: 300
// }

export default SelectOrder;
