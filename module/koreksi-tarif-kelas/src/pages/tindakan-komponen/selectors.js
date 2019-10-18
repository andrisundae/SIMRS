export const getReference = state => state.nested.module.reference;
export const getTotalTarif = state => {
    let total = 0;
    state.nested.module.post.list_tindakan_komponen.forEach(row => {
        total += row.tarif;
    })

    return total;
};
export const isEditTindakan = state => state.nested.module.post.is_edit_tindakan;