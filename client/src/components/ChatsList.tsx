

export function ChatsList(props) {
    return (
        <section>
            <h2>ChatsList</h2>
            <ol>
                {props.chats && props.chats.map(chat => {
                    return (
                        <li key={chat.id}>id: {chat.id}, {chat.name}</li>
                    )
                })}
            </ol>
        </section>
    )
}