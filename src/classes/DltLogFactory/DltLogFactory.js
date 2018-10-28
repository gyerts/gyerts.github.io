import React from 'react';
import { loadFromText } from './impl/loadFromText';
import { sortLogs } from './impl/sortLogs';


class DltLogFactory extends React.Component {
  dltComponents = {};
  allDltLogs = {};
  visibleDltLogs = {};
  dltFilters = {};

  loadFromText (logs, dltFilters) {
    return new Promise((resolve, reject) => {
      this.allDltLogs = loadFromText (logs, dltFilters);
      resolve();
    })
  }

  sortKeysOfDict (dict) {
    const sortedKeys = [];
    for(const key in dict) {
      sortedKeys[sortedKeys.length] = key;
    }
    sortedKeys.sort();
    return sortedKeys;
  }

  setFilters (dltFilters) {
    this.dltFilters = dltFilters;
  }

  convertDictToList(dict) {
    const outputList = [];
    const sortedKeys = this.sortKeysOfDict(dict);
    let counter = 0;
    sortedKeys.forEach(cellNumber => {
      dict[cellNumber].forEach(logObject => {
        logObject.count = counter++;
        outputList.push(logObject);
      })
    });
    return outputList;
  }

  convertListToDict(list) {
    const outputDict = {};
    list.forEach(log => {
      if ( !(log.dltComponentName in outputDict) ) {
        outputDict[log.dltComponentName] = [];
      }
      outputDict[log.dltComponentName].push( log );
    });
    return outputDict;
  }

  sort (logsDict) {
    const logsList = sortLogs( this.convertDictToList(logsDict) );
    return this.convertListToDict(logsList);
  }

  filter (logs, filters) {
    console.log('filters', filters);
    if (filters && filters.length) {
      console.log('do filters');
      logs = logs.filter(log => filters.some(dltFilter => dltFilter.isMatch(log.message)) );
    } else {
      // if no filter for this app, each log should be shown, because you might need some text to add some filter
    }
    return logs;
  }

  showComponent (name) {
    this.dltComponents[name] = true;

    this.visibleDltLogs[name] = this.filter(this.allDltLogs[name], this.dltFilters[name]);
    const sortedLogs = this.sort(this.visibleDltLogs);

    return { dltComponents: { ...this.dltComponents }, visibleDltLogs: { ...sortedLogs } }
  }

  hideComponent (name) {
    this.dltComponents[name] = false;
    delete this.visibleDltLogs[name];
    return { dltComponents: { ...this.dltComponents }, visibleDltLogs: { ...this.sort(this.visibleDltLogs) } }
  }

  getAllDltLogs () {
    return { ...this.allDltLogs };
  }

  getVisibleDltLogs () {
    return { ...this.visibleDltLogs };
  }

  resetLogs () {
    this.visibleDltLogs = {};
  }

  getDltComponents () {
    this.dltComponents = {};

    for (const name in this.allDltLogs) {
      this.dltComponents[name] = ( name in this.visibleDltLogs );
    }
    return { ...this.dltComponents };
  }
}

export const factory = new DltLogFactory();
