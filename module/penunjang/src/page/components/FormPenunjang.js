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
import {
  Grid,
  Form,
  Segment,
  Divider,
  Header,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import {
  useModuleTrans,
  messageBox,
  ReactSelect,
  DatePickerHF,
  TimePickerHF,
} from '@simrs/components';
import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
import { TagihanPasien } from '@simrs/billing/src/Components';
import { selectedKunjunganSelector } from '../../redux/reducer/selector';

function FormPenunjang() {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const selectedKunjungan = useSelector(selectedKunjunganSelector);
  const methods = useForm();
  const inputRef = {
    norm: React.useRef(),
  };
  const formRef = useRef();
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <FormProvider {...methods}>
      <Form size="mini" onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Grid columns="2" className="mt-3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1 flex items-center">
                  <Grid.Column width="4" className="-top-1">
                    <label>{t('tanggal')}</label>
                  </Grid.Column>
                  <Grid.Column width="7">
                    <DatePickerHF
                      name="tanggal"
                      rules={{ required: 'Harus diisi' }}
                    />
                  </Grid.Column>
                  <Grid.Column width="1" className="-top-1">
                    <label>{t('jam')}</label>
                  </Grid.Column>
                  <Grid.Column width="4">
                    <TimePickerHF
                      name="jam"
                      rules={{ required: 'Harus diisi' }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="">
                    <label>{t('kode_panggil')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="">
                    <Input
                      name="kode_panggil"
                      // ref={inputRef.id_tindakan}
                      // onKeyDown={keyDownKodePanggilHandler}
                      action={{
                        content: 'Cari',
                        // onClick: onShowCariTindakan,
                        // disabled: disabled,
                        color: 'blue',
                        type: 'button',
                      }}
                      // disabled={disabled}
                      // value={data.kode_panggil}
                      // onChange={this.inputChangeHandler}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('kelompok')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="kelompok" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('nama_layanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="nama_layanan" disabled />
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
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('pelaksana')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <ReactSelect
                      name="pelaksana"
                      placeholder={t('pelaksana')}
                      options={[]}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('jumlah_tindakan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="jumlah_tindakan" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('biaya_per_tindakan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="biaya_per_tindakan" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('total_biaya')}</label>
                  </Grid.Column>
                  <Grid.Column width="7">
                    <Input name="total_biaya" disabled />
                  </Grid.Column>
                  <Grid.Column width="5" className="p-0 pl-4">
                    <Dropdown
                      text="Pelaksana"
                      icon="users"
                      floating
                      labeled
                      button
                      fluid
                      className="icon float-right mr-4"
                      style={{
                        paddingTop: 6,
                        paddingBottom: 6,
                        // marginRight: 7,
                      }}
                      direction="left"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          // onClick={onShowPelaksanaTambahan}
                          icon="user"
                          text={t('pelaksana_tambahan')}
                        />
                        <Dropdown.Item
                          // onClick={onShowPelaksanaKomponen}
                          icon="list"
                          text={t('pelaksana_komponen')}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1">
                  <Grid.Column width="4">
                    <label>{t('total_biaya_penunjang')}</label>
                  </Grid.Column>
                  <Grid.Column width="7">
                    <Input name="total_biaya_penunjang" disabled />
                  </Grid.Column>
                  <Grid.Column width="5" className="p-0 pl-4">
                    <Button
                      color="orange"
                      size="mini"
                      style={{ paddingTop: 6, paddingBottom: 6 }}
                      className="float-right mr-4"
                      onClick={() => {}}
                      fluid
                    >
                      <Icon name="sitemap" />
                      Tree
                    </Button>
                    {/* <Dropdown
                      text="Pelaksana"
                      icon="users"
                      floating
                      labeled
                      button
                      className="icon float-right mr-4"
                      style={{
                        paddingTop: 6,
                        paddingBottom: 6,
                        // marginRight: 7,
                      }}
                      direction="left"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          // onClick={onShowPelaksanaTambahan}
                          icon="user"
                          text={t('pelaksana_tambahan')}
                        />
                        <Dropdown.Item
                          // onClick={onShowPelaksanaKomponen}
                          icon="list"
                          text={t('pelaksana_komponen')}
                        />
                      </Dropdown.Menu>
                    </Dropdown> */}
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
      </Form>
    </FormProvider>
  );
}

export default FormPenunjang;
