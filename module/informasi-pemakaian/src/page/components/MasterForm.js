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
import { Grid, Form, Segment, Button, Icon, Header } from 'semantic-ui-react';
import { Input, DatePickerHF, ReactSelect } from '@simrs/components';
import { useModuleTrans, messageBox } from '@simrs/components';

import { useInformasiUnitFarmasi } from '@simrs/farmasi/src/fetcher/UnitFarmasi';

import {
  focusElementSelector,
  moduleFilter,
} from '../../redux/reducer/selector';

import { openModal, closeModal } from '../../redux/reducer';
import CariTransaksi from './CariTransaksi';

function MasterForm() {
  const t = useModuleTrans();
  const dispatch = useDispatch();

  const focusElement = useSelector(focusElementSelector);
  const filter = useSelector(moduleFilter);
  const { data } = useInformasiUnitFarmasi();

  const unitFarmasi = useMemo(() => {
    console.log('memo', data);
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

  console.log(unitFarmasi);

  const showMasterModal = useMemo(() => {
    return filter.modalMaster.show;
  }, [filter.modalMaster.show]);

  const inputRef = {
    noTransaksi: useRef(),
    tglransaksi: useRef(),
    selectUnit: useRef(),
  };
  const methods = useForm();

  useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        switch (focusElement) {
          default:
            inputRef[focusElement].current.focus();
            break;
        }
      }
    }
  }, [focusElement]);

  const onSearch = useCallback((val) => dispatch(openModal(val)), [
    dispatch,
    openModal,
  ]);

  return (
    <FormProvider {...methods}>
      <Form size="mini">
        <Segment size="mini">
          <Grid columns="3" className="mb-1 mt-2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('No. Transaksi')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input
                        ref={inputRef.noTransaksi}
                        name="no_transaksi"
                        value={''}
                        disabled={false}
                        readOnly={true}
                        action={{
                          icon: 'search',
                          onClick: () => onSearch('modalMaster'),
                          color: 'blue',
                          type: 'button',
                          disabled: false,
                        }}
                        onKeyDown={(e) => {
                          if ('Enter' === e.key) {
                            onSearch('pemesanan_modal');
                          }
                        }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('Tanggal')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <DatePickerHF
                        name="tanggal"
                        rules={{ required: 'Harus diisi' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t('Unit Penerima')}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <ReactSelect
                        ref={inputRef.selectUnit}
                        name="unit-penerima"
                        placeholder={t('Unit Penerima')}
                        options={[]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
      {showMasterModal && (
        <CariTransaksi
          // resource={resource}
          // generateSelectedValue={generateSelectedValue}
          t={t}
          isShow={showMasterModal}
        />
      )}
    </FormProvider>
  );
}

export default MasterForm;
