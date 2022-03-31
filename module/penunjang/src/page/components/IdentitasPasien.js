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
// import { selectKunjungan, ready } from '../pemenuhan/redux/';
// import { disabledElement, moduleSelector } from '../../red';

function IdentitasPasien({ data, isPulang, penjaminPasien }) {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const [norm, setNorm] = useState('');
  // const isDisabledNorm = useSelector((state) => disabledElement(state, 'norm'));
  const isDisabledNorm = true;
  // const { focusElement, statusForm, selectedKunjungan } = useSelector(
  //   moduleSelector
  // );
  const focusElement = '';
  const statusForm = '';
  const selectedKunjungan = {};
  const formattedKunjunganAktifRawatInap = {};
  const defaultValues = useMemo(() => {
    return {
      norm: data?.norm,
      nama: data?.nama,
      jenis_kelamin: data?.jenis_kelamin,
      nomor_ktp: data?.nomor_ktp,
      nama_ortu: data?.nama_ortu,
      alamat: data?.alamat,
    };
  }, [data]);
  const { reset, ...methods } = useForm({
    defaultValues,
  });
  const inputRef = {
    norm: React.useRef(),
  };
  const formRef = useRef();

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(defaultValues);
    }
  }, [data, reset, defaultValues]);

  return (
    <FormProvider {...methods}>
      <Form
        size="mini"
        // onSubmit={methods.handleSubmit(onSubmit)}
        ref={formRef}
        // loading={isLoading}
      >
        <Segment size="mini" className="pt-0 pb-3 mb-0">
          <Divider horizontal className="mt-3 mb-3">
            {t('identitas_pasien')}
          </Divider>
          <Grid columns="2" className="mb-1 mt-2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('norm')}</label>
                    </Grid.Column>
                    <Grid.Column width="4" className="field">
                      <Input
                        ref={inputRef.norm}
                        name="norm"
                        rules={{ required: 'Harus diisi' }}
                        // onKeyDown={enterNormHanlder}
                        disabled={isDisabledNorm}
                        // value={norm}
                        // onChange={onChangeInput}
                        // onFocus={focusNormHandler}
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>{t('no_billing')}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="kode_kunjungan_unit"
                        disabled
                        value={selectedKunjungan.name || ''}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nama')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="nama" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('jenis_kelamin')}</label>
                    </Grid.Column>
                    <Grid.Column width="4" className="field">
                      <Input name="jenis_kelamin" disabled />
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      {!_.isEmpty(data?.umur) && (
                        <Header as="h4" color="grey" style={{ marginTop: 3 }}>
                          {`${data?.umur?.years} Tahun ${data?.umur?.months} bulan ${data?.umur?.days} hari`}
                        </Header>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nomor_ktp')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="ktp" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nama_ortu')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="nama_ortu" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('alamat')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="alamat" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="16" className="field" textAlign="right">
                      {!_.isEmpty(penjaminPasien) && (
                        <Header as="h3" color="green" style={{ marginTop: 3 }}>
                          {isPulang
                            ? t('kunjungan_selesai')
                            : t('kunjungan_aktif')}{' '}
                          - {penjaminPasien}
                        </Header>
                      )}
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

export default IdentitasPasien;
