import {ChatsListItem} from './ChatsListItem';


export function ChatsList(props) {
    return (
        <section className="chatListComponent">
            <h2>ChatsList</h2>
            <ol>
                {props.chats && props.chats.map(chat => (
                    <ChatsListItem 
                        key={chat.id} 
                        id={chat.id} 
                        name={chat.name} />
                ))}
            </ol>
        </section>
    )
}
