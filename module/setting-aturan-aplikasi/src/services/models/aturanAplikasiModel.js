import { request } from '@simrs/common';

const path = '/system/setting/aturan-aplikasi';

export default {
    save: async (params) => {
        let response = await request.post(`${path}/koreksi`, params);

        return response;
    },
    getData: async () => {
        let response = await request.post(`${path}/view`);

        return response;
    }
};
