import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Modal, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { useForm, FormProvider } from 'react-hook-form';
import { useModuleTrans, CancelButton, SaveButton } from '@simrs/components';
import { formatter } from '@simrs/common';
import { useInitPermintaanPenunjang } from '@simrs/billing/src/fetcher/penunjang';
import TreePermintaanLayananPenunjang from '../components/TreePermintaanLayananPenunjang';
import FormPermintaanPenunjang from '../components/FormPermintaanPenunjang';
import { savePermintaan, resetPostPermintaan } from '../../redux/slice';

const Create = ({ innerRef, show }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  // const methods = useForm();
  const [showTree, setShowTree] = useState(false);
  const t = useModuleTrans();
  const formRef = useRef();

  const { data: init } = useInitPermintaanPenunjang(params.idKunjunganUnit);

  // Untuk mentrigger form biar submit
  const submitTriggerHandler = useCallback(() => {
    formRef.current.handleSubmit();
  }, []);

  const hideTreeHandler = useCallback(() => {
    setShowTree(false);
    dispatch(resetPostPermintaan());
  }, [dispatch]);

  const submitHandler = useCallback(
    (values) => {
      const jam = dayjs(values.jam).format('HH:mm');
      const tanggal = formatter.dateFormatDB(
        values.tanggal,
        `YYYY-MM-DD ${jam}:ss`
      );
      dispatch(
        savePermintaan({
          id_kunjungan_unit: params.idKunjunganUnit,
          tanggal,
          id_kelas: init?.kunjungan_unit?.id_kelas,
          tgl_lahir: formatter.dateFormatDB(init?.kunjungan_unit?.tgl_lahir),
          id_diagnosa: values.id_diagnosa.value,
          id_dokter_peminta_penunjang: values.id_dokter_peminta_penunjang.value,
          id_dokter_tujuan_penunjang: values.id_dokter_tujuan_penunjang.value,
          id_unit_layanan: values.id_unit_layanan.value,
          id_instalasi: values.id_unit_layanan.id_instalasi,
          st_cito: values.st_cito || 0,
        })
      );
      setShowTree(true);
    },
    [dispatch, init, params.idKunjunganUnit]
  );

  const clickBackHandler = useCallback(() => {
    if (history.length > 0) {
      history.goBack();
    } else {
      history.go(
        `/billing/transaksi/penunjang/permintaan/${params?.idKunjunganUnit}`
      );
    }
  }, [history, params.idKunjunganUnit]);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={clickBackHandler}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      // style={{ width: 500 }}
      size="tiny"
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('tambah_permintaan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 px-5 pb-8 shadow-lg">
        <FormPermintaanPenunjang
          kunjunganUnit={init?.kunjungan_unit}
          unitLayanan={init?.unit_layanan}
          dokterPeminta={init?.dokter_peminta}
          diagnosa={init?.diagnosa}
          ref={formRef}
          onSubmit={submitHandler}
        />
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton onClick={submitTriggerHandler} />
          <CancelButton onClick={clickBackHandler} />
        </div>
      </Modal.Actions>
      {showTree && (
        <TreePermintaanLayananPenunjang
          show={showTree}
          onHide={hideTreeHandler}
          data={[]}
        />
      )}
    </Modal>
  );
};

Create.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <Create innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
