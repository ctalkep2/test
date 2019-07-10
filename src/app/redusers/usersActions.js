import * as types from '../actions/actions';

export function usersActions(
	state = {userLogin: false, currentUser: 'empty'}, action) {

	switch (action.type) {
		case types.CURRENT_USER:
			return {
				...state,
				userLogin: true,
				currentUser: action.nick
			}

		case types.USER_LOGOUT:
			return {
				...state,
				usersList: state.usersList.filter(nick => nick.name !== action.name),
				userLogin: false,
				currentUser: 'empty'
			}

		default:
			return state;
	}
}