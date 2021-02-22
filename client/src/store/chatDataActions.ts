export const ACTIVE_CHAT = 'ACTIVE_CHAT';

export function activeChat({chatId}) {
    return async (dispatch) => {
        dispatch({type: ACTIVE_CHAT, payload: { activeChatId: chatId }});
    }
}