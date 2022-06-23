import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { useModuleTrans, DateRangePickerHF } from '@simrs/components';
function Filter({ onSubmit, innerRef, params = {} }) {
  const t = useModuleTrans();
  const methods = useForm({
    // defaultValues: {
    //   periode: [params.start_date, params.end_date],
    // },
  });

  useEffect(() => {
    const subscription = methods.watch(() => methods.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [methods, onSubmit]);

  return (
    <FormProvider {...methods}>
      <Form size="mini" ref={innerRef}>
        <div className="flex flex-row items-center space-x-4">
          <label>{t('periode_transaksi')}</label>
          <DateRangePickerHF
            name="periode"
            placeholderText="Pilih range tanggal"
          />
        </div>
      </Form>
    </FormProvider>
  );
}

Filter.propTypes = {
  onSubmit: PropTypes.func,
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <Filter innerRef={ref || innerRef} {...props} />;
});

export default Component;
