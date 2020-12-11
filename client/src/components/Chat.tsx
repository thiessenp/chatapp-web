import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {requestGetChat} from '../store/chatsService';
import {Transcript} from './Transcript';
import {Roster} from './Roster';

export function Chat(/*props*/) {
    let [chat, setChat] = useState<any>({});
    let [transcript, setTranscript] = useState<any[]>([]);
    let [roster, setRoster] = useState<any[]>([]);
    let {chatId} = useParams();

    useEffect(() => {
        (async () => {
            const chatData = await requestGetChat({chatId});
            setChat(chatData);
            setTranscript(chatData.transcript);
            setRoster(chatData.roster);
        })();
    }, [chatId /*, props*/]);

    return (
        <section>
            <h3>Chat: {chat && chat.name}</h3>

            <Roster roster={roster} />

            <Transcript transcript={transcript} />
        </section>
    )
}