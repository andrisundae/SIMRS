import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'semantic-ui-react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  useModuleTrans,
  ReactSelect,
  DatePickerHF,
  TimePickerHF,
  CheckboxHF,
} from '@simrs/components';

const FormPermintaanPenunjang = ({
  innerRef,
  data,
  unitLayanan,
  kelas,
  dpjpAsal,
  dpjpTujuan,
  onSubmit,
}) => {
  const methods = useForm();
  const t = useModuleTrans();

  return (
    <FormProvider {...methods} >
      <Form ref={innerRef} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="-top-1">
              <label>{t('tanggal')}</label>
            </Grid.Column>
            <Grid.Column width="6">
              <DatePickerHF
                name="tanggal"
                rules={{ required: 'Harus diisi' }}
              />
            </Grid.Column>
            <Grid.Column width="1" className="-top-1">
              <label>{t('jam')}</label>
            </Grid.Column>
            <Grid.Column width="4">
              <TimePickerHF name="jam" rules={{ required: 'Harus diisi' }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="-top-1">
              <label>{t('unit_layanan')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="unit_layanan_id"
                placeholder={t('unit_layanan')}
                options={unitLayanan || []}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1">
            <Grid.Column width="5" className="-top-1">
              <label>{t('kelas')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="kelas_id"
                placeholder={t('kelas')}
                options={kelas || []}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="-top-1">
              <label>{t('yang_meminta')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="dpjp_asal_id"
                placeholder={t('yang_meminta')}
                options={dpjpAsal || []}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="-top-1">
              <label>{t('dx')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="dx_id"
                placeholder={t('dx')}
                options={dpjpTujuan || []}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="-top-1">
              {''}
            </Grid.Column>
            <Grid.Column width="11">
              <CheckboxHF name="st_cito" label={t('st_cito')} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormProvider>
  );
};

FormPermintaanPenunjang.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  unitLayanan: PropTypes.array,
  kelas: PropTypes.array,
  dpjpAsal: PropTypes.array,
  dpjpTujuan: PropTypes.array,
  onSubmit: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormPermintaanPenunjang innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
