import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextArea, Modal, Icon, Form, Grid } from 'semantic-ui-react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  useModuleTrans,
  CancelButton,
  SaveButton,
  Input,
  ReactSelect,
  DatePickerHF,
  TimePickerHF,
  CheckboxHF,
} from '@simrs/components';
// import { useKunjunganAktifRawatInap } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';
import TreePermintaanLayananPenunjang from './TreePermintaanLayananPenunjang';

const FormPermintaanPenunjang = ({
  innerRef,
  onRowSelected,
  show,
  onHide,
  idPasien,
}) => {
  const methods = useForm();
  const [showTree, setShowTree] = useState(false);
  const t = useModuleTrans();

  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      style={{ width: 500 }}
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('tambah_permintaan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 px-5 pb-8 shadow-lg">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid>
              <Grid.Row className="py-1 flex items-center">
                <Grid.Column width="5" className="-top-1">
                  <label>{t('tanggal')}</label>
                </Grid.Column>
                <Grid.Column width="6">
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
              <Grid.Row className="py-1 flex items-center">
                <Grid.Column width="5" className="-top-1">
                  <label>{t('unit_layanan')}</label>
                </Grid.Column>
                <Grid.Column width="11">
                  <ReactSelect
                    name="unit_layanan_id"
                    placeholder={t('unit_layanan')}
                    options={[]}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-1">
                <Grid.Column width="5" className="-top-1">
                  <label>{t('kelas')}</label>
                </Grid.Column>
                <Grid.Column width="11">
                  <ReactSelect
                    name="kelas_id"
                    placeholder={t('kelas')}
                    options={[]}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-1 flex items-center">
                <Grid.Column width="5" className="-top-1">
                  <label>{t('yang_meminta')}</label>
                </Grid.Column>
                <Grid.Column width="11">
                  <ReactSelect
                    name="dpjp_asal_id"
                    placeholder={t('yang_meminta')}
                    options={[]}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-1 flex items-center">
                <Grid.Column width="5" className="-top-1">
                  <label>{t('dx')}</label>
                </Grid.Column>
                <Grid.Column width="11">
                  <ReactSelect
                    name="dx_id"
                    placeholder={t('dx')}
                    options={[]}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-1 flex items-center">
                <Grid.Column width="5" className="-top-1">
                  {''}
                </Grid.Column>
                <Grid.Column width="11">
                  <CheckboxHF
                    name="st_cito"
                    label={t('st_cito')}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton onClick={() => setShowTree(true)} />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
      <TreePermintaanLayananPenunjang
        show={showTree}
        onHide={() => setShowTree(false)}
      />
    </Modal>
  );
};

FormPermintaanPenunjang.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormPermintaanPenunjang innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
