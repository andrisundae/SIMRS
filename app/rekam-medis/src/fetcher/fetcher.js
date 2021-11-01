const defaultOption = {
  mode: 'cors',
  cache: 'no-cache',
  timeout: 30000,
  headers: {
    'device-id': localStorage.getItem('device.id'),
    'device-name': localStorage.getItem('device.name'),
    'local-identity': localStorage.getItem('device.localIdentity'),
    'app-code': localStorage.getItem('app.code'),
    // 'app-version': localStorage.getItem('app.version'),
  },
};

function get(path, param) {
  const defaultSearchParam = new URLSearchParams();
  Object.keys(param).forEach(function (key) {
    defaultSearchParam.set(key, param[key]);
  }, this);

  const request = new Request(
    `${localStorage.getItem(
      'config.apiUrl'
    )}${path}?${defaultSearchParam.toString()}`,
    {
      ...defaultOption,
      headers: {
        ...defaultOption.headers,
        'api-token': localStorage.getItem('user.token'),
      },
    }
  );

  return fetch(request);
}

export function post(path, param = {}) {
  const formData = new FormData();
  Object.keys(param).forEach((key) => {
    formData.append(key, param[key]);
  });

  const request = new Request(
    `${localStorage.getItem('config.apiUrl')}${path}`,
    {
      ...defaultOption,
      method: 'POST',
      body: formData,
      headers: {
        ...defaultOption.headers,
        'api-token': localStorage.getItem('user.token'),
      },
    }
  );

  return fetch(request);
}

export default async (url, param = {}) => {
  const response = await get(url, param);
  if (!response.ok) {
    switch (response.status) {
      case 403:
        const json = await response.json();
        if (json.data && !json.data.isValidToken) {
          // TODO: token expired, lakukan penanganan seperti pada shared/common/src/helpers/request.js bagian statusHandler yang kompatibel juga dengana plikasi mobile
        }
        break;
      case 500:
        throw new Error(response.statusText);
      default:
        const error = new Error(response.message);
        error.info = response.data;
        throw error;
    }
  }
  const json = await response.json();
  return json?.data ? json.data : [];
};
