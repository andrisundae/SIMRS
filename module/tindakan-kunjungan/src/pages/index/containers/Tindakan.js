import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import FormTindakan from '../components/FormTindakan';
import CariTindakan from '../components/CariTindakan';
import PelaksanaTambahan from './PelaksanaTambahan';
import PelaksanaKomponen from './PelaksanaKomponen';
import {
  disabledElement,
  postSelector,
  focusElementSelector,
  dataSelector,
  postItemSelector,
  showCariTindakanSelector,
  datatableSelector,
  selectedOptionSelector,
  showPelaksanaTambahanSelector,
  showModalPelaksanaTambahanSelector,
  showModalPelaksanaKomponenSelector,
} from '../redux/selector';
import { actions, staticConst } from '../index';

const TindakanContainer = ({ t, resource }) => {
  const dispatch = useDispatch();
  // const [showModalPelaksanaTambahan, setShowModalPelaksanaTambahan] = React.useState(false);
  const post = useSelector((state) => postSelector(state));
  const postItem = useSelector((state) => postItemSelector(state));
  const focusElement = useSelector((state) => focusElementSelector(state));
  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form_tindakan')
  );
  const showCariTindakan = useSelector(showCariTindakanSelector);
  const dataForm = useSelector(dataSelector);
  const datatables = useSelector(datatableSelector);
  const selectedOption = useSelector(selectedOptionSelector);
  const showModalPelaksanaTambahan = useSelector(
    showModalPelaksanaTambahanSelector
  );
  const showModalPelaksanaKomponen = useSelector(
    showModalPelaksanaKomponenSelector
  );
  const showPelaksanaTambahan = useSelector(showPelaksanaTambahanSelector);
  const isReload = datatables[staticConst.TABLE_SEARCH_TINDAKAN]
    ? datatables[staticConst.TABLE_SEARCH_TINDAKAN].isReload
    : false;
  const reloadType = datatables[staticConst.TABLE_SEARCH_TINDAKAN]
    ? datatables[staticConst.TABLE_SEARCH_TINDAKAN].reloadType
    : '';

  const showCariTindakanHandler = () =>
    dispatch(actions.showCariTindakan(resource));
  const hideCariTindakanHandler = () =>
    dispatch(actions.hideCariTindakan(resource));
  const submitCariTindakanHandler = (params) =>
    dispatch(actions.submitFilterSuggestion(resource, params));
  const selectTindakanHandler = (data) =>
    dispatch(actions.onSelectTindakanSuggestion(resource, data));
  const changePelaksanaHandler = (data) =>
    dispatch(actions.onChangePelaksana(resource, data));
  const loadTindakanSuggestionHandler = (data, tableParams) =>
    dispatch(actions.tindakanSuggestion.request(resource, data, tableParams));

  const focusElementHandler = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      dispatch(actions.onFocusElement(resource, nameRef));
    }
  };

  const showPelaksanaTambahanHandler = () =>
    dispatch(actions.onShowPelaksanaTambahan(resource));
  const hidePelaksanaTambahanHandler = () =>
    dispatch(actions.onHidePelaksanaTambahan(resource));

  const showPelaksanaKomponenHandler = () =>
    dispatch(actions.onShowPelaksanaKomponen(resource));
  const hidePelaksanaKomponenHandler = () =>
    dispatch(actions.onHidePelaksanaKomponen(resource));

  const changeInputHandler = (data) =>
    dispatch(actions.onChangeInputTindakan(resource, data));

  return (
    <>
      <FormTindakan
        t={t}
        resource={resource}
        disabled={disabledInput}
        kunjungan={post}
        focusElement={focusElement}
        data={postItem}
        onShowCariTindakan={showCariTindakanHandler}
        dataForm={dataForm}
        selectedOption={selectedOption}
        onChangePelaksana={changePelaksanaHandler}
        onChangeInput={changeInputHandler}
        onFocusElement={focusElementHandler}
        showPelaksanaTambahan={showPelaksanaTambahan}
        // showPelaksanaTambahan={true}
        onShowPelaksanaTambahan={showPelaksanaTambahanHandler}
        onShowPelaksanaKomponen={showPelaksanaKomponenHandler}
      />
      {showCariTindakan && (
        <CariTindakan
          name={staticConst.TABLE_SEARCH_TINDAKAN}
          t={t}
          show={showCariTindakan}
          onHide={hideCariTindakanHandler}
          // dataSource={dataSourceKunjungan}
          onSelect={selectTindakanHandler}
          resource={resource}
          onLoadData={loadTindakanSuggestionHandler}
          kunjungan={post}
          isReload={isReload}
          reloadType={reloadType}
          onSubmit={submitCariTindakanHandler}
          focusElement={focusElement}
        />
      )}
      {showModalPelaksanaTambahan && (
        <PelaksanaTambahan
          show={showModalPelaksanaTambahan}
          onHide={hidePelaksanaTambahanHandler}
        />
      )}
      {showModalPelaksanaKomponen && (
        <PelaksanaKomponen
          show={showModalPelaksanaKomponen}
          onHide={hidePelaksanaKomponenHandler}
        />
      )}
    </>
  );
};

TindakanContainer.propTypes = {
  t: PropTypes.func,
};

export default TindakanContainer;
