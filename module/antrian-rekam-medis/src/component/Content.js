import React from 'react';
import DetailUmum from './DetailUmum';
import DetailPenunjang from './DetailPenunjang';

export default function Content({ type }) {
  return (
    <div className="col-start-2 col-span-full p-4 overflow-y-auto">
      {'umum' === type && <DetailUmum />}
      {'penunjang' === type && <DetailPenunjang />}
    </div>
  );
}
