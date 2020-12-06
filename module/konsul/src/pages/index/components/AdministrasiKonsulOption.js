import React from 'react';
import { components } from 'react-select';
import { formatter } from '@simrs/common';
import PropTypes from 'prop-types';

const AdministrasiKonsulOption = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">{data.nama_layanan}</div>
      <div className="react-select__option-caption">
        {`Tarif : ${formatter.currency(data.tarif)}`}
      </div>
    </components.Option>
  );
};

AdministrasiKonsulOption.propTypes = {
  data: PropTypes.object,
};

export default React.memo(AdministrasiKonsulOption);
