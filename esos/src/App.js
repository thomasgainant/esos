import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PageStart from './components/PageStart.js';
import PageAddExpense from './components/PageAddExpense.js';
import PageExpensesList from './components/PageExpensesList.js';
import PageAccountsList from './components/PageAccountsList.js';
import Menu from './components/Menu.js';

class App extends Component {
  render() {
    return (
      <div className="Root">
        <PageStart/>
        <PageAddExpense/>
        <PageExpensesList/>
        <PageAccountsList/>
        <Menu/>
      </div>
    );
  }
}

function mapStateToProps(state){
	return { 
    	/*currentUser: state.currentUser*/
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
