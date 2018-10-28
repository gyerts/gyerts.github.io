function addToCellByCounter(cell, log) {
  for (let i = cell.length; i--;) {
    if (log.date > cell[i].date || 0 === i) {
      cell.splice(i + 1, 0, log);
      return true;
    }
  }
  return false;
}

function addToCellByTime (cell, log) {
  for(let i = cell.length; i--;) {
    if (log.date > cell[i].date || 0 === i) {
      cell.splice(i + 1, 0, log);
      return true;
    }
  }
  return false;
}

function addToCell (cell, log) {
  if (cell.length) {
    const lastLog = cell[cell.length-1];
    if (log.msFromStartUp === lastLog.msFromStartUp) {

      if ( (!addToCellByTime(cell, log)) && (!addToCellByCounter(cell, log)) ) {
        cell.push(log);
      }

    } else {
      for(let i = cell.length; i--;) {
        if (log.msFromStartUp > cell[i].msFromStartUp) {
          cell.splice(i + 1, 0, log);
          break;
        } else if (0 === i) {
          cell.splice(0, 0, log);
        }
      }
    }
  } else {
    cell.push(log);
  }
}

export function getSortedKeysOfDict (dict) {
  const sortedKeys = [];
  for(const key in dict) {
    sortedKeys[sortedKeys.length] = key;
  }
  return sortedKeys.sort((a, b) => a - b);
}

function collectAllLogs(container) {
  const outputArray = [];
  const sortedCells = getSortedKeysOfDict(container);
  let counter = 0;

  sortedCells.forEach(cellNumber => {
    container[cellNumber].forEach(logObject => {
      logObject.count = counter++;
      outputArray.push(logObject);
    })
  });
  return outputArray;
}

function getCellNumber (number) {
  // https://stackoverflow.com/questions/596467/how-do-i-convert-a-float-number-to-a-whole-number-in-javascript
  number = number*10;
  return number - (number % 1)
}

export function sortLogs (logs) {
  const container = {};

  for(let i = 0; i < logs.length; i++) {
    const cell = getCellNumber(logs[i].msFromStartUp);
    if ( ! (cell in container) ) {
      container[cell] = [];
    }
    addToCell(container[cell], logs[i]);
  }

  return collectAllLogs(container);
}
