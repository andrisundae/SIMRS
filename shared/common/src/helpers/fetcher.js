import { get } from './request';

export default async (url, param = {}) => {
  const response = await get(url, param);
  if (false === response.status) {
    const error = new Error(response.message);
    error.info = response.data;
    throw error;
  }
  return response.data;
};
