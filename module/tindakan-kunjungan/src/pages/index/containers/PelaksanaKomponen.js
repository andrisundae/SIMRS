import React from 'react';
import { Grid, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useModuleTrans,
  SaveButton,
  CancelButton,
  useAppState,
} from '@simrs/components';
import { dataSelector } from '../redux/pelaksanaTambahan/selector';
import {
  postSelector as tindakanPostSelector,
  postItemSelector as tindakanDetailPostSelector,
  dataSelector as tindakanDataSelector,
  showModalPelaksanaKomponenSelector,
} from '../redux/selector';
import actions from '../redux/actions';
import PelaksanaKomponenTable from '../components/PelaksanaKomponenTable';

const PelaksanaKomponen = ({ show, onHide }) => {
  const trans = useModuleTrans();
  const { resource } = useAppState();
  const dispatch = useDispatch();
  const tableRef = React.useRef();
  const dataForm = useSelector(dataSelector);

  const detail = useSelector(tindakanDetailPostSelector);
  const data = useSelector(tindakanDataSelector);
  const showModal = useSelector(showModalPelaksanaKomponenSelector);
  const post = useSelector(tindakanPostSelector);

  const saveHandler = () => {
    const postPelaksanaKomponen = [];
    data.pelaksanaKomponen.forEach((row) => {
      const payload = {
        id_kunjungan_unit_detail: detail.id,
        id_kunjungan_unit: post.id_kunjungan_unit,
        id_komponen_tarif: row.id_komponen_tarif,
        id_pelaksana: row.id_pelaksana,
      };
      if (row.id) {
        payload.id = row.id;
      }
      postPelaksanaKomponen.push(payload);
    });
    dispatch(
      actions.savePelaksanaKomponen.request(resource, {
        list: postPelaksanaKomponen,
      })
    );
  };

  React.useEffect(() => {
    if (showModal) {
      dispatch(
        actions.getPelaksanaKomponen.request(resource, {
          id_kunjungan_unit_detail: detail.id,
        })
      );
    }
  }, [showModal, detail.id, dispatch, resource]);

  const changeSpesialisasiHandler = (value, row) => {
    dispatch(
      actions.onChangeSpesialisasi(resource, {
        id_spesialisasi: value,
        selected: row,
        id_unit_layanan: post.id_unit_layanan,
      })
    );
  };

  const getPelaksanaOptions = (row) => {
    dispatch(
      actions.getPelaksanaOptions.request(resource, {
        id_spesialisasi: row.id_spesialisasi,
        id_unit_layanan: post.id_unit_layanan,
        id_komponen_tarif: row.id_komponen_tarif,
      })
    );
  };

  return (
    <Modal
      closeIcon={<Icon name="close" color="black" />}
      dimmer="inverted"
      open={show}
      onClose={onHide}
      size="medium"
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name="user" />
        {trans('pelaksana_komponen')}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <PelaksanaKomponenTable
                data={dataForm}
                ref={tableRef}
                dataSource={data.pelaksanaKomponen}
                onChangeSpesialisasi={changeSpesialisasiHandler}
                onGetPelaksanaOptions={getPelaksanaOptions}
                // onRowSelected={selectedHandler}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions style={{ textAlign: 'left' }}>
        <SaveButton onClick={saveHandler} />
        <CancelButton onClick={onHide} />
      </Modal.Actions>
    </Modal>
  );
};

PelaksanaKomponen.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default PelaksanaKomponen;
