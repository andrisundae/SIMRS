import { state } from '@simrs/main/src/modules/import';

export default {
    ...state,
    data: {
        versi: [],
    },
    post: {
        versi_tarif: 0,
        jenis_tarif: '',
        selectedVersi: null,
        ...state.post
    },
};

