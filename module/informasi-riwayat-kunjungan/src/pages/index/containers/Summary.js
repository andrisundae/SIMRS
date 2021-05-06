import React from 'react';
import { useSelector } from 'react-redux';

import Summary from '../components/Summary';
import { summarySelector } from '../redux/selector';

const SummaryContainer = () => {
  const summary = useSelector(summarySelector);
  return <Summary data={summary} />;
};

export default React.memo(SummaryContainer);
