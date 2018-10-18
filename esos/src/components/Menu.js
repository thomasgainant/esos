import React, { Component } from 'react';
import './Menu.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {selectStartPage} from '../actions/PageStart.js';
import {selectAddExpensePage} from '../actions/PageStart.js';
import {selectExpensesListPage} from '../actions/PageStart.js';
import {selectAccountsListPage} from '../actions/PageStart.js';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <div id="menu">
        <button onClick={() => { this.props.selectStartPage(); }}><span className="icons big"></span></button>
        <button onClick={() => { this.props.selectAddExpensePage(); }}><span className="icons big"></span></button>
        <button onClick={() => { this.props.selectExpensesListPage(); }}><span className="icons big"></span></button>
        <button style={{display: 'none'}}><span className="icons big"></span></button>
        <button style={{display: 'none'}}><span className="icons big"></span></button>
        <button style={{display: 'none'}}><span className="icons big"></span></button>
        <button onClick={() => { this.props.selectAccountsListPage(); }}><span className="icons big"></span></button>
      </div>
    );
  }
}

function mapStateToProps(state){
	return { 
    	currentPage: state.currentPage
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ selectStartPage: selectStartPage, selectAddExpensePage: selectAddExpensePage, selectExpensesListPage: selectExpensesListPage, selectAccountsListPage: selectAccountsListPage }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);
