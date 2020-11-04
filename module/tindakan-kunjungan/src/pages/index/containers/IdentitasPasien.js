import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import IdentitasPasien from '../components/IdentitasPasien';
import actions from '../redux/actions';
import {postSelector, focusElementSelector, disabledElement} from '../redux/selector';

const IdentitasPasienContainer = ({t, resource}) => {
  const dispatch = useDispatch();
  const noRmKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      if (e.target.value) {
        dispatch(actions.getPasien.request(resource, { norm: e.target.value }));
      }
    }
  };
  const changeInputHandler = (e) => {
    const {value, name} = e.target;
    dispatch(actions.onChangeInputIdentitas(resource, {value, name}));
  };
  const post = useSelector(state => postSelector(state));
  const focusElement = useSelector(state => focusElementSelector(state));
  const isDisabledNorm = useSelector(state => disabledElement(state, 'norm'));

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
  )
}

IdentitasPasienContainer.propTypes = {
  t: PropTypes.func,
  resource: PropTypes.string,
};


export default IdentitasPasienContainer;