import React from 'react';
import PropTypes from 'prop-types';
// import { useWatch } from 'react-hook-form';
import { useModuleTrans, ReactSelect } from '@simrs/components';
import { usePelaksanaByUnitLayanan } from '@simrs/billing/src/fetcher/pelaksana';

const PelaksanaSelector = ({ idUnitLayanan, innerRef, ...props }) => {
  const t = useModuleTrans();
  // const selected = useWatch({
  //   control,
  //   name: 'id_unit_layanan', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  //   // defaultValue: '',
  // });

  const { data, isLoading } = usePelaksanaByUnitLayanan(idUnitLayanan);

  return (
    <ReactSelect
      ref={innerRef}
      name="id_pelaksana"
      placeholder={t('pilih_pelaksana')}
      options={data?.pelaksana || []}
      isLoading={isLoading}
      {...props}
    />
  );
};

PelaksanaSelector.propTypes = {
  // control: PropTypes.object,
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <PelaksanaSelector innerRef={ref || innerRef} {...props} />;
});

export default Component;
