import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';

import { selectedKunjunganSelector } from '../../redux/reducer/selector';
import { staticConst } from '../../static';

function KeteranganKelasPasien() {
  // const selectedKunjungan = useSelector(selectedKunjunganSelector);
  // const renderDetailUnitLayanan = useMemo(() => {
  //   if (!selectedKunjungan.id) {
  //     return null;
  //   }

  //   return (
  //     <div className="">
  //       {`Jenis layanan : ${selectedKunjungan.nama_instalasi}, Unit layanan : ${selectedKunjungan.nama_unit_layanan}`}
  //     </div>
  //   );
  // }, [selectedKunjungan]);

  // const renderDetailStatusPasien = useMemo(() => {
  //   if (!selectedKunjungan.id) {
  //     return null;
  //   }

  //   let desc = '';
  //   if (selectedKunjungan.id_penjamin === staticConst.ID_PENJAMIN_UMUM) {
  //     desc = `Pasien ${selectedKunjungan.nama_status_pasien}, Kelas RS ${selectedKunjungan.nama_kelas}`;
  //   } else {
  //     desc = `Pasien ${selectedKunjungan.nama_status_pasien} Hak Kelas ${selectedKunjungan.nama_hak_kelas} | Kelas RS ${selectedKunjungan.nama_kelas}`;
  //   }

  //   return <div>{desc}</div>;
  // }, [selectedKunjungan]);

  // if (!selectedKunjungan.id) {
  //   return null;
  // }

  return (
    <div className="flex items-center justify-between text-base mt-0 mb-2 font-semibold">
      {/* {renderDetailUnitLayanan} */}
      <span className="text-sm w-100 text-gray-500">BPJS KESEHATAN : HAK KELAS 3 | RUMAH SAKIT : KELAS 3</span>
      <div className="">
        <Button onClick={() => {}} size="mini">
          {/* <Icon name="folder open outline" /> */}
          Dipublikasi
        </Button>
        <Button onClick={() => {}} size="mini">
          {/* <Icon name="pills" /> */}
          Permintaan Obat
        </Button>
        <Button onClick={() => {}} size="mini">
          {/* <Icon name="bullhorn" /> */}
          Permintaan Penunjang
        </Button>
        <Button onClick={() => {}} size="mini">
          {/* <Icon name="check" /> */}
          Penuhi Semua Permintaan
        </Button>
        {/* <Button onClick={() => {}}>
          <Icon name="pills" /> Permintaan Obat
        </Button>
        <Button onClick={() => {}}>
          <Icon name="bullhorn" /> Permintaan Penunjang
        </Button>
        <Button onClick={() => {}}>
          <Icon name="check" /> Penuhi Semua Permintaan
        </Button> */}
      </div>
    </div>
  );
}

export default KeteranganKelasPasien;
