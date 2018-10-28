import React, { Component } from 'react';
import classes from './App.css';
import DltLogLoader from './components/DltLogLoader/DltLogLoader';
import DltLogsViewer from './components/DltLogsViewer/DltLogsViewer';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import DltCompFilterViewer from './components/DltCompFilterViewer/DltCompFilterViewer'

import { connect } from "react-redux";
import * as actionCreators from "./store/actions";


class App extends Component {
  constructor(props) {
    super(props);

    props.showMsgToUser("Waiting for logs");
  }


  render() {
    const viewer = (
      <div className={classes.content}>
        <div className={ classes.leftPanel }>
          <DltCompFilterViewer />
        </div>
        <div className={ classes.workspace }>
          <DltLogsViewer />
        </div>
      </div>
    );

    const loader = (
      <DltLogLoader />
    );

    const loadingScreen = (
      <div className={ [classes.content, classes.center].join(' ') }>
        <h1>{this.props.messageToUser}</h1>
      </div>
    );

    return (
      <div className={classes.wrapper}>
        <Header>
          {loader}
        </Header>

        { this.props.dltLogsAvailable ? viewer : loadingScreen }

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messageToUser: state.app.msg,
    dltLogsAvailable: state.app.dltLogsAvailable,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showMsgToUser: msg => dispatch( actionCreators.showMsgToUser(msg) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
