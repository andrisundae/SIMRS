import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useModuleState } from '@simrs/components';
import IdentitasPasien from '../components/IdentitasPasien';
import {
  disabledElement,
  postSelector,
  focusElementSelector,
} from '../redux/selector';
import { actions } from '../index';

const IdentitasPasienContainer = () => {
  const dispatch = useDispatch();
  const { resource } = useModuleState();
  const post = useSelector(postSelector);
  const focusElement = useSelector(focusElementSelector);
  const isDisabledNorm = useSelector((state) => disabledElement(state, 'norm'));

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

  return (
    <IdentitasPasien
      onEnterNorm={noRmKeyDownHandler}
      data={post}
      isDisabledNorm={isDisabledNorm}
      onFocusElement={focusElementHandler}
      focusElement={focusElement}
    />
  );
};

export default React.memo(IdentitasPasienContainer);
