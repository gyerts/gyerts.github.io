import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from "../../store/actions";
import classes from './DltCompFilterViewer.css';
import FilterLine from './FilterLine/FilterLine';

import imgHidden from './img/hidden.png';
import imgShowed from './img/showen.png';

const DltCompFilterViewer = (props) => {
  let filterLines = Object.keys(props.dltComponents).map(
    dltApp => <FilterLine key={dltApp}
                          dltApp={dltApp}
                          imgHidden={imgHidden}
                          imgShowed={imgShowed}
                          visible={props.dltComponents[dltApp]}
                          doShow={ () => { props.showDltComponent(dltApp) } }
                          doHide={ () => { props.hideDltComponent(dltApp) } } />);

  return <table className={classes.Table}>
    <tbody>
    {filterLines}
    </tbody>
  </table>;
};


const mapStateToProps = state => {
  return {
    dltComponents: state.app.dltComponents,
    logs: state.app.visibleDltLogs,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showDltComponent: (dltComponentName) => dispatch( actionCreators.showDltComponent(dltComponentName) ),
    hideDltComponent: (dltComponentName) => dispatch( actionCreators.hideDltComponent(dltComponentName) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DltCompFilterViewer);
