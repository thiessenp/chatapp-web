// TODO: write out how to build chat DS and update it

import {requestGetChats, requestGetChat} from '../services/chatsService';


// >>>>>>>>TESTS
// Note: could put Constants in a separate file, and or grouped into objects
// but this seems organized enough and way more convenient.
export const TEST = 'TEST';
export const testAction = (test) => ({
    type: 'TEST',
    payload: {data: 'test data'}
});
// >>>>>>>>END TESTS


// Note: could group into an object also
export const GET_CHATS_REQUEST = 'GET_CHATS_REQUEST';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_FAILURE = 'GET_CHATS_FAILURE';

// Note: function pattern taken from (but modified :)
// https://github.com/cornflourblue/react-hooks-redux-registration-login-example/blob/master/src/_actions/user.actions.js
export function getChatsAction({isAllData}) {
    // Note: assuming arrow func is to closure this scope for, hmm something
    return async (dispatch) => {
        // Notify starting the http request
        dispatch(request());

        try {
            const chats = await requestGetChats({isAllData});
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
    return async (dispatch) => {
        dispatch(request());

        try {
            console.log(1)
            const chat = await requestGetChat({chatId});
            dispatch(success(chat));
        } catch(e) {
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_CHAT_REQUEST, payload: {}} }
    function success(chat) { return {type: GET_CHAT_SUCCESS, payload: chat} }
    function failure(error) { return {type: GET_CHAT_FAILURE, payload: error} }
}

