
import actionTypes from './actionTypes';

const isDisableForm = (state) => {
    let statusForm = state.statusForm;

    return statusForm === actionTypes.EDIT ? false : true;
}

const getFirstAturan = state => {
    const daftarKelompok = state.module.post.daftarKelompok;
    let aturan = '';
    if (daftarKelompok[0]) {
        if (daftarKelompok[0].daftarAturan[0]) {
            aturan = daftarKelompok[0].daftarAturan[0].aturan;
        }
    }

    return aturan;
}

export default {
    isDisableForm,
    getFirstAturan
}