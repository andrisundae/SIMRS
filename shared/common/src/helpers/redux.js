const types = {
    SIMRS: '@SIMRS',
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};
const createType = type => `${types.SIMRS}/${type}`;
const createRequestType = base => {
    return {
        [types.REQUEST]: createType(`${base}_${types.REQUEST}`),
        [types.SUCCESS]: createType(`${base}_${types.REQUEST}_${types.SUCCESS}`),
        [types.FAILURE]: createType(`${base}_${types.REQUEST}_${types.FAILURE}`)
    }
}
const createAction = (type, payload, meta) => ({ type, payload, meta });

export { types, createType, createRequestType, createAction };
