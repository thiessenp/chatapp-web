/**
 * So sessionStorage:
 * - data in sessionStorage is cleared when the page session ends
 * - page session continues: page reload
 * - page session ends: open a new tab (same URL - each gets sessionStore)
 * - page session ends: closing tab
 */


// TODO: may want to check expires and check against server occasionally
export function isAuthenticated() {
    return window.sessionStorage.getItem('idToken') !== null;
}

export function getAuthentication() {
    return {
        idToken: window.sessionStorage.getItem('idToken'),
        expiresIn: window.sessionStorage.getItem('expiresIn')
    };
}

// Note: could also Stringify a JSON object {token, expires}
export function authenticate({idToken, expiresIn}) {
    window.sessionStorage.setItem('idToken', idToken);
    window.sessionStorage.setItem('expiresIn', expiresIn);
}

export function deauthenticate() {
    window.sessionStorage.removeItem('idToken');
    window.sessionStorage.removeItem('expiresIn');
}