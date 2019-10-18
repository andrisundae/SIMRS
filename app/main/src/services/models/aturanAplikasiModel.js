import { request } from '@simrs/common';

export default {
    getAturanAplikasi: async () => {
        let response = await request.post('/system/master-setting', {});

        return response;
    },
};
