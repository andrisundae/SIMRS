import actions from './logActions';

export default () => store => next => action => {
    
    if (action.meta) {
        if (action.meta.log) {
            let { resource, log } = action.meta;
            store.dispatch(actions.log.request(resource, log));
        }
    }
    
    return next(action)
}
