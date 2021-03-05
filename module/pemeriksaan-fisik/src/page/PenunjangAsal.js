import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import IndexPenunjangAsal from '@module/pemeriksaan-penunjang/src/page/Index';

export default function PenunjangAsal() {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="mt-2">
      <IndexPenunjangAsal
        headerLess={true}
        onRowClick={(data) => {
          const query = new URLSearchParams();
          query.append('kode', data);

          history.push({
            pathname: '/penunjang-asal-detail',
            search: query.toString(),
          });
        }}
      />
    </div>
  );
}
