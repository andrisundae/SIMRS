import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Header } from 'semantic-ui-react';

import { selectedKunjunganSelector } from '../../redux/reducer/selector';
import { staticConst } from '../../static';

function KeteranganKelasPasien() {
  const selectedKunjungan = useSelector(selectedKunjunganSelector);
  const renderDetailStatusPasien = useMemo(() => {
    if (!selectedKunjungan.id) {
      return null;
    }

    let desc = '';
    if (selectedKunjungan.id_penjamin === staticConst.ID_PENJAMIN_UMUM) {
      desc = `Pasien ${selectedKunjungan.nama_status_pasien}, Kelas RS ${selectedKunjungan.nama_kelas}`;
    } else {
      desc = `Pasien ${selectedKunjungan.nama_status_pasien} Hak Kelas ${selectedKunjungan.nama_hak_kelas} | Kelas RS ${selectedKunjungan.nama_kelas}`;
    }

    return <Header as="h5">{desc}</Header>;
  }, [selectedKunjungan]);

  return <div>{renderDetailStatusPasien}</div>;
}

export default KeteranganKelasPasien;
