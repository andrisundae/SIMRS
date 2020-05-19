import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';
import { formatter } from '@simrs/common';

export const OptionInstalasi = (props) => {
  let { data } = props;
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">{data.label}</div>
      <div className="react-select__option-caption">
        {`${data.nama_jenis_layanan} | ${data.nama_kelompok_jenis_layanan}`}
      </div>
    </components.Option>
  );
};

OptionInstalasi.propTypes = {
  data: PropTypes.object.isRequired,
};

export const OptionKelasKamar = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">{data.label}</div>
      <div className="react-select__option-caption">
        {`Tarif kamar : Rp ${formatter.currency(data.tarif)}`}
      </div>
    </components.Option>
  );
};

OptionKelasKamar.propTypes = {
  data: PropTypes.object.isRequired,
};

export const OptionAsalKunjungan = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">
        {formatter.dateFormatClient(data.tgl_kunjungan)}
      </div>
      <div className="react-select__option-caption">{data.label}</div>
    </components.Option>
  );
};

OptionKelasKamar.propTypes = {
  data: PropTypes.object.isRequired,
};

export const AsalKunjunganSingleValue = ({ data, ...props }) => (
  <components.SingleValue {...props}>
    {`${formatter.dateFormatClient(data.tgl_kunjungan)} | ${data.label}`}
  </components.SingleValue>
);
