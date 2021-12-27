import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Segment, Divider, Header } from 'semantic-ui-react';
import { useModuleTrans, messageBox } from '@simrs/components';
// import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
// import { TagihanPasien } from '@simrs/billing/src/Components';
// import { selectedKunjunganSelector } from '../../redux/reducer/selector';

function DetailForm() {
  const t = useModuleTrans();
  const methods = useForm();
  const inputRef = {
    kodeBarang: useRef(),
  };
  const formRef = useRef();
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <FormProvider {...methods}>
      <Form size="mini" onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Segment size="mini">
          <Grid columns="3" className="mt-1">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="5">
                      <label>{t('Kode Barang')}</label>
                    </Grid.Column>
                    <Grid.Column width="9">
                      <Input
                        ref={inputRef.kodeBarang}
                        name="kode-barang"
                        rules={{ required: 'Harus diisi' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('tanggal')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="tanggal" disabled />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('tanggal')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="tanggal" disabled />
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

export default DetailForm;
