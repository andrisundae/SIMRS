import { store, request } from '@simrs/common';

const { main } = store;

const validateToken = async () => {
    let response = await request.post('/auth/personel/validate/login');
    return response;
}

const getGranted = async (route) => {
    let response = await request.post('/acl/tabel/fitur/granted', { menu: route });
    return response;
}

function setLocalIdentity(data) {
    main.set("user.apiToken", data.token);
    main.set("user.username", data.username);
    main.set("user.nama", data.nama);
    main.set('user.isLogin', true);
}

function clearLocalIdentity() {
    main.set("user.apiToken", '');
    main.set("user.username", '');
    main.set("user.nama", '');
    main.set('user.isLogin', false)
}

export default {
    login: async (params) => {
        let response = await request.post('/auth/personel/validate/credentials', params, {headers: request.simrsHeaders(false)});
        if (response.status) {
            if (response.data.isValidLogin) {
                setLocalIdentity(response.data);
                main.set('expiredToken', 0);
            }
        }

        return response;
    },
    logout: async () => {
        let response = await request.post('/auth/personel/logout');
        clearLocalIdentity();
        return response;
    },
    isUserLogOn: async () => {
        if (main.get('user.apiToken') === '') {
            return Promise.reject('Belum login');
        } else {
            return Promise.resolve();
        }
    },
    validateToken,
    userCheck: async () => {
        let response = await validateToken();
        if (response.data.isValidToken) {
            return response;
        } else {
            return Promise.reject(response.message ? response.message : 'Server error');
        }
    },
    getGranted,
    isGranted: async (route, role) => {
        let result = await getGranted(route);
        if (result.status) {
            return result.data.find(permission => permission === role);
        } else {
            return false;
        }
    },
    resetPassword: async (params) => {
        let response = await request.post(`/auth/personel/password/reset`, params);

        return response;
    },
    forceLogout: async (params) => {
        let response = await request.post(`/auth/personel/logout/force`, params);

        return response;
    },
};
