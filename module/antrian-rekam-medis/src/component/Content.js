import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { Segment } from 'semantic-ui-react';
import DetailUmum from './DetailUmum';
import DetailPenunjang from './DetailPenunjang';

export default function Content({ umum = false, penunjang = false }) {
  return (
    <Segment
      style={{
        minHeight: 'calc(100vh - 80px)',
        width: 'calc(100% - 350px)',
      }}
    >
      <Fragment>
        {umum && <DetailUmum />}
        {penunjang && <DetailPenunjang />}
      </Fragment>
    </Segment>
  );
}
