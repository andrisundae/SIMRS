import React from 'react';
import { useSelector } from 'react-redux';

// import Summary from '../components/Summary';
import { TagihanPasien } from '@simrs/billing/src/Components';
import { summarySelector } from '../redux/selector';

const SummaryContainer = () => {
  const summary = useSelector(summarySelector);

  return (
    <TagihanPasien
      keringanan={summary.keringanan}
      bayar={summary.bayar}
      pengembalian={summary.pengembalian}
      biaya={summary.biaya}
    />
  );
  // return <Summary data={summary} />;
};

export default React.memo(SummaryContainer);
