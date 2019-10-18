import { store, request } from '@simrs/common';
const { main } = store;

export default {
    generateMenu: async () => {
        let params = { 'api_token':main.get('user.apiToken') };
        let response = await request.post('/system/pengaturan-menu/create-menu', params);
        if (response.status) {
            main.set('config.theme.menu', response.data);
        }

        return response;
    },
};
