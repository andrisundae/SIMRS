import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import FormKonsul from '../components/FormKonsul';
import {
  disabledElement,
  postSelector,
  focusElementSelector,
  kunjunganSelector,
  selectedOptionSelector,
  kelompokSelector,
  unitLayananSelector,
  instalasiSelector,
  administrasiKonsulLoaderSelector,
  administrasiKonsulSelector,
} from '../redux/selector';
import { actions } from '../index';

const KonsulContainer = ({ t, resource }) => {
  const dispatch = useDispatch();
  const post = useSelector(postSelector);
  const kunjungan = useSelector(kunjunganSelector);
  const focusElement = useSelector(focusElementSelector);
  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form_konsul')
  );
  const selectedOption = useSelector(selectedOptionSelector);
  const kelompok = useSelector(kelompokSelector);
  const instalasi = useSelector(instalasiSelector);
  const unitLayanan = useSelector(unitLayananSelector);
  const administrasiKonsulLoader = useSelector(
    administrasiKonsulLoaderSelector
  );
  const administrasiKonsul = useSelector(administrasiKonsulSelector);

  const changeDatetimeHandler = (name, value) => {
    dispatch(actions.onChangeInputKonsul(resource, { value, name }));
  };

  const focusElementHandler = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      dispatch(actions.onFocusElement(resource, nameRef));
    }
  };

  const getInstalasi = React.useMemo(() => {
    let filterInstalasi = [];
    if (post.id_kelompok) {
      filterInstalasi = instalasi.filter(
        (row) => row.kelompok_id === post.id_kelompok
      );
    }
    return filterInstalasi;
  }, [post, instalasi]);

  const getUnitLayanan = React.useMemo(() => {
    let filterUnitLayanan = [];
    if (post.id_instalasi) {
      filterUnitLayanan = unitLayanan.filter(
        (row) => row.instalasi_id === post.id_instalasi
      );
    }
    return filterUnitLayanan;
  }, [post, unitLayanan]);

  const changeSelectHanlder = (name, selected, isTindakan = false) =>
    dispatch(actions.onChangeSelect2(resource, name, selected, isTindakan));

  return (
    <FormKonsul
      t={t}
      resource={resource}
      disabled={disabledInput}
      kunjungan={kunjungan}
      focusElement={focusElement}
      data={post}
      dataForm={{
        kelompok,
        instalasi: getInstalasi,
        unitLayanan: getUnitLayanan,
        administrasiKonsul: administrasiKonsul,
      }}
      selectedOption={selectedOption}
      onChangeSelect={changeSelectHanlder}
      onChangeDatetime={changeDatetimeHandler}
      onFocusElement={focusElementHandler}
      administrasiKonsulLoader={administrasiKonsulLoader}
    />
  );
};

KonsulContainer.propTypes = {
  t: PropTypes.func,
};

export default KonsulContainer;
