import { redux } from '@simrs/common';
import actionTypes from './actionTypes';
import { activity, logActions } from '../log';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    acl: {
        request: (resource, data) => createAction(
            actionTypes.GET_ACL_REQUEST, {
                data
            }, {
                resource
            }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_ACL_SUCCESS, {
                data
            }, {
                resource
            }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_ACL_FAILURE, {
                error
            }, {
                resource
            }
        )
    },
    openForm: (resource) => createAction(
        actionTypes.OPEN_FORM, {}, {
            resource,
            log: createActivity(resource, activity.MASUK_FORM)
        }
    ),
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onImport: (resource, data) => createAction(
        actionTypes.IMPORT, {
            data
        }, {
            resource,
            log: createActivity(resource, activity.SIMPAN, "Start import")
        }
    ),
    onImportSuccess: (resource, message = "") => createAction(
        actionTypes.IMPORT_SUCCESS, {}, {
            resource,
            log: createActivity(resource, activity.SIMPAN, message)
        }
    ),
    onImportFailure: (resource, message = "") => createAction(
        actionTypes.IMPORT_FAILURE, {}, {
            resource,
            log: createActivity(resource, activity.SIMPAN, message)
        }
    ),
    onStartImport: (resource) => createAction(
        actionTypes.START_IMPORT, {}, {
            resource
        }
    ),
    onStartedUpload: (resource, data) => createAction(
        actionTypes.STARTED_UPLOAD, {
            data
        }, {
            resource
        }
    ),
    onReady: (resource) => createAction(actionTypes.READY, {}, {
        resource
    }),
    onReset: (resource) => createAction(actionTypes.RESET, {}, {
        resource
    }),
    onFocusElement: (resource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT, {
            element
        }, {
            resource
        }
    ),
    onChangeInput: (resource, data) => createAction(actionTypes.CHANGE_INPUT, { data }, { resource }),
    onFileChange: (resource, data) => createAction(actionTypes.CHANGE_FILE, {data}, {resource}),
    onConnectedSocket: (resource) => createAction(actionTypes.CONNECTED_SOCKET, {}, {
        resource
    }),
    onDisconnectedSocket: (resource) => createAction(actionTypes.DISCONNECTED_SOCKET, {}, {
        resource
    }),
}
