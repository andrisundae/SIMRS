import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DetailUmum from './DetailUmum';
import DetailPenunjang from './DetailPenunjang';

export default function Content({ type }) {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(history.location.search);
  const kode = null !== query.get('kode') ? query.get('kode') : 'PK';
  const namaTempatLayanan =
    null !== query.get('nama_tempat_layanan')
      ? query.get('nama_tempat_layanan')
      : 'Lab. PK';

  return (
    <div className="col-start-2 col-span-full p-4 overflow-y-auto">
      {'umum' === type && <DetailUmum />}
      {'penunjang' === type && (
        <DetailPenunjang kode={kode} namaTempatLayanan={namaTempatLayanan} />
      )}
    </div>
  );
}
