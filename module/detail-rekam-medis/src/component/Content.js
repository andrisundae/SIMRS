import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';
import DetailUmum from './DetailUmum';
import DetailPenunjang from './DetailPenunjang';

export default function Content({
  activeMenu = 'info-pasien',
  umum = false,
  penunjang = false,
}) {
  function renderContent() {
    switch (activeMenu) {
      case 'cppt':
        return <div>ke modul CPPT</div>;

      case 'pengkajian-khusus':
        return <div>ke modul Pengkajian Khusus</div>;

      case 'dokumen':
        return <div>ke modul Dokumen</div>;

      default:
        return (
          <Fragment>
            {umum && <DetailUmum />}
            {penunjang && <DetailPenunjang />}
          </Fragment>
        );
    }
  }

  return (
    <Segment
      style={{
        minHeight: 'calc(100vh - 80px)',
        width: 'calc(100% - 350px)',
      }}
    >
      {renderContent()}
    </Segment>
  );
}
