import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Segment, Divider, Header } from 'semantic-ui-react';
import { useModuleTrans, messageBox } from '@simrs/components';
import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
import { TagihanPasien } from '@simrs/billing/src/Components';
import { selectedKunjunganSelector } from '../../redux/reducer/selector';

function FormTempatTidur() {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const selectedKunjungan = useSelector(selectedKunjunganSelector);
  const methods = useForm();
  const normRef = React.useRef();
  const inputRef = {
    norm: normRef,
  };
  const formRef = useRef();
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <FormProvider {...methods}>
      <Form size="mini" onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Segment size="mini" className="mt-1">
          <Grid columns="2" className="mt-1">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('ruang')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input
                        ref={inputRef.norm}
                        name="ruang"
                        rules={{ required: 'Harus diisi' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('kelas')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="kelas" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('kamar')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="kamar" disabled />
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
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('dpjp')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="dpjp" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('dpjp')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="dpjp" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('biaya_per_hari')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="biaya_per_hari" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('total_biaya')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="total_biaya" disabled />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pt-2">
              <Grid.Column width={16}>
                <TagihanPasien
                  keringanan={selectedKunjungan.keringanan || 0}
                  bayar={selectedKunjungan.bayar || 0}
                  pengembalian={selectedKunjungan.pengembalian || 0}
                  biaya={selectedKunjungan.biaya || 0}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </FormProvider>
  );
}

export default FormTempatTidur;
