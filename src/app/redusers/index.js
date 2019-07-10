import { combineReducers } from 'redux';
import { messagesReducer } from './messages.js';
import { userAdd } from './user.js';
import { usersActions } from './usersActions.js';

export const rootReducer = combineReducers({
	messagesReducer,
	userAdd,
	usersActions
});