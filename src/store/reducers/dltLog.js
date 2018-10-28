import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { Filter, Types } from './../../classes/Filter/Filter';
import { factory } from "../../classes/DltLogFactory/DltLogFactory";

const initialState = {
  dltFilters: {
    "SWDL: LUC" : [
      new Filter('red', 'register1 info', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
      new Filter('green', 'register3 info', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "SWDL: SWUM" : [
    ],
    "LNUX: SYS" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "BT: BT" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "PCM: PCM" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "PTLG: PTLG" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "DLTP: PTLG" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "PCM: PLCG" : [
      new Filter('#eee', '', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
    "DLTP: STK" : [
      new Filter('#eee', 'sfr_mi::CServiceImpl :: sendMsg', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
      new Filter('#eee', 'ssi_mi::CIccNodeBase :: onGenRandCb', Types.filter.POSITIVE, Types.expr.PAYLOAD, false),
    ],
  },
  allDltLogs: [
  ],
  visibleDltLogs: [
  ],
  dltComponents: {
  },
  msg: "",
  dltLogsAvailable: false
};

const showFilter = (doShow, name, state) => {
  const dltFilters = { ...state.dltFilters };
  dltFilters[name] = doShow;
  return updateObject(state, {dltFilters: dltFilters});
};

const addFilter = (name, expr, state) => {
  const dltFilters = { ...state.dltFilters, name: expr };
  return updateObject(state, {dltFilters: dltFilters});
};

const removeFilter = (name, state) => {
  const dltFilters = { ...state.dltFilters };
  delete dltFilters[name];
  return updateObject(state, {dltFilters: dltFilters});
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    /**
     * FILTERS
     * */
    case actionTypes.ADD_DLT_FILTER:
      return addFilter(state.name, state.expr, state);
    case actionTypes.REMOVE_DLT_FILTER:
      return removeFilter(action.name, state);
    case actionTypes.STATE_ON_DLT_FILTER:
      return showFilter (true, action.name, state);
    case actionTypes.STATE_OFF_DLT_FILTER:
      return showFilter (false, action.name, state);

    /**
     * LOGS
     * */
    case actionTypes.LOAD_DLT_LOGS:
      return updateObject(state, {
        allDltLogs: factory.getAllDltLogs(),
        dltComponents: factory.getDltComponents(),
      });

    /**
     * COMPONENTS
     * */
    case actionTypes.SHOW_DLT_COMPONENT:
      return updateObject(state, factory.showComponent(action.dltComponentName));
    case actionTypes.HIDE_DLT_COMPONENT:
      return updateObject(state, factory.hideComponent(action.dltComponentName));

    /**
     * WHOLE APP
     * */
    case actionTypes.SHOW_MESSAGE_TO_USER:
      return updateObject(state, {
        msg: action.msg
      });
    case actionTypes.SET_DLT_LOGS_AVAILABLE:
      factory.setFilters(state.dltFilters);
      factory.resetLogs();
      return updateObject(state, {
        dltLogsAvailable: action.dltLogsAvailable,
        allDltLogs: factory.getAllDltLogs(),
        dltComponents: factory.getDltComponents(),
        visibleDltLogs: factory.getVisibleDltLogs(),
      });

    default:
      break;
  }
  return state;
};


export default reducer;
