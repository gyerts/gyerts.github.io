import * as actionTypes from './actionTypes';

export const showMsgToUser = ( msg ) => {
    return {
        type: actionTypes.SHOW_MESSAGE_TO_USER,
        msg: msg
    };
};

export const setDltLogsAvailable = ( available ) => {
    return {
        type: actionTypes.SET_DLT_LOGS_AVAILABLE,
        dltLogsAvailable: available
    };
};
