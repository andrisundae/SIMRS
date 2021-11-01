import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Segment,
  Header,
  Divider,
  Icon,
  Button,
  Table,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function DokumenAdministrasiContainer() {
  const history = useHistory();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fragment>
      <Header className="text-lg">Dokumen</Header>
      <Divider />
    </Fragment>
  );
}
