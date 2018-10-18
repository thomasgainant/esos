import React, { Component } from 'react';
import './PageStart.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {selectAddExpensePage} from '../actions/PageStart.js';
import {selectExpensesListPage} from '../actions/PageStart.js';
import {selectAccountsListPage} from '../actions/PageStart.js';

class PageStart extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.canvas = document.querySelector("#logo");
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle="#0074d9";
    this.ctx.translate((this.canvas.offsetWidth/2.0) - (this.canvas.offsetWidth/8.0), (this.canvas.offsetHeight/2.0));
    this.ctx.rotate(135.0*Math.PI/180.0);
    this.ctx.fillRect(- (this.canvas.offsetWidth/4.0), -(this.canvas.offsetHeight/32.0) - (this.canvas.offsetHeight/8.0)/2,(this.canvas.offsetWidth/2.0),(this.canvas.offsetHeight/8.0));

    this.ctx.strokeStyle="#0074d9";
    this.ctx.lineWidth=(this.canvas.offsetHeight/8.0);
    this.ctx.beginPath();
    this.ctx.moveTo(-(this.canvas.offsetWidth/4.0), 0);
    //this.ctx.lineTo(20,100);
    this.ctx.arc(
      -(this.canvas.offsetWidth/4.0),
      -(this.canvas.offsetWidth/8.0),
      (this.canvas.offsetWidth/8.0),
      0,
      Math.PI,
      true);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(
      -(this.canvas.offsetWidth/4.0),
      0,
      (this.canvas.offsetHeight/8.0)/2,
      0,
      2*Math.PI,
      true);
    this.ctx.fill();
    this.ctx.closePath();
  }

  render() {
  	let classes = "page align-center";
    if(this.props.currentPage == "start"){
      classes += " active";
    }

    return (
      <div className={classes}>
      <canvas id="logo"></canvas>
      <h1 id="logo-name">esos</h1>
			<div className="flex demo two">
				<div><a className="button error" onClick={this.props.selectAddExpensePage}><span className="icons very-very-big"></span><br/>Add expense</a></div>
        <div><a className="button success" onClick={this.props.selectExpensesListPage}><span className="icons very-very-big"></span><br/>Expenses</a></div>
        <div><a className="button warning" onClick={this.props.selectAccountsListPage}><span className="icons very-very-big"></span><br/>Accounts</a></div>
			</div>
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
  return bindActionCreators({ selectAddExpensePage: selectAddExpensePage, selectExpensesListPage: selectExpensesListPage, selectAccountsListPage: selectAccountsListPage }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PageStart);
