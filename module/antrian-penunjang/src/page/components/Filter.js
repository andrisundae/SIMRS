import React, { useCallback, useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { useModuleTrans } from '@simrs/components';
import { useInitAntrianPenunjang } from '@simrs/billing/src/fetcher';
import { Input, ReactSelect } from '@simrs/components';

import UnitLayananSelector from './UnitLayananSelector';

function Filter({ onSubmit, innerRef }) {
  const t = useModuleTrans();
  const methods = useForm();

  // Hook untuk mencari pasien
  const { data } = useInitAntrianPenunjang();

  const formattedData = useMemo(() => {
    const inits = {
      instalasi: [],
      kelompok: [],
      penjamin: [],
      unit_layanan: [],
    };
    if (!data) {
      return inits;
    }
    return data;
  }, [data]);

  const changeInstalasiHandler = useCallback(() => {
    methods.setValue('unit_layanan_id', null);
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch(() => methods.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
}, [methods, onSubmit]);

  return (
    <FormProvider {...methods}>
      <Form ref={innerRef} size="mini">
        <Segment size="mini" className="py-2 px-5 mt-2 mb-1">
          <Grid columns="2" className="mb-1 mt-2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('jenis_layanan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        name="instalasi_id"
                        placeholder={t('jenis_layanan')}
                        // inputRef={this.instalasi_id}
                        onAfterChange={changeInstalasiHandler}
                        // value={selectedOption.instalasi_id}
                        options={formattedData?.instalasi || []}
                        // onKeyDown={(e) =>
                        //   this.focusElementHandler(e, 'unit_layanan_id')
                        // }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('unit_layanan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <UnitLayananSelector
                        control={methods.control}
                        data={formattedData?.unit_layanan || []}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('status_pasien')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        name="penjamin_id"
                        placeholder={t('status_pasien')}
                        // inputRef={this.instalasi_id}
                        // onChange={(selected) =>
                        //   this.changeSelect2Hanlder('instalasi_id', selected)
                        // }
                        // value={selectedOption.instalasi_id}
                        options={formattedData?.penjamin || []}
                        // onKeyDown={(e) =>
                        //   this.focusElementHandler(e, 'unit_layanan_id')
                        // }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nama_pasien')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="nama_pasien" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('norm')}</label>
                    </Grid.Column>
                    <Grid.Column width="6" className="field">
                      <Input name="norm" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
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
