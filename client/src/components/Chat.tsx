

export function Chat(props) {
    console.log('--', props)
    return (
        <section>
            <h3>Chat: {props.chat && props.chat.name}</h3>
        </section>
    )
}