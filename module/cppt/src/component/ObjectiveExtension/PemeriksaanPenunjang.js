import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
  Table,
  Select,
  TextArea,
} from 'semantic-ui-react';
import Penunjang from '@module/pemeriksaan-penunjang/src/page/Index';

export default function PemeriksaanPenunjang() {
  const history = useHistory();

  return (
    <Penunjang
      tableContainer={false}
      tableFixed={false}
      tableHeaderFixed={false}
      headerLess={true}
    />
  );
}
