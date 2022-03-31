import React, { useMemo } from 'react';
import { staticConst } from '../../static';

function KeteranganKelasPasien({
  kelas,
  penjaminPasien,
  hakKelas,
  penjaminId,
}) {
  const renderDetailStatusPasien = useMemo(() => {
    let desc = '';
    if (penjaminId === staticConst.ID_PENJAMIN_UMUM) {
      desc = `${penjaminPasien} | RUMAH SAKIT : KELAS ${kelas}`;
    } else {
      desc = `${penjaminPasien} : HAK KELAS ${hakKelas} | RUMAH SAKIT : KELAS ${kelas}`;
    }

    return <div>{desc}</div>;
  }, [hakKelas, kelas, penjaminId, penjaminPasien]);

  // if (!selectedKunjungan.id) {
  //   return null;
  // }

  return (
    <span className="text-sm w-100 text-gray-500 uppercase">
      {renderDetailStatusPasien}
    </span>
  );
}

export default KeteranganKelasPasien;
