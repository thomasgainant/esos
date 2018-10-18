export const removeExpense = (expense) => {
	return {
		type: "REMOVEEXPENSE",
		payload: expense
	};
}