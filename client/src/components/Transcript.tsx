export function Transcript(props) {
    return (
        <section>
            <h3>Transcript</h3>
            {props.transcript.length === 0 && 
                <div>No messages yet. Why not send one?</div>
            }

            {(props.transcript.length > 0 && 
                <ol>
                {(
                    props.transcript.map(message => {
                        return (
                            <li key={message.id}>{message.from_chat_user_username}: {message.content}</li>
                        )
                    })
                )}
                </ol>
            )}

        </section>
    )
}