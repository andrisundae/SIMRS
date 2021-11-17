import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectedKunjunganSelector } from '../../redux/reducer/selector';
import { staticConst } from '../../static';

function KeteranganKelasPasien() {
  const selectedKunjungan = useSelector(selectedKunjunganSelector);
  const renderDetailUnitLayanan = useMemo(() => {
    if (!selectedKunjungan.id) {
      return null;
    }

    return (
      <div className="">
        {`Jenis layanan : ${
          selectedKunjungan.nama_instalasi
        }, Unit layanan : ${selectedKunjungan.nama_unit_layanan}`}
      </div>
    );
  }, [selectedKunjungan]);

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

    return <div>{desc}</div>;
  }, [selectedKunjungan]);

  if (!selectedKunjungan.id) {
    return null;
  }

  return (
    <div className="flex items-center justify-between text-base mt-0 font-semibold">
      {renderDetailUnitLayanan}
      {renderDetailStatusPasien}
    </div>
  );
}

export default KeteranganKelasPasien;
