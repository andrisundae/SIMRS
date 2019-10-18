import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

const moduleState = {
    ...module,
    editedCell: {
        oldValue: 0,
        value: 0,
        rowIndex: null,
    }
}

const filterState = {
    ...filter,
    data: {
        options_klasifikasi: [],
        options_versi_tarif: [],
        options_kelompok: [],
        options_kelas: [],
    },
    post: {
        versi_tarif: '',
        klasifikasi: '',
        kelompok: '',
        kelas: '',
        nama_layanan: '',
        selectedVersiTarif: null,
        selectedKlasifikasi: null,
        selectedKelompok: null,
        selectedKelas: null,
    },
    focusElement: ''
}

export {
    moduleState,
    filterState
};
