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
export function getChatsAction() {
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


export const START_CHAT_POLLING = 'START_CHAT_POLLING';

const pollingData = {};
const pollingDelay = 2000; // ms

export function startChatPolling({chatId}) {

    return async (dispatch) => {
        if (!pollingData[chatId]) {
            pollingData[chatId] = { isPolling: true }
        }
    
        (function doPolling() {
            if (!pollingData[chatId].isPolling) { return; }

            setTimeout(() => {
                dispatch(getChatAction({chatId}));
                doPolling();
            }, pollingDelay);
        })();

        dispatch(success(chatId));
    };

    function success(chatId){ return {type: START_CHAT_POLLING, payload: chatId}};
}


export const STOP_CHAT_POLLING = 'STOP_CHAT_POLLING';

export function stopChatPolling({chatId}) {
    pollingData[chatId] = { isPolling: false }

    return async (dispatch) => {
        dispatch(success(chatId));
    };

    function success(chatId){ return {type: STOP_CHAT_POLLING, payload: chatId}};
}
