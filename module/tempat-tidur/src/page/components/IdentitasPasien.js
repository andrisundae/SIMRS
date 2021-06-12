import React, {useRef, useCallback, useState, useEffect} from 'react';
import { useForm, useController, useFormContext, FormProvider } from "react-hook-form";
import { Grid, Form, Input as SmInput, Segment, Divider, Header, Transition } from 'semantic-ui-react';
import { useModuleTrans } from '@simrs/components';
import { usePasienByNorm } from '@simrs/billing/src/fetcher';

const Input = React.forwardRef(({ name, rules = {}, ...props}, ref) => {
  const {control} = useFormContext();
  const {
    field: { ref: innerRef, ...inputProps },
    fieldState: {invalid, error}
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <Form.Field error={invalid}>
      <SmInput {...props} {...inputProps} ref={ref} />
      <Transition.Group animation="fade down" duration={300}>
        {invalid && (
          <div style={{ color: '#9f3a38', fontSize: '.85714286rem' }}>{error?.message}</div>
        )}
      </Transition.Group>
    </Form.Field>
  );
});

function IdentitasPasien({data={}}) {
  const t = useModuleTrans();
  const [norm, setNorm] = useState('');
  const methods = useForm();
  const inputRef = {
    norm: React.useRef(),
  };
  const formRef = useRef();
  // const watchNorm = methods.watch('norm', '');
  const { data: pasien, isLoading } = usePasienByNorm(norm);
  const onSubmit = (values) => {
    setNorm(values.norm);
    // console.log(inputRef.norm.current);
    // methods.setValue('kode_kunjungan_unit', values.norm);
  };
  const enterNormHanlder = useCallback((e) => {
    if (e.which === 13) {
      e.preventDefault();
      formRef.current.handleSubmit();
    }
  }, []);

  useEffect(() => {
    if (pasien) {
      methods.reset({
        norm: pasien.norm,
        nama: pasien.nama,
        jenis_kelamin: pasien.jenis_kelamin?.nama,
        nama_ortu: pasien.nama_ortu,
        alamat: pasien.alamat,
      });
    }
  }, [pasien, methods.reset]);

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
          style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}
        >
          <Divider horizontal style={{ marginTop: 0, marginBottom: 35 }}>
            {t('identitas_pasien')}
          </Divider>
          <Grid columns="2">
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
                        // disabled={isDisabledNorm}
                        // value={data.norm}
                        // onChange={onChangeInput}
                        // onFocus={(e) => {
                        //   if (e.target.value) {
                        //     e.target.select();
                        //   }
                        // }}
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>{t('no_billing')}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="kode_kunjungan_unit"
                        // ref={this.kode_kunjungan}
                        disabled
                        value={data.kode_kunjungan_unit}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nama')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="nama" disabled  />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('jenis_kelamin')}</label>
                    </Grid.Column>
                    <Grid.Column width="4" className="field">
                      <Input
                        name="jenis_kelamin"
                        disabled
                        value={data.jenis_kelamin}
                      />
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Header as="h4" color="grey" style={{ marginTop: 3 }}>
                        {data.umur}
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
                      <Input name="nama_ortu" disabled value={data.nama_ortu}  />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('alamat')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input name="alamat" disabled value={data.alamat}  />
                    </Grid.Column>
                  </Grid.Row>
                  {/* {data.id && (
                    <Grid.Row className="form-row">
                      <Grid.Column width="16" className="field" textAlign="right">
                        <Header as="h3" color="green" style={{ marginTop: 3 }}>
                          {data.st_pulang
                            ? t(getKey('kunjungan_selesai'))
                            : t(getKey('kunjungan_aktif'))}{' '}
                          - {data.nama_status_pasien}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  )} */}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {/* <Button>Test</Button> */}
      </Form>
    </FormProvider>
  )
}

export default IdentitasPasien
