import React, { Component } from 'react';
import './AccountLoadButton.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {selectAccount} from '../actions/AccountLoadButton.js'

class AccountLoadButton extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }
  componentWillUnmount() {
    
  }

  render() {
  	return (<button onClick={() => {this.props.selectAccount(this.props.account.name)}}>Load</button>);
  }
}

function mapStateToProps(state){
	return {
      
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ selectAccount: selectAccount }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountLoadButton);
