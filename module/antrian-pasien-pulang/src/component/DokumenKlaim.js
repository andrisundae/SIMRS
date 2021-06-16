import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Message,
  Header,
  Divider,
  Table,
  Input,
  Dropdown,
  Button,
} from 'semantic-ui-react';
import Dokumen from '@module/dokumen';

export default function DokumenKlaim() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return (
    <div className="mx-6 my-4">
      <Message
        className="font-bold bg-blue-500 text-white"
        content={`(${query.get('norm')}) ${query.get('pasien')} / ${query.get(
          'jenis_kelamin'
        )}, ${query.get('tempat_layanan')}`}
      />
      <Dokumen only={['dokumen_krs']} />
    </div>
  );
}
