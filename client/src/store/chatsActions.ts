
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
export const GET_CHAT_LIST_REQUEST = 'GET_CHAT_LIST_REQUEST';
export const GET_CHAT_LIST_SUCCESS = 'GET_CHAT_LIST_SUCCESS';
export const GET_CHAT_LIST_FAILURE = 'GET_CHAT_LIST_FAILURE';

// Note: function pattern taken from (but modified :)
// https://github.com/cornflourblue/react-hooks-redux-registration-login-example/blob/master/src/_actions/user.actions.js
export function getChatListAction() {
    // Note: assuming arrow func is to closure this scope for, hmm something
    return async (dispatch) => {
        // Notify starting the http request
        dispatch(request());

        try {
            const chats = await requestGetChats();
            dispatch(success(chats));
        } catch(e) {
            console.log(1, e)
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_CHAT_LIST_REQUEST, payload: {}} }
    function success(chats) { return {type: GET_CHAT_LIST_SUCCESS, payload: chats} }
    function failure(error) { return {type: GET_CHAT_LIST_FAILURE, payload: error} }
}

export const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

export function getChatAction({chatId}) {
    return async (dispatch) => {
        dispatch(request());

        try {
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

// >>>>>>>>>>>>>>>>>>>>
// TODO:
// write out how to build chat DS and update it
// >>>>>>>>>>>>>>>>>>>>
