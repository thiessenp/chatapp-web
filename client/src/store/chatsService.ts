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