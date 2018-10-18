//import low from 'lowdb';
//import LocalStorage from 'lowdb/adapters/LocalStorage';
import {combineReducers} from 'redux'
import utils from '../utils.js';

const uuidv4 = require('uuid/v4');

/*const adapter = new LocalStorage('db');
const db = low(adapter);*/

//db.defaults({ expenses: [], user: {}, accounts: [] }).write();

var firstLoad = true;

var currentUser = {};
var currentPage = "start";
var currentBalance = 0;
var currentAccountName = "Default account";
var accounts = {'Default account': {
        id: '1234',
        obj: {
          name: 'Default account',
          expenses: [
          ],
          user: {}
        }
      }};
//MOCK
/*accounts = {
      'Default account': {
        id: '3c06f2df-2741-4f95-97a6-5d5a4df4194f',
        obj: {
          name: 'Default account',
          expenses: [
            {
              id: '48f6c99d-53e4-4b68-b19b-a3f0043ee776',
              amount: 150,
              'expenseType': 'adjustement',
              'comment': '',
              'date': 1539766273
            },
            {
              id: '4ca6a0b5-96bc-4033-a0d2-0d4699641132',
              amount: 20,
              'expenseType': 'misc',
              'comment': '',
              'date': 1539766281
            },
            {
              id: '3152605e-c7ed-45bc-8fbe-0f3d7973b840',
              amount: 30,
              'expenseType': 'restaurant',
              'comment': '',
              'date': 1539766292
            }
          ],
          user: {}
        }
      },
      'N26': {
        id: '3ce757a4-7af3-4423-8104-b3da55703fbd',
        obj: {
          name: 'N26',
          expenses: [
            {
              id: '48f6c99d-53e4-4b68-b19b-a3f0043ee776',
              amount: 1400,
              'expenseType': 'adjustement',
              'comment': '',
              'date': 1539766273
            },
            {
              id: '4ca6a0b5-96bc-4033-a0d2-0d4699641132',
              amount: 30,
              'expenseType': 'misc',
              'comment': '',
              'date': 1539766281
            },
            {
              id: '3152605e-c7ed-45bc-8fbe-0f3d7973b840',
              amount: 30,
              'expenseType': 'restaurant',
              'comment': '',
              'date': 1539766292
            }
          ],
          user: {}
        }
      }
    };*/

var currentExpense = {
	amount: 20,
	'expenseType': 'misc',
	'comment': '',
	'date': 0
};
var expenses = [];

function saveToDB(){
	accounts[currentAccountName].obj.expenses = expenses;
	let dbContent = JSON.stringify(accounts);
	localStorage.setItem("accounts", dbContent);
}

function loadFromDB(index){
	let dbContent = localStorage.getItem("accounts");
	if(dbContent != null){
		accounts = JSON.parse(dbContent);
		expenses = accounts[index].obj.expenses;
		currentUser = {};
	}
}

function calculateCurrentBalance(){
	let result = 0;
	for(let key in expenses){
		let expense = expenses[key];
		if(expense.expenseType == "adjustement"){
			if(expense.comment != ""){
				result = parseFloat(expense.comment);
			}
			else{
				result = expense.amount;
			}
		}
		else if(expense.expenseType == "wage"){
			if(expense.comment != ""){
				result += parseFloat(expense.comment);
			}
			else{
				result += expense.amount;
			}
		}
		else{
			result -= expense.amount;
		}
	}
	currentBalance = result;
}

function postDispatch(objToReturn){
	if(firstLoad){
		firstLoad = false;
		loadFromDB("Default account");
	}
	calculateCurrentBalance();

	return objToReturn;
}

function currentUserReducer(state={}, action){
	switch(action.type){
		case "LOGIN":	
			currentUser = action.user;
		break;
		case "DISCONNECT":
			currentUser = {};
		break;
	}

	return postDispatch(currentUser);
}

function currentPageReducer(state="addexpense", action){
	switch(action.type){
		case "SELECT_PAGE":
			currentPage = action.payload;
		break;
	}
	return postDispatch(currentPage);
}

function currentBalanceReducer(state=0, action){
	switch(action.type){
		case "":
			
		break;
	}
	return postDispatch(currentBalance);
}

function currentExpenseReducer(state={
	'amount': 5,
	'expenseType': 'misc',
	'comment': '',
	'date': 0
}, action){
	switch(action.type){
		case "SET_ADDEXPENSE_AMOUNT":
			currentExpense.amount = action.payload;
		break;
		case "SET_ADDEXPENSE_EXPENSETYPE":
			currentExpense.expenseType = action.payload;
		break;
		case "SET_ADDEXPENSE_COMMENT":
			currentExpense.comment = action.payload;
		break;
	}
	return postDispatch(currentExpense);
}

function expensesReducer(state=[], action){
	switch(action.type){
		case "ADDEXPENSE":
			var newExpense = {};
			for(let key in action.payload){
				newExpense[key] = action.payload[key];
			}
			var newId = uuidv4();
			newExpense.id = newId;
			newExpense.date = new Date().getTime();

			if(newExpense.expenseType != "adjustement" && newExpense.expenseType != "wage" && currentBalance <= 0){
				console.log("Cannot add this expense");
			}
			else{
				expenses.push(newExpense);
				currentExpense = {
					amount: 5,
					'expenseType': 'misc',
					'comment': '',
					'date': 0
				};
				currentPage = "expenseslist";

				saveToDB();
			}
		break;

		case "REMOVEEXPENSE":
			let expenseKey = "";
			for(let key in expenses){
				if(expenses[key].id == action.payload.id){
					expenseKey = key;
				}
			}
			if(expenseKey != ""){
				expenses.splice(expenseKey, 1);
				saveToDB();
			}
			
			currentPage = "expenseslist";
		break;
	}
	return postDispatch(expenses);
}

function currentAccountNameReducer(state=[], action){
	switch(action.type){
		case "SELECT_ACCOUNT":
			currentAccountName = action.payload;
			loadFromDB(currentAccountName);
			currentPage = "expenseslist";
		break;
	}
	return postDispatch(currentAccountName);
}

function accountsReducer(state=[], action){
	switch(action.type){
		case "NEW_ACCOUNT":
			currentAccountName = action.payload;
			expenses = [];

			accounts[currentAccountName] = {
				id: uuidv4(),
				obj: {
					name: currentAccountName,
					expenses: [],
					user: {}
				}
			};

			saveToDB();
			currentPage = "addexpense";
		break;
	}
	return postDispatch(accounts);
}

const all = combineReducers({
	currentUser: currentUserReducer,
	currentAccountName: currentAccountNameReducer,
	currentExpense: currentExpenseReducer,
	expenses: expensesReducer,
	currentBalance: currentBalanceReducer,
	accounts: accountsReducer,
	currentPage: currentPageReducer
})

export default all;