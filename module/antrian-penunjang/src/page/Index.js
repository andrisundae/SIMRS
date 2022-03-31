import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useDebounceValue } from '@simrs/components/src/hook';
import { useAppState } from '@simrs/components';
import Filter from './components/Filter';
import List from './components/List';
import { openForm } from '../redux/reducer';

function Index() {
  const dispatch = useDispatch();
  const { resource } = useAppState();
  const [params, setParams] = useState({
    instalasi_id: '',
    unit_layanan_id: '',
    penjamin_id: '',
    id_dokter_tujuan_penunjang: '',
    nama_pasien: '',
    norm: '',
  });

  useEffect(() => {
    dispatch(openForm({ resource }));
  }, [dispatch, resource]);

  const debouncedNamaPasien = useDebounceValue(params.nama_pasien, 500);
  const debouncedNorm = useDebounceValue(params.norm, 500);

  const submitFilterHandler = useCallback((values) => {
    const newParams = {
      nama_pasien: values.nama_pasien,
      norm: values.norm,
      instalasi_id: !_.isEmpty(values.instalasi_id)
        ? values.instalasi_id.value
        : '',
      unit_layanan_id: !_.isEmpty(values.unit_layanan_id)
        ? values.unit_layanan_id.value
        : '',
      id_dokter_tujuan_penunjang: !_.isEmpty(values.id_dokter_tujuan_penunjang)
        ? values.id_dokter_tujuan_penunjang.value
        : '',
      penjamin_id: !_.isEmpty(values.penjamin_id)
        ? values.penjamin_id.value
        : '',
    };
    setParams(newParams);
  }, []);

  const formattedParams = useMemo(() => {
    return {
      ...params,
      nama_pasien: debouncedNamaPasien,
      norm: debouncedNorm,
    };
  }, [debouncedNamaPasien, debouncedNorm, params]);
  return (
    <>
      <Header title="Daftar Antrian Penunjang" icon="list" />
      <Content>
        <Filter onSubmit={submitFilterHandler} />
        <div className="mt-3 mb-2">
          <List params={formattedParams} />
        </div>
      </Content>
    </>
  );
}

export default Index;
