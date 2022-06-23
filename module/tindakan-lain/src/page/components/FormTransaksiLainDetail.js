import React, { useRef, useCallback, useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import dayjs from 'dayjs';
import {
  useModuleTrans,
  DatePickerHF,
  TimePickerHF,
  useAppAction,
} from '@simrs/components';
// import { formatter, toastr } from '@simrs/common';
// import {
//   useCreatePenunjangDetail,
//   useEditPenunjangDetail,
// } from '@simrs/billing/src/fetcher/penunjang';
import { Input } from '@simrs/components';
// import { TagihanPasien } from '@simrs/billing/src/Components';
import {
  selectedSelector,
  disabledElement,
  statusFormSelector,
  focusElementSelector,
} from '../index/redux/selectors';
// import {
//   add,
//   edit,
//   select,
//   showLoader,
//   hideLoader,
//   cancel,
// } from '../index/redux/slice';
// import CariTindakan from '../components/CariTindakan';
// import FooterActions from '../components/FooterActions';
// import PelaksanaSelector from '../components/PelaksanaSelector';

function FormTransaksiLainDetail({ innerRef }) {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const appActions = useAppAction();

  const [showCariTindakan, setShowCariTindakan] = useState(false);

  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form-transaksi-lain-detail')
  );
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const focusElement = useSelector(focusElementSelector);
  const methods = useForm({
    defaultValues: {
      jumlah: 0,
      biaya: 0,
      total_biaya: 0,
      total_biaya_penunjang: 0,
    },
  });
  const inputRef = {
    kode_panggil: useRef(),
  };

  return (
    <FormProvider {...methods}>
      <Form
        id="form-transaksi-lain-detail"
        size="mini"
        // onSubmit={methods.handleSubmit(submitHandler)}
        ref={innerRef}
      >
        <Grid columns="2" className="mt-3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3" className="">
                    <label>{t('nama')}</label>
                  </Grid.Column>
                  <Grid.Column width="13" className="">
                    <Input
                      name="nama"
                      ref={inputRef.nama}
                      // onKeyDown={keyDownKodePanggilHandler}
                      disabled={disabledInput}
                      rules={{ required: 'Harus diisi' }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3" className="">
                    <label>{t('layanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="13" className="">
                    <Input
                      name="layanan"
                      ref={inputRef.layanan}
                      // onKeyDown={keyDownKodePanggilHandler}
                      disabled={disabledInput}
                      rules={{ required: 'Harus diisi' }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3">
                    <label>{t('keterangan')}</label>
                  </Grid.Column>
                  <Grid.Column width="13">
                    <Input name="keterangan" disabled={disabledInput} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('jumlah')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="jumlah" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('tarif')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="tarif" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('total')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Input name="total" disabled />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormProvider>
  );
}

FormTransaksiLainDetail.propTypes = {
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormTransaksiLainDetail innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
