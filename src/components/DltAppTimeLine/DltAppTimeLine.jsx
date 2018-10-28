import React from 'react';
import classes from './DltAppTimeLine.css';
import Log from './../Log/Log';


const DltAppTimeLine = (props) => {
  return <div className={classes.DltAppTimeLine}>

    <h2>
      {props.title}
      <button onClick={props.onHideDltComponentHandler}>Hide</button>
    </h2>

    <div className={classes.Container}>
      { props.logs.map(log => <Log key={log.count} log={log} />) }
    </div>

  </div>;
};

export default DltAppTimeLine
