import {account} from '../services/accountService';


// Note: could group into an object also
export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILURE = 'GET_LOGIN_FAILURE';

export function getLoginAction({username, password}) {
    // Note: assuming arrow func is to closure this scope for, hmm something
    return async (dispatch) => {
        // TODO: NOTE: would also be caught below
        if (!username || !password) {
            dispatch(failure('Login missing username or password'));
        }

        // Notify starting the http request
        dispatch(request());

        try {
            const accountResult = await account.login({
                username: username.trim(), 
                password: password.trim()
            });

            dispatch(success(accountResult));
        } catch(e) {
            console.log('Failed to login', e);
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_LOGIN_REQUEST, payload: {}} }
    function success(accountResult) { return {type: GET_LOGIN_SUCCESS, payload: accountResult} }
    function failure(error) { return {type: GET_LOGIN_FAILURE, payload: error} }
}

// TODO: logoutAction() - redirect login

