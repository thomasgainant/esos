export const selectAccount = (index) => {
	return {
		type: "SELECT_ACCOUNT",
		payload: index
	};
}

export const addAccount = (newAccount) => {
	return {
		type: "NEW_ACCOUNT",
		payload: newAccount
	};
}