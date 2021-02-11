// TODO
// consider, should a service return data or more likely the promise called?

import {account} from './accountService';

export interface Chat {
    id: string,
    name: string
}


export async function requestGetChats() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/chats', {
        headers: {
            ...account.getAuthHeader(),
        }
    });

    try { 
        // throw new Error('ERROR: requestGetChats serious failure, like JSON or CORS');

        let result = await response.json();
        let chats = result.data.chats;
        return chats;
    } catch(e) {
        throw new Error('ERROR: requestGetChats serious failure, like JSON or CORS. ' + e.message);
    }
}


export async function requestGetChat({chatId}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chatId}`, {
        headers: {
            ...account.getAuthHeader(),
        }
    });

    try { 
        let result = await response.json();
        let chat = result.data.chat;
        return chat;
    } catch(e) {
        throw new Error('ERROR: requestGetChat serious failure, like JSON or CORS. ' + e.message);
    }
}

export async function requestAddUserTochat({chatId, accountId}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chatId}/users`, {
        method: 'POST',
        headers: {
            ...account.getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({chatId, accountId})
    });

    try { 
        let result = await response.json();

        if (result.status === 'error') {
            throw new Error(result.message);
        }

        let user = result.data.user;
        return user;
    } catch(e) {
        // TODO: error handling service?
        throw new Error(e.message);
    }
}

export async function requestPostMessage({chatId, fromChatUserId, toChatUserId, content}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
            ...account.getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({chatId, fromChatUserId, toChatUserId, content})
    });

    // TODO:
    return response;
}