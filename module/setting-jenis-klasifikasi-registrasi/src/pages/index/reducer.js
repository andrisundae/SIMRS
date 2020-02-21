import { reducer as settingReducer } from '@simrs/main/src/modules/setting/default';
import moduleState from './state';

export default (state = moduleState, action) => {
    return settingReducer(state, action);
}
