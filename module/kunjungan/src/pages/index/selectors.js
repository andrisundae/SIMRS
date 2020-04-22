<<<<<<< HEAD
import actionTypes from './actionTypes';

export const getPost = state => state.module.post;
export const isPasienBaru = state => {
  return state.module.statusForm === actionTypes.ADD;
};
=======
export const getPost = (state) => state.module.post;
>>>>>>> origin/dev
