// TODO: write out how to build chat DS and update it
import {requestGetChats, requestGetChat, requestAddUserTochat} from '../services/chatsService';


// Note: could group into an object also
export const GET_CHATS_REQUEST = 'GET_CHATS_REQUEST';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_FAILURE = 'GET_CHATS_FAILURE';

// Note: function pattern taken from (but modified :)
// https://github.com/cornflourblue/react-hooks-redux-registration-login-example/blob/master/src/_actions/user.actions.js
export function getChatsAction({isAllData}) {
    // Note: assuming arrow func is to closure this scope for, hmm something
    return async (dispatch, getState) => {
        const account = getState().account;

        // Notify starting the http request
        dispatch(request());

        try {
            const chats = await requestGetChats({account, isAllData});
            dispatch(success(chats));
        } catch(e) {
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_CHATS_REQUEST, payload: {}} }
    function success(chats) { return {type: GET_CHATS_SUCCESS, payload: chats} }
    function failure(error) { return {type: GET_CHATS_FAILURE, payload: error} }
}


export const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

export function getChatAction({chatId}) {
    return async (dispatch, getState) => {
        const account = getState().account;

        dispatch(request());

        try {
            const chat = await requestGetChat({account, chatId});
            dispatch(success(chat));
        } catch(e) {
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_CHAT_REQUEST, payload: {}} }
    function success(chat) { return {type: GET_CHAT_SUCCESS, payload: chat} }
    function failure(error) { return {type: GET_CHAT_FAILURE, payload: error} }
}


export const ADD_USER_TO_CHAT_REQUEST = 'ADD_USER_TO_CHAT_REQUEST';
export const ADD_USER_TO_CHAT_SUCCESS = 'ADD_USER_TO_CHAT_SUCCESS';
export const ADD_USER_TO_CHAT_FAILURE = 'ADD_USER_TO_CHAT_FAILURE';

export function addUserTochat({chatId, accountId}) {
    return async (dispatch, getState) => {
        const account = getState().account;

        dispatch(request());

        try {
            const {id} = await requestAddUserTochat({account, chatId, accountId});
            dispatch(success({chatId, chatUserId: id}));
        } catch(e) {
            dispatch(failure(e));
        }
    };

    function request() { return {type: ADD_USER_TO_CHAT_REQUEST, payload: {}} }
    function success({chatId, chatUserId}) { return {type: ADD_USER_TO_CHAT_SUCCESS, payload: {chatId, chatUserId}} }
    function failure(error) { return {type: ADD_USER_TO_CHAT_FAILURE, payload: error} }
}
