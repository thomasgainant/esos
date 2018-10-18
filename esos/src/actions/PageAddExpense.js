export const setAddExpenseAmount = (amount) => {
	return {
		type: "SET_ADDEXPENSE_AMOUNT",
		payload: amount
	};
}

export const setAddExpenseType = (type) => {
	return {
		type: "SET_ADDEXPENSE_EXPENSETYPE",
		payload: type
	};
}

export const setAddExpenseComment = (comment) => {
	return {
		type: "SET_ADDEXPENSE_COMMENT",
		payload: comment
	};
}

export const addExpense = (expense) => {
	return {
		type: "ADDEXPENSE",
		payload: expense
	};
}