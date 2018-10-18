import React, { Component } from 'react';
import './ExpenseRemoveButton.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {removeExpense} from '../actions/ExpenseRemoveButton.js';

class ExpenseRemoveButton extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*this.interval = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);*/
  }
  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  render() {
  	return (<button onClick={() => { this.props.removeExpense(this.props.expense); }}><span className="icons big bold"></span></button>);
  }
}

function mapStateToProps(state){
	return {
      
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ removeExpense: removeExpense }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ExpenseRemoveButton);
