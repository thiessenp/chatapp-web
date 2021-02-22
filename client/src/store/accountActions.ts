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
/*
e.g.
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

*/

