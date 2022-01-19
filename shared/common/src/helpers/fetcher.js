import { get, post as postDefault } from './request';

export const post = async (url, param = {}, options, isParseArray=true) => {
  const response = await postDefault(url, param, options, isParseArray);
  return response;
};

export default async (url, param = {}) => {
  const response = await get(url, param);
  return response;
};
