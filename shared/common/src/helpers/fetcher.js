import { get } from './request';

export default async (url, param = {}) => {
  const response = await get(url, param);
  return response;
};
