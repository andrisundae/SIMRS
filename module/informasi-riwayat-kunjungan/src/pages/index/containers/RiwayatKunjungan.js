import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Divider, Tab } from 'semantic-ui-react';

import { useModuleState, useModuleTrans } from '@simrs/components';
// import IdentitasPasien from '../components/IdentitasPasien';
import RiwayatKunjungan from '../components/RiwayatKunjungan';
import RiwayatKunjunganUnit from '../components/RiwayatKunjunganUnit';
import RiwayatKunjunganUnitDetail from '../components/RiwayatKunjunganUnitDetail';
import { postSelector, selectedSelector } from '../redux/selector';
import { actions } from '../index';

const RiwayatKunjunganContainer = () => {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const { resource } = useModuleState();
  const post = useSelector(postSelector);
  const { kunjungan, kunjunganUnit } = useSelector(selectedSelector);
  const riwayatKunjunganRef = React.useRef();

  const dataSourceKunjungan = React.useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const payload = {
          length: 10,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          id_pasien: post.id,
        };
        dispatch(actions.loadRiwayatKunjungan(resource, payload, params));
      },
    };
  }, [post.id, dispatch, actions]);

  const dataSourceKunjunganUnit = React.useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const payload = {
          length: 10,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          id_kunjungan: kunjungan.id ? kunjungan.id : 0,
        };
        dispatch(actions.loadRiwayatKunjunganUnit(resource, payload, params));
      },
    };
  }, [kunjungan, dispatch, actions]);

  const dataSourceKunjunganUnitDetail = React.useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const payload = {
          length: 10,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          id_kunjungan_unit: kunjunganUnit.id ? kunjunganUnit.id : 0,
        };
        dispatch(
          actions.loadRiwayatKunjunganUnitDetail(resource, payload, params)
        );
      },
    };
  }, [kunjunganUnit, dispatch, actions]);

  const selectedKunjunganHandler = React.useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(actions.onSelectedKunjungan(resource, params.data));
      }
    },
    [actions, resource, dispatch]
  );

  const selectedKunjunganUnitHandler = React.useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(actions.onSelectedKunjunganUnit(resource, params.data));
      }
    },
    [actions, resource, dispatch]
  );

  const panes = [
    {
      menuItem: { key: 'layanan_billing', content: t('layanan_billing') },
      render: () => {
        return (
          <Tab.Pane attached="top" style={{ padding: 0 }}>
            <RiwayatKunjunganUnitDetail
              data={kunjunganUnit}
              dataSource={dataSourceKunjunganUnitDetail}
            />
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: { key: 'layanan_farmasi', content: t('layanan_farmasi') },
      render: () => {
        return (
          <Tab.Pane attached="top">
            <h2>Layanan Farmasi</h2>
          </Tab.Pane>
        );
      },
    },
  ];

  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column style={{ paddingRight: 7 }}>
                <Divider horizontal style={{ marginTop: -7, marginBottom: 7 }}>
                  {t('riwayat_kunjungan')}
                </Divider>
                <RiwayatKunjungan
                  ref={riwayatKunjunganRef}
                  dataSource={dataSourceKunjungan}
                  data={post}
                  onRowSelected={selectedKunjunganHandler}
                />
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: 7 }}>
                <Divider horizontal style={{ marginTop: -7, marginBottom: 7 }}>
                  {t('riwayat_kunjungan_unit')}
                </Divider>
                <RiwayatKunjunganUnit
                  data={kunjungan}
                  dataSource={dataSourceKunjunganUnit}
                  onRowSelected={selectedKunjunganUnitHandler}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: -7 }}>
        <Grid.Column>
          <Tab menu={{ attached: 'bottom' }} panes={panes} />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default React.memo(RiwayatKunjunganContainer);
