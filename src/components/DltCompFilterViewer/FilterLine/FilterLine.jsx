import React from 'react';
import classes from './FilterLine.css';

import EditFilter from './../../../components/EditFilter/EditFilter';


const FilterLine = (props) => {
  return <tr className={classes.line}>
    <td className={classes.name}>
      <EditFilter dltApp={props.dltApp} buttonLabel={props.dltApp} />
    </td>

    <td>
      <img
        src={props.visible ? props.imgShowed : props.imgHidden}
        className={classes.Img}
        alt={`component (${props.dltApp}) logs: are ${props.visible ? 'visible' : 'hidden' }`}
        onClick={ () => props.visible ? props.doHide() : props.doShow() } />
    </td>
  </tr>;
};

export default FilterLine;
