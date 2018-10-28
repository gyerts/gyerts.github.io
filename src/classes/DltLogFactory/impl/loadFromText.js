import DltLog from "../../DltLog/DltLog";

function adaptIfDLTP(log) {
  if ('DLTP' === log.dltAppId) {
    const parts = log.message.split(' ');
    log.msFromStartUp = parseFloat(parts[0].slice(1, -1));  // [45.5454]  ->  45.5454
  }
}

export function loadFromText (logs, dltFilters) {
  const parsedLogs = {};
  const lines = logs.split('\n');
  for (const line in lines) {
    if ( lines[line] ) {
      const parts = lines[line].split(' ');

      const date = parts[1].split('/');                   // 2018/10/13       ->  [2018, 10, 13]
      const time = parts[2].split('.')[0].split(':');     // 10:48:10.624763  ->  [10, 48, 10]
      const microseconds = parts[2].split('.')[1];        // 10:48:10.624763  ->  624763

      const datetime = new Date(
        /* year */          parseInt(date[0]),
        /* month */         parseInt(date[1]) - 1,
        /* date */          parseInt(date[2]),
        /* hours */         parseInt(time[0]),
        /* minutes */       parseInt(time[1]),
        /* seconds */       parseInt(time[2]),
        /* milliseconds */  parseInt(microseconds),
      );

      const logObj = new DltLog({
        count: parts[0],                      // 0
        date: datetime,
        msFromStartUp: parseFloat(parts[3]),  // 43.4105
        wtf1: parts[4],                       // 21
        projectName: parts[5],    // MIB3
        dltAppId: parts[6],       // SWDL
        dltCtx: parts[7],         // LUC
        wtf2: parts[8],           // 1104
        wtf3: parts[9],           // log
        type: parts[10],           // info
        mode: parts[11],          // verbose
        wtf4: parts[12],          // 1
        message: parts.splice(13, parts.length).join(' '),  // super log string with many spaces
        dltComponentName: `${parts[6]}: ${parts[7]}`,
      });
      // adaptIfDLTP(logObj);

      if ( !(logObj.dltComponentName in parsedLogs) ) {
        parsedLogs[logObj.dltComponentName] = [];
      }
      parsedLogs[logObj.dltComponentName].push( logObj );
    }
  }
  return parsedLogs;
}
