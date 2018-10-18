import React, { Component } from 'react';
import './PageExpensesList.css';

import _ from 'lodash';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ExpenseRemoveButton from './ExpenseRemoveButton.js';

class PageExpensesList extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  	let classes = "page";
    if(this.props.currentPage == "expenseslist"){
      classes += " active";
    }

    let balanceClass = "very-very-big vertical-top label";
    if(this.props.currentBalance > 0){
      balanceClass += " success";
    }
    else if(this.props.currentBalance == 0){
      balanceClass += " warning";
    }
    else{
      balanceClass += " error";
    }

    let expenses = "";
    expenses = _.orderBy(this.props.expenses, ['date'],['desc']);
    //expenses = this.props.expenses;
    //console.log(expenses);
    //console.log(this.props.currentPage);

    let expensesHtml = "";
    expensesHtml = expenses.map((expense) => {
      let date = new Date(expense.date);
      let dateAsStr = date.getDate()+"."+(date.getMonth() + 1)+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();

      return (<tr className="very-small word-break" key={expense.id}><td>{expense.comment}</td><td>{expense.expenseType}</td><td>{expense.amount}</td><td>{ dateAsStr }</td><td><ExpenseRemoveButton expense={expense}/></td></tr>);
    });

    return (
      <div className={classes}>
        <h2>{this.props.currentAccountName} - Expenses</h2>
        <h4>Current balance</h4>
        <p><span className={balanceClass}>{ this.props.currentBalance }</span><span className="very-big vertical-top inline-block">€</span></p>
        <h4>Expenses list</h4>
        <table id="expenses" className="primary">
          <thead>
            <tr className="very-very-small word-break">
              <th>Comment</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ expensesHtml }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
      currentAccountName: state.currentAccountName,
      currentPage: state.currentPage,
      currentBalance: state.currentBalance,
      expenses: state.expenses
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PageExpensesList);
