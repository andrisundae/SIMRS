import useSWR from 'swr';
import dummydata from '@module/template/src/dummydata.json';

function fetcher(key, params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummydata);
    }, 1000);
  });
}

export function useTemplateDokumen() {
  const { data, error, mutate } = useSWR('data', fetcher);
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
    mutate: mutate,
  };
}
