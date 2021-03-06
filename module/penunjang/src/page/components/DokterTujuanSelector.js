import React from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { useModuleTrans, ReactSelect } from '@simrs/components';
import { useDokterTujuan } from '@simrs/billing/src/fetcher/penunjang';

const DokterTujuanSelector = ({ control, innerRef, ...props }) => {
  const t = useModuleTrans();
  const selected = useWatch({
    control,
    name: 'id_unit_layanan', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: '',
  });

  const { data, isLoading } = useDokterTujuan(selected?.value);

  return (
    <ReactSelect
      inputRef={innerRef}
      name="id_dokter_tujuan_penunjang"
      placeholder={t('dx')}
      options={data || []}
      isLoading={isLoading}
      {...props}
    />
  );
};

DokterTujuanSelector.propTypes = {
  control: PropTypes.object,
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <DokterTujuanSelector innerRef={ref || innerRef} {...props} />;
});

export default Component;
