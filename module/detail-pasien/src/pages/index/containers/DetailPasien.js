import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { CariAlamat } from '@module/kunjungan/';
import { useModuleState } from '@simrs/components';
import FormDetailPasien from '../components/FormDetailPasien';
import {
  disabledElement,
  postSelector,
  focusElementSelector,
  dataSelector,
  selectedOptionSelector,
  filterWilayahSelector,
  datatableSelector,
} from '../redux/selector';
import { actions, staticConst } from '../index';

const DetailPasienContainer = () => {
  const dispatch = useDispatch();
  const { resource } = useModuleState();
  const post = useSelector(postSelector);
  const focusElement = useSelector(focusElementSelector);
  const disabledInput = useSelector((state) => disabledElement(state, 'form'));
  const selectedOption = useSelector(selectedOptionSelector);
  const dataForm = useSelector(dataSelector);
  const filterWilayah = useSelector(filterWilayahSelector);
  const datatables = useSelector(datatableSelector);
  const datatableWilayah = datatables[staticConst.TABLE_WILAYAH];
  const isDisabledNorm = useSelector((state) => disabledElement(state, 'norm'));

  const changeDatetimeHandler = (name, value) => {
    dispatch(actions.onChangeInput(resource, { value, name }));
  };

  const focusElementHandler = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      dispatch(actions.onFocusElement(resource, nameRef));
    }
  };

  const noRmKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      if (e.target.value) {
        dispatch(actions.getPasien.request(resource, { norm: e.target.value }));
      }
    }
  };
  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    dispatch(actions.onChangeInput(resource, { value, name }));
  };

  const changeSelectHanlder = (name, selected) =>
    dispatch(actions.onChangeSelect2(resource, name, selected));

  const toggleCariWilayahHandler = () =>
    dispatch(actions.toggleShowCariWilayah(resource));
  const selectedWilayahHandler = (data) =>
    dispatch(actions.onSelectedWilayah(resource, data));
  const submitFilterWilayahHandler = (_, data) =>
    dispatch(actions.onSubmitFilterWilayah(resource, data));
  const loadWilayahHandler = (_, data, tableParams) =>
    dispatch(actions.loadAllWilayah(resource, data, tableParams));

  return (
    <>
      <FormDetailPasien
        disabled={disabledInput}
        focusElement={focusElement}
        data={post}
        dataForm={dataForm}
        selectedOption={selectedOption}
        onChangeSelect={changeSelectHanlder}
        onChangeDatetime={changeDatetimeHandler}
        onFocusElement={focusElementHandler}
        onEnterNorm={noRmKeyDownHandler}
        isDisabledNorm={isDisabledNorm}
        onChangeInput={changeInputHandler}
        onToggleCariWilayah={toggleCariWilayahHandler}
      />
      {filterWilayah.show && (
        <CariAlamat
          show={filterWilayah.show}
          onHide={toggleCariWilayahHandler}
          onSelect={selectedWilayahHandler}
          data={filterWilayah}
          resource={resource}
          onSubmit={submitFilterWilayahHandler}
          onLoadData={loadWilayahHandler}
          isReloadGrid={datatableWilayah.isReload}
          reloadType={datatableWilayah.reloadType}
        />
      )}
    </>
  );
};

DetailPasienContainer.propTypes = {
  t: PropTypes.func,
};

export default DetailPasienContainer;
