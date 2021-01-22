import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';
import DetailUmum from './DetailUmum';
import DetailPenunjang from './DetailPenunjang';

export default function Content({ type }) {
  return (
    <div className="col-start-2 col-span-full py-4 px-6 overflow-y-auto">
      {'umum' === type && <DetailUmum />}
      {'penunjang' === type && <DetailPenunjang />}
    </div>
  );
}
