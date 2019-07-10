import * as types from '../actions/actions';

export function messagesReducer(state = [], action) {

	switch (action.type) {		
		case types.SAVE_MESSAGES:
			return {
				messages: [...state, action.msg]
			}

		default:
			return state;
			
	}
}