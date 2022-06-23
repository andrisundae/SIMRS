import React, { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useKomponenTarifSuggestion } from '@simrs/billing/src/fetcher/komponenTarif';

const KomponenTarifSelector = ({ innerRef, ...props }) => {
  const { data, isLoading } = useKomponenTarifSuggestion();
  const getOptionLabel = useCallback((row) => row.nama, []);
  const getOptionValue = useCallback((row) => row.nama, []);
  return (
    <Select
      isMulti
      styles={props.styles}
      isLoading={isLoading}
      options={data || []}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      ref={innerRef}
      closeMenuOnSelect={false}
      {...props}
    />
  );
};

KomponenTarifSelector.propTypes = {
  name: PropTypes.string,
  styles: PropTypes.object,
  maxMenuHeight: PropTypes.number,
};

KomponenTarifSelector.defaultProps = {
  maxMenuHeight: 300,
};

const Component = forwardRef((props, ref) => {
  return <KomponenTarifSelector innerRef={ref} {...props} />;
});

export default Component;
