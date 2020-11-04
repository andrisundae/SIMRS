import {get} from '../helpers/request';

export const getInfoSystem = async () => {
  let response = await get('/system/info');
  return response;
}
