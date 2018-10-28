import React from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";

import { factory } from './../../classes/DltLogFactory/DltLogFactory';


const ImportFromFileBodyComponent = (props) => {
  let fileReader;

  const handleFileRead = (e) => {
    props.showMsgToUser("load dlt logs to system ...");

    factory.loadFromText( fileReader.result, props.dltFilters ).then(() => {
      props.setDltLogsAvailable(true);
    });
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    try {
      fileReader.readAsText(file);
      props.showMsgToUser("reading file ...");
      props.setDltLogsAvailable(false);
    } catch (err) {
      console.log("no file chosen!");
    }
  };

  return <div>
    <input type='file'
           accept='.txt'
           onChange={e => handleFileChosen(e.target.files[0])}
    />
  </div>;
};

const mapStateToProps = state => {
  return {
    dltFilters: state.app.dltFilters,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showMsgToUser: msg => dispatch( actionCreators.showMsgToUser(msg) ),
    setDltLogsAvailable: isLoading => dispatch( actionCreators.setDltLogsAvailable(isLoading) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportFromFileBodyComponent);
