import * as types from '../actions/actions';

export function userAdd(state = {usersList: []}, action) {
	
	switch (action.type) {
		case types.ADD_USER:
			return {
				// usersList: [...state, action.nick]
				usersList: state.usersList.push(action.nick)
			};

		default:
			return state;
	}
}