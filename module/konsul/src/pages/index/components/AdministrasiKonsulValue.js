import React from 'react';
import { components } from 'react-select';
import { formatter } from '@simrs/common';
import PropTypes from 'prop-types';

const AdministrasiKonsulValue = ({ data, ...props }) => (
  <components.SingleValue {...props}>{`${
    data.nama_layanan
  } (${formatter.currency(data.tarif)})`}</components.SingleValue>
);

AdministrasiKonsulValue.propTypes = {
  data: PropTypes.object,
};

export default React.memo(AdministrasiKonsulValue);
