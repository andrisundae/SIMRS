import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { useModuleTrans, ReactSelect } from '@simrs/components';

const UnitLayananSelector = ({ control, data = [], innerRef, ...props }) => {
  const t = useModuleTrans();
  const selected = useWatch({
    control,
    name: 'instalasi_id', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: '',
  });

  const filteredOptions = useMemo(() => {
    let options = [];
    if (selected?.value) {
      options = data.filter((item) => item.instalasi_id === selected.value);
    }

    return options;
  }, [data, selected]);

  return (
    <ReactSelect
      ref={innerRef}
      name="unit_layanan_id"
      placeholder={t('unit_layanan')}
      options={filteredOptions || []}
      {...props}
    />
  );
};

UnitLayananSelector.propTypes = {
  control: PropTypes.object,
  innerRef: PropTypes.object,
  data: PropTypes.array,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <UnitLayananSelector innerRef={ref || innerRef} {...props} />;
});

export default Component;
