import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useSWR from 'swr';
import PullRelease from '@simrs/components/src/PullRelease';
import fetcher from '../fetcher/fetcher';
import LoaderWithNoDimmer from '../component/LoaderWithNoDimmer';

const INIT = 'Inisialisasi';
const CHECK_CONNECTION = 'Cek koneksi ke server';
const CONNECTION_FAILED = 'Koneksi ke server gagal';
const CONNECTION_SUCCESS = 'Koneksi ke server berhasil';

export default function Login() {
  const history = useHistory();
  const [status, setStatus] = useState(INIT);
  const { data, error } = useSWR(
    localStorage.getItem('config.apiUrl') ? '/' : null,
    fetcher
  );

  useEffect(() => {
    if (null === localStorage.getItem('config.apiUrl')) {
      history.replace('/set-api-url');
    } else {
      setStatus(CHECK_CONNECTION);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      setStatus(CONNECTION_FAILED);
    } else {
      if (data) {
        setStatus(CONNECTION_SUCCESS);
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (CONNECTION_SUCCESS === status) {
      history.replace('/login');
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <div className="fixed w-full" style={{ height: 'calc(100% - 3rem)' }}>
      <LoaderWithNoDimmer>
        <PullRelease
          onEndDrag={() => {
            history.replace('/set-api-url');
          }}
        >
          {status}
        </PullRelease>
      </LoaderWithNoDimmer>
    </div>
  );
}
