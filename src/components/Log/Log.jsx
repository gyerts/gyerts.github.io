import React from 'react';
import classes from './Log.css';
import { Badge } from 'reactstrap';
import dateFormat from 'dateformat';


const Log = (props) => {
  // http://blog.stevenlevithan.com/archives/date-time-format
  const date = dateFormat(props.log.date, "mmmm dS, h:MM:ss.l");

  return <div className={classes.Log} style={{top: `${props.log.count*50}px`}}>
    <Badge className={classes.badge} color="info">{props.log.count}</Badge>
    <Badge className={classes.badge} color="info">{date}</Badge>
    <Badge className={classes.badge} color="success">{props.log.msFromStartUp}</Badge>
    <span>{props.log.message}</span>
  </div>;
};

export default Log;
