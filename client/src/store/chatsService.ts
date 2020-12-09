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
    let result;
    // let chats: Array<Chat>;
    let chats;
    try { 
        result = await response.json();
        chats = result.data.chats;
        console.log('--chats', chats);
        return chats;
    } catch(e) {
        throw new Error('ERROR: requestGetChats serious failure, like JSON or CORS. ' + e.message);
        // return {status: 'error', message: e};
        // return [];
    }
}

export async function requestGetChat({chatId}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chatId}`, {
        headers: {
            ...account.getAuthHeader(),
        }
    });
    let result;
    // let chats: Array<Chat>;
    let chat;
    try { 
        result = await response.json();
        chat = result.data.chat;
        console.log('--chat', chat);
        return chat;
    } catch(e) {
        throw new Error('ERROR: requestGetChat serious failure, like JSON or CORS. ' + e.message);
        // return {status: 'error', message: e};
        // return [];
    }
}