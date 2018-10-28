import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './EditFilter.css';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import EditFilterLine from "../EditFilterLine/EditFilterLine";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dltFilters: this.props.dltFilters,
      active: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const filters = this.props.dltFilters[this.props.dltApp];

    return (
      <div>
        <span onClick={this.toggle}>{this.props.buttonLabel}</span>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={[this.props.className, classes.Modal].join(' ')}
          size="lg">

          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>

          <ModalBody>
            { filters ? filters.map(filter => <EditFilterLine key={filter.expr} filter={filter} />) : null }
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dltFilters: state.app.dltFilters,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    hideDltComponent: (dltComponentName) => dispatch( actionCreators.hideDltComponent(dltComponentName) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
