import React from 'react';
import { Badge } from 'reactstrap';

import classes from './EditFilterLine.css';
import {Types} from "../../classes/Filter/Filter";


class EditFilterLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <table style={{backgroundColor: this.props.filter.color, width: '100%'}}>
        <tbody>
          <tr>
            <td><input type="text" value={this.props.filter.expr} /></td>
            <td><Badge color="light">color</Badge></td><td>{this.props.filter.color}</td>
            <td><Badge color="light">f-type</Badge></td><td>{this.props.filter.filterType}</td>
            <td><Badge color="light">ex-type</Badge></td><td>{this.props.filter.exprType}</td>
            <td><Badge color="light">compare</Badge></td><td>{this.props.filter.compare}</td>
            <td><Badge color="light">case</Badge></td><td>{this.props.filter.caseSensitive?'on':'off'}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default EditFilterLine;
