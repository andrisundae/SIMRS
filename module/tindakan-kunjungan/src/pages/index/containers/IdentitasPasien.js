import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import IdentitasPasien from '../components/IdentitasPasien';
import { actions, actionTypes } from '../index';
import {
  postSelector,
  focusElementSelector,
  disabledElement,
  statusFormSelector,
  showCariKunjunganSelector,
  isRequestingPaseinSelector,
  isFromAntrianSelector,
} from '../redux/selector';

const IdentitasPasienContainer = ({ t, resource }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const searchs = new URLSearchParams(location.search);
  const post = useSelector((state) => postSelector(state));
  const focusElement = useSelector((state) => focusElementSelector(state));
  const isDisabledNorm = useSelector((state) => disabledElement(state, 'norm'));
  const statusForm = useSelector(statusFormSelector);
  const showCariKunjungan = useSelector(showCariKunjunganSelector);
  const isRequestingPasien = useSelector(isRequestingPaseinSelector);
  const isFromAntrian = useSelector(isFromAntrianSelector);

  const norm = searchs.get('norm');
  // Cek jika dari antrian kunjungan, state diupdate dari antrian
  React.useEffect(() => {
    if (
      norm &&
      statusForm === actionTypes.READY &&
      !isFromAntrian &&
      !post.id_pasien
    ) {
      dispatch(actions.onToggleStatusFromAntrian(resource));
    }
  }, [norm, statusForm, isFromAntrian, post.id_pasien, dispatch, resource]);
  // Setelah itu isi norm dari antrian kunjungan
  React.useEffect(() => {
    if (isFromAntrian && statusForm === actionTypes.READY && !post.norm) {
      dispatch(
        actions.onChangeInputIdentitas(resource, { value: norm, name: 'norm' })
      );
    }
  }, [norm, statusForm, post, isFromAntrian, dispatch, resource]);
  // Cari data pasien berdasarkan norm antrian kunjungan
  React.useEffect(() => {
    if (
      isFromAntrian &&
      statusForm === actionTypes.READY &&
      post.norm &&
      !showCariKunjungan &&
      // !isRequestingPasien &&
      !post.id_pasien
    ) {
      dispatch(actions.getPasien.request(resource, { norm: post.norm }));
    }
  }, [
    statusForm,
    post,
    showCariKunjungan,
    // isRequestingPasien,
    isFromAntrian,
    dispatch,
    resource,
  ]);
  // Reset untuk tindakan kondisi normal
  React.useEffect(() => {
    if (
      norm &&
      statusForm === actionTypes.READY &&
      isFromAntrian &&
      post.id_pasien &&
      !isRequestingPasien
    ) {
      history.replace(`/billing/transaksi/tindakan?route=${resource}`);
      dispatch(actions.onToggleStatusFromAntrian(resource));
    }
  }, [
    statusForm,
    isFromAntrian,
    post.id_pasien,
    norm,
    isRequestingPasien,
    history,
    resource,
    dispatch,
  ]);

  const noRmKeyDownHandler = useCallback((e) => {
    if (e.which === 13) {
      e.preventDefault();
      if (e.target.value) {
        // history.replace(
        //   `/billing/transaksi/tindakan?route=${resource}&&norm=${e.target.value}`
        // );
        dispatch(actions.getPasien.request(resource, { norm: e.target.value }));
      }
    }
  }, []);
  const changeInputHandler = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(actions.onChangeInputIdentitas(resource, { value, name }));
  }, []);

  return (
    <IdentitasPasien
      t={t}
      resource={resource}
      onEnterNorm={noRmKeyDownHandler}
      data={post}
      focusElement={focusElement}
      isDisabledNorm={isDisabledNorm}
      onChangeInput={changeInputHandler}
    />
  );
};

IdentitasPasienContainer.propTypes = {
  t: PropTypes.func,
  resource: PropTypes.string,
};

export default IdentitasPasienContainer;
