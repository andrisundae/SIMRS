import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CariTindakan from '../components/CariTindakan';
import { postSelector, showCariTindakanSelector } from '../redux/selector';
import { staticConst } from '../../index/static';

const CariTindakanContainer = ({resource, t}) => {
  const post = useSelector(postSelector);
  const show = useSelector(showCariTindakanSelector);

  return (
    <CariTindakan
      name={staticConst.TABLE_SEARCH_TINDAKAN}
      show={show}
      loadData={() => {}}
      resource={resource}
      t={t}
    />
  );
}

export default CariTindakanContainer;