export default class DltLog {
  constructor ( props ) {
    this.count = props.count;
    this.date = props.date;
    this.msFromStartUp = props.msFromStartUp;
    // this.wtf1 = props.wtf1;
    // this.projectName = props.projectName;
    this.dltAppId = props.dltAppId;
    this.dltCtx = props.dltCtx;
    // this.wtf2 = props.wtf2;
    // this.wtf3 = props.wtf3;
    this.type = props.type;
    // this.mode = props.mode;
    // this.wtf4 = props.wtf4;
    this.message = props.message;
    this.dltComponentName = props.dltComponentName;
  }
}
