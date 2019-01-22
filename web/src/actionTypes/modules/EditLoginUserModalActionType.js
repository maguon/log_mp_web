import {createAction} from 'redux-actions';

export const setLoginPassword = createAction('SET_LOGIN_USER_PASSWORD');
export const setNewLoginPassword = createAction('SET_LOGIN_USER_NEW_PASSWORD');
export const setRepeatLoginPassword = createAction('SET_LOGIN_USER_REPEAT_PASSWORD');