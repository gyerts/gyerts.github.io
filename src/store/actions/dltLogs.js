import * as actionTypes from './actionTypes';

export const addDltFilter = ( filterName, expr ) => {
    return {
        type: actionTypes.ADD_DLT_FILTER,
        name: filterName,
        expr: expr,
    };
};

export const removeDltFilter = ( filterName ) => {
    return {
        type: actionTypes.REMOVE_DLT_FILTER,
        name: filterName,
    };
};

export const stateOnDltFilter = ( filterName ) => {
    return {
        type: actionTypes.STATE_ON_DLT_FILTER,
        name: filterName
    };
};

export const stateOfDltFilter = ( filterName ) => {
    return {
        type: actionTypes.STATE_OFF_DLT_FILTER,
        name: filterName
    };
};

export const loadDltLogs = (dltLogs ) => {
    return {
        type: actionTypes.LOAD_DLT_LOGS,
        logs: dltLogs,
    };
};

export const showDltComponent = ( dltComponentName ) => {
    return {
        type: actionTypes.SHOW_DLT_COMPONENT,
        dltComponentName: dltComponentName
    };
};

export const hideDltComponent = ( dltComponentName ) => {
    return {
        type: actionTypes.HIDE_DLT_COMPONENT,
        dltComponentName: dltComponentName
    };
};
