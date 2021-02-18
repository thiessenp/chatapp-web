import {useRef} from 'react';

export function Composer(props) {
    const composerRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);

    function createMessage(e) {
        e.preventDefault();
        // Check the message
        if (!messageRef.current || !messageRef.current.value) {
            alert('Composer createMessage expects message content');
            return;
        }
        // Send the message
        let content = messageRef.current.value;
        props.sendMessage({content});
        // Reset the composer for the next message
        messageRef.current.value = '';
    }

    function handleInputKeys(e) {}

    return (
        <section ref={composerRef} className="composerComponent">
            <h3>Compose a Message</h3>
            <form onSubmit={createMessage}>
                <input type="hidden" value={props.username} />
                <input ref={messageRef} onKeyDown={handleInputKeys} name="message" placeholder="Type a message" spellCheck="false" required />
                <button type="submit">Send</button>
            </form>
        </section>
    );
}
