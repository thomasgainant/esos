import React, { Component } from 'react';
import './PageAccountsList.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import AccountLoadButton from './AccountLoadButton.js';

import {addAccount} from '../actions/AccountLoadButton.js'

class PageAccountsList extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }
  componentWillUnmount() {
    
  }

  render() {
  	let classes = "page";
    if(this.props.currentPage == "accountslist"){
      classes += " active";
    }

    let accounts = [];
    for(let accountKey in this.props.accounts){
      accounts.push(this.props.accounts[accountKey]);
    }

    let accountsHtml = "";
    accountsHtml = accounts.map((account) => {
      let date = new Date(account.date);
      let dateAsStr = date.getDate()+"."+(date.getMonth() + 1)+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();

      return (<tr className="very-small word-break" key={account.id}><td>{account.obj.name}</td><td><AccountLoadButton account={account.obj}/></td></tr>);
    });

    return (
      <div className={classes}>
        <h2>Load a saved account</h2>
        <input id="new-account-name" type="text" placeholder="Account name"/><button onClick={() => {
          this.props.addAccount(document.querySelector("#new-account-name").value);
        }}>Add account</button>
        <p></p>
        <table id="accounts" className="primary">
          <thead>
            <tr className="word-break">
              <th>Account name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ accountsHtml }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
      currentPage: state.currentPage,
      currentBalance: state.currentBalance,
      expenses: state.expenses,
      accounts: state.accounts
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ addAccount: addAccount }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PageAccountsList);
