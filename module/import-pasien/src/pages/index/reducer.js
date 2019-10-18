import {reducer} from '@simrs/main/src/modules/import';
import moduleState from './state';

export default (state = moduleState, action) => {
    return reducer(state, action, moduleState)
}
