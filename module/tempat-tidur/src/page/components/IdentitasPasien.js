import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useForm,
  FormProvider,
} from 'react-hook-form';
import _ from 'lodash';
import {
  Grid,
  Form,
  Segment,
  Divider,
  Header,
} from 'semantic-ui-react';
import { useModuleTrans, messageBox } from '@simrs/components';
import {
  usePasienByNorm,
  useKunjunganAktifRawatInap,
} from '@simrs/billing/src/fetcher';
import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
import { selectKunjungan, ready } from '../../redux/reducer';
import { disabledElement, moduleSelector } from '../../redux/reducer/selector';
import { staticConst } from '../../static';

function IdentitasPasien() {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const [norm, setNorm] = useState('');
  const isDisabledNorm = useSelector((state) => disabledElement(state, 'norm'));
  const {focusElement, statusForm, selectedKunjungan} = useSelector(moduleSelector);
  const methods = useForm();
  const inputRef = {
    norm: React.useRef(),
  };
  const formRef = useRef();
  // Hook untuk mencari pasien
  const { data: pasien, isLoading } = usePasienByNorm(norm, {
    onSuccess: (data) => {
      if (!data) {
        messageBox({
          title: 'Info',
          message: 'Pasien tidak ditemukan.',
        });
      }
    },
  });
  // Hook untuk mencari kunjungan aktif rawat inap pasien
  const {
    isLoadingKunjungan,
    data: kunjunganAktifRawatInap,
    status,
  } = useKunjunganAktifRawatInap(pasien?.id, {
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        if (data.length === 0) {
          messageBox({
            title: 'Info',
            message: 'Kunjungan rawat inap pasien tidak ditemukan.',
          });
        } else {
          if (data.length === 1) {
            methods.reset({
              norm: pasien.norm,
              nama: pasien.nama,
              jenis_kelamin: pasien.jenis_kelamin?.nama,
              nama_ortu: pasien.nama_ortu,
              alamat: pasien.alamat,
            });
            dispatch(selectKunjungan({ ...data[0], ...pasien }));
          } else if (data.length > 1) {
            messageBox({
              title: 'Info',
              message: 'Kunjungan rawat inap pasien tidak valid.',
            });
          }
        }
      }
    },
  });
  // Format data jika kunjungan aktif cuman satu
  const formattedKunjunganAktifRawatInap = useMemo(() => {
    if (
      status === 'loading' ||
      status === 'error' ||
      !kunjunganAktifRawatInap
    ) {
      return {};
    }
    if (
      Array.isArray(kunjunganAktifRawatInap) &&
      kunjunganAktifRawatInap.length === 1
    ) {
      const selected = kunjunganAktifRawatInap[0];
      // Hitung umur jika sudah pulang diambil dari tgl pulang
      const tglSelesai = selected.st_pulang
        ? selected.tgl_pulang
        : selected.tgl_sekarang;
      selected.umur = utils.displayAge(pasien?.tgl_lahir, tglSelesai);
      return selected;
    }
    return {};
  }, [status, kunjunganAktifRawatInap, pasien]);
  const onSubmit = useCallback((values) => {
    setNorm(values.norm);
  }, []);
  const enterNormHanlder = useCallback((e) => {
    if (e.which === 13) {
      e.preventDefault();
      formRef.current.handleSubmit();
    }
  }, []);

  // useEffect(() => {
  //   if (pasien) {
  //     methods.reset({
  //       norm: pasien.norm,
  //       nama: pasien.nama,
  //       jenis_kelamin: pasien.jenis_kelamin?.nama,
  //       nama_ortu: pasien.nama_ortu,
  //       alamat: pasien.alamat,
  //     });
  //   }
  // }, [pasien, methods.reset]);

  useEffect(() => {
    if (!selectedKunjungan.id && statusForm === ready.type) {
      methods.reset({
        norm: '',
        nama: '',
        jenis_kelamin: '',
        nama_ortu: '',
        alamat: '',
      });
      setNorm('');
    }
  }, [selectedKunjungan, methods.reset, statusForm, ready]);

  const focusNormHandler = useCallback((e) => {
    if (e.target.value) {
      e.target.select();
    }
  }, []);

  React.useEffect(() => {
    if (focusElement === 'norm' && !methods.getValues('norm')) {
      inputRef.norm.current.focus();
    }
  }, [focusElement, methods.getValues, inputRef.norm]);

  return (
    <FormProvider {...methods}>
      <Form
        size="mini"
        onSubmit={methods.handleSubmit(onSubmit)}
        ref={formRef}
        loading={isLoading}
      >
        <Segment
          size="mini"
        >
          <Divider horizontal className="my-0">
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
                        onKeyDown={enterNormHanlder}
                        disabled={isDisabledNorm}
                        // value={norm}
                        // onChange={onChangeInput}
                        onFocus={focusNormHandler}
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>{t('no_billing')}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input name="kode_kunjungan_unit" disabled value={selectedKunjungan.name || ''} />
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
                      <Header as="h4" color="grey" style={{ marginTop: 3 }}>
                        {formattedKunjunganAktifRawatInap?.umur}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('nama_ortu')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input name="nama_ortu" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('alamat')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input name="alamat" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  {!_.isEmpty(formattedKunjunganAktifRawatInap) && (
                    <Grid.Row className="form-row">
                      <Grid.Column
                        width="16"
                        className="field"
                        textAlign="right"
                      >
                        <Header as="h3" color="green" style={{ marginTop: 3 }}>
                          {formattedKunjunganAktifRawatInap.st_pulang
                            ? t('kunjungan_selesai')
                            : t('kunjungan_aktif')}{' '}
                          -{' '}
                          {formattedKunjunganAktifRawatInap.nama_status_pasien}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  )}
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
