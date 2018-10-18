import React, { Component } from 'react';
import './PageAddExpense.css';

import utils from '../utils.js'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {setAddExpenseAmount} from '../actions/PageAddExpense.js';
import {setAddExpenseType} from '../actions/PageAddExpense.js';
import {setAddExpenseComment} from '../actions/PageAddExpense.js';
import {addExpense} from '../actions/PageAddExpense.js';

class PageAddExpense extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.initCanvas();
    this.interval = setInterval(() => {
      this.setState({ time: Date.now() });
      this.updateCanvas(this.canvas, this.ctx);
    }, 50);
    this.canvasAngle = 0;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initCanvas(){
    var that = this;

    this.canvas = document.querySelector("#amount-canvas");    
    this.ctx = this.canvas.getContext("2d");

    // Make it visually fill the positioned parent
    this.canvas.style.width ='100%';
    this.canvas.style.height='100%';
    // ...then set the internal size to match
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    let canvasWidth = this.canvas.offsetWidth;
    let canvasHeight = this.canvas.offsetHeight;

    this.ctx.beginPath();
    this.ctx.arc(canvasWidth/2.0, canvasHeight/2.0, canvasHeight / 2.0, 0, (this.props.currentExpense.amount/this.props.currentBalance) * Math.PI);
    //this.ctx.arc(canvasWidth/2.0, canvasHeight/2.0, canvasHeight / 2.0, 0, this.canvasAngle * Math.PI);
    this.ctx.stroke();

    this.canvas.addEventListener("touchstart", function (e) {
      that.canvasTouchDown(e);
      that.canvasTouchMove(e);
    }, false);
    this.canvas.addEventListener("touchend", function (e) {
      that.canvasTouchUp(e);
    }, false);
    this.canvas.addEventListener("touchmove", function (e) {
      that.canvasTouchMove(e);
    }, false);
  }

  canvasTouchDown(e){
    this.drawing = true;
    this.lastPos = this.getMousePos(this.canvas, e);
  }

  canvasTouchUp(e){
    this.drawing = false;
  }

  canvasTouchMove(e){
    this.mousePos = this.getMousePos(this.canvas, e);

    let angle = 0;
    if(this.mousePos.x < this.canvas.width / 2.0){
      if(this.mousePos.y < this.canvas.height / 2.0){
        let x = (this.canvas.width / 2.0) - this.mousePos.x;
        let y = (this.canvas.height / 2.0) - this.mousePos.y;

        let res = Math.tan(y/x);
        res = res * (180 / Math.PI);
        //console.log(res);

        angle = 270 + res;
      }
      else{
        let x = (this.canvas.width / 2.0) - this.mousePos.x;
        let y = this.mousePos.y - (this.canvas.height / 2.0);

        let res = Math.tan(y/x);
        res = res * (180 / Math.PI);
        //console.log(res);

        angle = 270 - res;
      }
    }
    else{
      if(this.mousePos.y < this.canvas.height / 2.0){
        let x = this.mousePos.x - (this.canvas.width / 2.0);
        let y = (this.canvas.height / 2.0) - this.mousePos.y;

        let res = Math.tan(y/x);
        res = res * (180 / Math.PI);
        //console.log(res);

        angle = 90 - res;
      }
      else{
        let x = this.mousePos.x - (this.canvas.width / 2.0);
        let y = this.mousePos.y - (this.canvas.height / 2.0);

        let res = Math.tan(y/x);
        res = res * (180 / Math.PI);
        //console.log(res);

        angle = 90 + res;
      }
    }

    this.canvasAngle = angle;
    //console.log(parseFloat(this.props.currentBalance) * (this.canvasAngle / 360.0));
    this.props.setAddExpenseAmount(this.props.currentBalance * (this.canvasAngle / 360.0));
  }

  getMousePos(canvasDom, e) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }

  updateCanvas(canvas, ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#efefef";
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.fill();

    ctx.fillStyle = '#0074d9';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2,
      0, 0 + (Math.PI * 2 * (this.props.currentExpense.amount / this.props.currentBalance)), false);
      //0, this.canvasAngle * Math.PI, false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = (canvas.height/3.0)+"px Arial";
    ctx.lineWidth = (canvas.height/50.0);
    ctx.strokeText(this.props.currentExpense.amount+"€", (canvas.height/10.0), (canvas.height/10.0) + (canvas.height/3.0));
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.props.currentExpense.amount+"€", (canvas.height/10.0), (canvas.height/10.0) + (canvas.height/3.0));
  }

  render() {
  	let classes = "page";
    if(this.props.currentPage == "addexpense"){
      classes += " active";
    }

    let maxAmount = this.props.currentBalance;
    if(this.props.currentBalance <= 0 || this.props.currentExpense.expenseType == "adjustement" || this.props.currentExpense.expenseType == "wage"){
      maxAmount = 100000;
    }

    let percentage = 0;
    if(this.props.currentBalance != 0){
      percentage = Math.ceil((this.props.currentExpense.amount/this.props.currentBalance)*100.0);
    }

    return (
      <div id="page-addexpense" className={classes}>
        <h2>{this.props.currentAccountName} - Add an expense</h2>

        <h4>Type: {this.props.currentExpense.expenseType} - {percentage}% of {this.props.currentBalance}€</h4>
        <div id="amount-wrapper">
          <canvas id="amount-canvas"></canvas>
        </div>
        <input type="range" min="5" max={ maxAmount } value={this.props.currentExpense.amount} onChange={() => {}} step="5" className="slider" onInput={ () => {
          this.props.setAddExpenseAmount(document.querySelector("#amount-range").value);
        }} id="amount-range"/>

        <div className="clear"></div>

        <div className="align-center">
          <div className="inline-block very-very-small-margin"><span className="icons very-big" onClick={() =>{
            let addExpenseOptions = document.querySelectorAll(".add-expense-option");
            for(let key in addExpenseOptions){
              if(addExpenseOptions[key].className != null && !addExpenseOptions[key].className.includes("collapsed")){
                addExpenseOptions[key].className += " collapsed";
              }
            }

            let amountSelector = document.querySelector("#amount-selector");
            if(amountSelector.className.includes("collapsed")){
              amountSelector.className = amountSelector.className.replace(" collapsed", "");
            }
            else{
              amountSelector.className += " collapsed";
            }
          }}></span></div>
          <div className="inline-block very-very-small-margin"><span className="icons very-big" onClick={() =>{
            let addExpenseOptions = document.querySelectorAll(".add-expense-option");
            for(let key in addExpenseOptions){
              if(addExpenseOptions[key].className != null && !addExpenseOptions[key].className.includes("collapsed")){
                addExpenseOptions[key].className += " collapsed";
              }
            }

            let typeSelector = document.querySelector("#type-selector");
            if(typeSelector.className.includes("collapsed")){
              typeSelector.className = typeSelector.className.replace(" collapsed", "");
            }
            else{
              typeSelector.className += " collapsed";
            }
          }}></span></div>
          <div className="inline-block very-very-small-margin"><span className="icons very-big" onClick={() =>{
            let addExpenseOptions = document.querySelectorAll(".add-expense-option");
            for(let key in addExpenseOptions){
              if(addExpenseOptions[key].className != null && !addExpenseOptions[key].className.includes("collapsed")){
                addExpenseOptions[key].className += " collapsed";
              }
            }

            let commentSection = document.querySelector("#comments");
            if(commentSection.className.includes("collapsed")){
              commentSection.className = commentSection.className.replace(" collapsed", "");
            }
            else{
              commentSection.className += " collapsed";
            }
          }}></span></div>
        </div>

        <div id="amount-selector" className="add-expense-option flex three demo collapsed">
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(5);}}>5€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(10);}}>10€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(15);}}>15€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(20);}}>20€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(25);}}>25€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(30);}}>30€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(35);}}>35€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(40);}}>40€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(45);}}>45€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(50);}}>50€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(55);}}>55€</a></div>
          <div className="col"><a className="button" onClick={() => {this.props.setAddExpenseAmount(60);}}>60€</a></div>
        </div>

        <div id="type-selector" className="add-expense-option collapsed">
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('wage');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Wage
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('adjustement');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Adjustement
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('misc');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Misc.
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('cash');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Cash withdraw
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('saving');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Saving
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('bar');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Bar
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('club');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Club
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('restaurant');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Restaurant
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('groceries');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Groceries
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('shopping');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Shopping
            </span>
          </label>
          <label className="stack">
            <input name="stack" type="radio" onClick={() => {this.props.setAddExpenseType('concert');}}/>
            <span className="button toggle">
              <span className="icons very-big"></span> Concert
            </span>
          </label>
        </div>

        <div id="comments" className="add-expense-option collapsed">
          <input id="addExpenseComment" onChange={() => {
            this.props.currentExpense.comment = document.querySelector("#addExpenseComment").value;
          }} type="text" placeholder="Comments"/>
        </div>

        <h4></h4>
        <div className="flex two demo">
          <div className="col"><a className="button" onClick={() => {this.props.addExpense(this.props.currentExpense);}}>Add expense</a></div>
          <div className="col" style={{display: 'none'}}><a className="button outline" onClick={() => {this.props.addExpense(this.props.currentExpense);}}>Save as draft</a></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
      currentAccountName: state.currentAccountName,
    	currentPage: state.currentPage,
      currentBalance: state.currentBalance,
      currentExpense: state.currentExpense
	};
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ setAddExpenseAmount: setAddExpenseAmount, setAddExpenseType: setAddExpenseType, setAddExpenseComment: setAddExpenseComment, addExpense: addExpense }, dispatch);
}

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

export default connect(mapStateToProps, matchDispatchToProps)(PageAddExpense);
