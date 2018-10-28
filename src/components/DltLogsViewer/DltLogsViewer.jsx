import React from 'react';
import classes from './DltLogsViewer.css';

import DltAppTimeLine from './../DltAppTimeLine/DltAppTimeLine';


import { connect } from 'react-redux';
import * as actionCreators from "../../store/actions";


const DltLogsViewer = (props) => {
  return (
    <div className={classes.DltLogsViewer}>
      { Object.keys(props.logs).map(
        (group) => <DltAppTimeLine onHideDltComponentHandler={() => {props.hideDltComponent(group)}}
                                   key={group}
                                   title={group}
                                   logs={props.logs[group]} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    logs: state.app.visibleDltLogs,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    hideDltComponent: (dltComponentName) => dispatch( actionCreators.hideDltComponent(dltComponentName) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DltLogsViewer);
