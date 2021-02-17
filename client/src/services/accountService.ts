import {IAccount} from '../store/accountReducer';


// TODO: security issue with API allowing account lookups of not "my" username?
export async function login({username, password}) {
    // Login - holds idToken and expiresIn
    const responseLogin = await requestPostLogin({username, password});
    const resultLogin = await responseLogin.json();
    if (resultLogin.status === 'error') {
        throw new Error(resultLogin.message)
    }

    // Get account - holds id and username 
    const responseAccount = await requestGetAccount({username, idToken: resultLogin.idToken});
    const resultAccount = await responseAccount.json();
    if (resultAccount.status === 'error') {
        throw new Error(resultAccount.message)
    }

    const accountData:IAccount = {
        ...resultLogin,
        ...resultAccount
    };

    return accountData;
}


async function requestPostLogin({username, password}) {
    const response = await fetch(process.env.REACT_APP_API_URL + '/accounts/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    });
    return response;
}


async function requestGetAccount({username, idToken}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${username}`, {
        headers: {
            ...getAuthHeader({idToken}),
        }
    });
    return response;
}


export function getAuthHeader({idToken}) {
    return {'Authorization': `Bearer ${idToken}`};
}


// TODO: add check for isExpired? maybe other stuff?
export function isAuth(account:IAccount) {
    return Boolean(account.isAuthenticated);
}









////////////////////////////////////////////////////////////////////////////////
// DEPRECATED beyond this point /o\ beware!
////////////////////////////////////////////////////////////////////////////////


/**
 * Account Service uses Session Storage
 * 
 * So sessionStorage:
 * - data in sessionStorage is cleared when the page session ends
 * - page session continues: page reload
 * - page session ends: open a new tab (same URL - each gets sessionStore)
 * - page session ends: closing tab
 * 
 * BIG BONUS?
 * - No cleanup, all session data cleared on tab/browser close.
 */

 // class Account
class Account {

    getAccount() {
        return {
            id: window.sessionStorage.getItem('id') || '',
            username: window.sessionStorage.getItem('username') || '',
            idToken: window.sessionStorage.getItem('idToken') || '',
            expiresIn: window.sessionStorage.getItem('expiresIn') || '',
            isAuthenticated: window.sessionStorage.getItem('idToken') ? true : false
        };
    }

    setId(id) { window.sessionStorage.setItem('id', id); }

    setUsername(username) { window.sessionStorage.setItem('username', username); }

    setIdToken(idToken) { window.sessionStorage.setItem('idToken', idToken); }

    setExpiresIn(expiresIn) { window.sessionStorage.setItem('expiresIn', expiresIn); }

    // TODO: may want to check expires and check against server occasionally
    isAuthenticated() {
        return window.sessionStorage.getItem('idToken') !== null;
    }

    // TODO: security issue with API allowing account lookups of not "my" username?
    async login({username, password}) {
        // Login
        try {
            const responseLogin = await this.requestPostLogin({username, password});
            const resultLogin = await responseLogin.json();
        
            if (resultLogin.status === 'error') {
                throw new Error(resultLogin.message)
            }

            // Successful login, store auth info
            this.setIdToken(resultLogin.idToken);
            this.setExpiresIn(resultLogin.expiresIn);
        } catch(err) {
            return {success: false, message: err};
        }

        // Get account
        try {
            const responseAccount = await this.requestGetAccount({username});
            const resultAccount = await responseAccount.json();

            if (resultAccount.status === 'error') {
                throw new Error(resultAccount.message)
            }

            // Get account info based on username
            this.setId(resultAccount.data.account.id);
            this.setUsername(username);
        } catch(err) {
            return {success: false, message: err};
        }

        return {success: true};
    }

    // returns authorization header with jwt token
    // Note: consider moving into a helper with other helpers somewhere?
    getAuthHeader() {
        const idToken =  this.getAccount().idToken;
        return {'Authorization': `Bearer ${idToken}`};
    }

    async requestPostLogin({username, password}) {
        const response = await fetch(process.env.REACT_APP_API_URL + '/accounts/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        return response;
    }

    async requestGetAccount({username}) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${username}`, {
            headers: {
                ...this.getAuthHeader(),
            }
        });
        return response;
    }
}


// export an instance of it
const account = new Account();
export {account}




// DEPRECATED

// export async function requestPostlogin({username, password}) {
//     // TEMP COMMENTS - fails, just send text in the Body as JSON for form POSTS
//     // let formData = new FormData();
//     // formData.append('username', username);
//     // formData.append('password', password);
//     // Note: Do not set the content-type header.
//     // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     // let formData = new FormData(formRef.current.value);
//     // body: formData,

//     const response = await fetch(process.env.REACT_APP_API_URL + '/accounts/login', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({username, password})
//     });
//     return response;
// }

// export async function requestGetAccount({username}) {
//     const token =  getAuthentication()?.idToken || '';
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${username}`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             // 'Content-Type': 'application/x-www-form-urlencoded'
//         }
//         // Cannot send body with Fetch: https://bugs.chromium.org/p/chromium/issues/detail?id=455096
//         // body: 'test'
//     });
//     return response;
// }

// export function account() {
//     return {
//         id: window.sessionStorage.getItem('id'),
//         username: window.sessionStorage.getItem('username')
//     };
// }

// export function updateAccount({id, username}) {
//     window.sessionStorage.setItem('id', id);
//     window.sessionStorage.setItem('username', username);
// }

// // TODO: may want to check expires and check against server occasionally
// export function isAuthenticated() {
//     return window.sessionStorage.getItem('idToken') !== null;
// }

// export function getAuthentication() {
//     return {
//         idToken: window.sessionStorage.getItem('idToken'),
//         expiresIn: window.sessionStorage.getItem('expiresIn')
//     };
// }

// // Note: could also Stringify a JSON object {token, expires}
// export function authenticate({idToken, expiresIn}) {
//     window.sessionStorage.setItem('idToken', idToken);
//     window.sessionStorage.setItem('expiresIn', expiresIn);
// }

// export function deauthenticate() {
//     window.sessionStorage.removeItem('idToken');
//     window.sessionStorage.removeItem('expiresIn');
// }
