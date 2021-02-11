
import { disconnect } from 'process';
import {requestGetChats} from '../services/chatsService';

// >>>>>>>>TESTS
// Note: could put Constants in a separate file, and or grouped into objects
// but this seems organized enough and way more convenient.
export const TEST = 'TEST';
export const testAction = (test) => ({
    type: 'TEST',
    payload: {data: 'test data'}
});
// >>>>>>>>END TESTS


export const GET_CHATS_REQUEST = 'GET_CHATS_REQUEST';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_FAILURE = 'GET_CHATS_FAILURE';

// export const chatsActions = {
//     getChatsAction
// };

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

// Can put combined above + dispatch in a function below, at least for complex
