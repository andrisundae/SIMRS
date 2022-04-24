import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Grid, Input } from 'semantic-ui-react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  useModuleTrans,
  ReactSelect,
  DatePickerHF,
  TimePickerHF,
  CheckboxHF,
} from '@simrs/components';
import DokterTujuanSelector from './DokterTujuanSelector';
import {
  statusFormSelector,
  focusElementSelector,
} from '../permintaan/redux/selectors';
import {
  add,
  edit,
  focusElement as focusElementAction,
} from '../permintaan/redux/slice';

const now = dayjs();

const FormPermintaanPenunjang = ({
  innerRef,
  data,
  unitLayanan,
  kunjunganUnit,
  dokterPeminta,
  onSubmit,
  diagnosa,
  isAdd,
}) => {
  const dispatch = useDispatch();
  const inputRef = {
    id_unit_layanan: useRef(),
    id_dokter_peminta_penunjang: useRef(),
    id_dokter_tujuan_penunjang: useRef(),
    id_diagnosa: useRef(),
    st_cito: useRef(),
  };
  const statusForm = useSelector(statusFormSelector);
  const focusElement = useSelector(focusElementSelector);
  const findDiagnosa = useMemo(() => {
    return data && Array.isArray(diagnosa)
      ? diagnosa.find((row) => row.value === data?.id_diagnosa)
      : undefined;
  }, [data, diagnosa]);

  const defaultValues = useMemo(() => {
    return {
      tanggal: now.toDate(),
      jam: now.toDate(),
      id_dokter_peminta_penunjang: data
        ? {
            label: data.nama_dokter_peminta_penunjang,
            value: data.id_dokter_peminta_penunjang,
          }
        : undefined,
      id_dokter_tujuan_penunjang: data
        ? {
            label: data.nama_dokter_tujuan_penunjang,
            value: data.id_dokter_tujuan_penunjang,
          }
        : undefined,
      id_diagnosa: data ? findDiagnosa : undefined,
      id_unit_layanan: data
        ? {
            label: data.nama_unit_layanan,
            value: data.unit_layanan_id,
            id_instalasi: data.instalasi_id,
          }
        : undefined,
      st_cito: data ? data.st_cito : 0,
    };
  }, [data, findDiagnosa]);
  const { reset, ...methods } = useForm({
    defaultValues,
  });
  const t = useModuleTrans();

  useEffect(() => {
    if (data?.id && !_.isEmpty(findDiagnosa)) {
      reset(defaultValues);
    }
  }, [data, findDiagnosa, reset, defaultValues]);

  // Effect untuk focus element
  useEffect(() => {
    if (statusForm === add.type || statusForm === edit.type) {
      if (focusElement) {
        if (!_.isEmpty(inputRef[focusElement]?.current)) {
          inputRef[focusElement]?.current.focus();
        }
      }
    }
  }, [focusElement, inputRef, statusForm]);

  const onFocusElement = (e, name) => {
    e.preventDefault();
    dispatch(focusElementAction({ focusElement: name }));
  };

  const submitErrorHandler = useCallback((errors) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys[0]) {
      dispatch(focusElementAction({ focusElement: errorKeys[0] }));
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <Form
        ref={innerRef}
        onSubmit={methods.handleSubmit(onSubmit, submitErrorHandler)}
      >
        <Grid>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              <label>{t('tanggal')}</label>
            </Grid.Column>
            <Grid.Column width="6">
              <DatePickerHF
                name="tanggal"
                rules={{ required: 'Harus diisi' }}
                disabled
              />
            </Grid.Column>
            <Grid.Column width="1" className="">
              <label>{t('jam')}</label>
            </Grid.Column>
            <Grid.Column width="4">
              <TimePickerHF
                name="jam"
                rules={{ required: 'Harus diisi' }}
                disabled
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              <label>{t('unit_layanan')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="id_unit_layanan"
                placeholder={t('unit_layanan')}
                options={unitLayanan || []}
                rules={{ required: 'Silahkan pilih unit layanan' }}
                isDisabled={!isAdd}
                inputRef={inputRef.id_unit_layanan}
                onKeyDown={(e) =>
                  onFocusElement(e, 'id_dokter_peminta_penunjang')
                }
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1">
            <Grid.Column width="5" className="">
              <label>{t('kelas')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <Input fluid disabled value={kunjunganUnit?.kelas?.nama || ''} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              <label>{t('yang_meminta')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="id_dokter_peminta_penunjang"
                placeholder={t('yang_meminta')}
                options={dokterPeminta || []}
                rules={{ required: 'Silahkan pilih dokter' }}
                inputRef={inputRef.id_dokter_peminta_penunjang}
                onKeyDown={(e) => onFocusElement(e, 'id_diagnosa')}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              <label>{t('dx')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <ReactSelect
                name="id_diagnosa"
                placeholder={t('pilih_dx')}
                options={diagnosa || []}
                rules={{ required: 'Silahkan pilih diagnosa' }}
                inputRef={inputRef.id_diagnosa}
                onKeyDown={(e) =>
                  onFocusElement(e, 'id_dokter_tujuan_penunjang')
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              <label>{t('dokter_tujuan')}</label>
            </Grid.Column>
            <Grid.Column width="11">
              <DokterTujuanSelector
                control={methods.control}
                rules={{ required: 'Silahkan pilih dokter' }}
                ref={inputRef.id_dokter_tujuan_penunjang}
                onKeyDown={(e) => onFocusElement(e, 'st_cito')}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-1 flex items-center">
            <Grid.Column width="5" className="">
              {''}
            </Grid.Column>
            <Grid.Column width="11">
              <CheckboxHF
                ref={inputRef.st_cito}
                name="st_cito"
                label={t('st_cito')}
                onKeyDown={(e) => onFocusElement(e, 'save')}
              />
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
  dokterPeminta: PropTypes.array,
  diagnosa: PropTypes.array,
  onSubmit: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormPermintaanPenunjang innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
