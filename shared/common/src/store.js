import Store from 'electron-store';

const schema = {
  config: {
    type: 'object',
    properties: {
      computerName: { type: 'string' },
      uuid: { type: 'string' },
      localIdentity: { type: 'string' },
      appCode: { type: 'string' },
      appVersion: { type: 'string' },
      api: { type: 'string' },
      theme: {
        type: 'object',
        properties: {
          color: { type: 'string', default: 'black' },
          backgroundPath: { type: 'string' },
          // menu: { type: 'array' },
        },
      },
    },
  },
  user: {
    type: 'object',
    properties: {
      apiToken: { type: 'string' },
      openedApp: { type: 'number', default: 0 },
      isLogin: { type: 'boolean' },
      id: { type: 'integer' },
      nama: { type: 'string' },
      username: { type: 'string' },
      foto: { type: 'string' },
    },
  },
  expiredToken: { type: 'number', default: 0 },
};
const defaultOption = {
  encryptionKey: process.env.REACT_APP_SECRET,
  schema: schema,
  accessPropertiesByDotNotation: true,
};

const main = new Store(defaultOption);

const billing = new Store({
  ...defaultOption,
  name: 'billing',
});

const farmasi = new Store({
  ...defaultOption,
  name: 'farmasi',
});

export { main, billing, farmasi };
