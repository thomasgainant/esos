export const selectStartPage = () => {
	return {
		type: "SELECT_PAGE",
		payload: "start"
	};
}


export const selectAddExpensePage = () => {
	return {
		type: "SELECT_PAGE",
		payload: "addexpense"
	};
}

export const selectExpensesListPage = () => {
	return {
		type: "SELECT_PAGE",
		payload: "expenseslist"
	};
}

export const selectAccountsListPage = () => {
	return {
		type: "SELECT_PAGE",
		payload: "accountslist"
	};
}