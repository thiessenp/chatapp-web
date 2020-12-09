

export function Transcript(props) {
    console.log('--', props)
    return (
        <ol>
            {props.transcript && props.transcript.map(message => {
                return (
                    <li key={message.id}>id: {message.id}, {message.content}</li>
                )
            })}
        </ol>
    )
}