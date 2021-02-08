import {ListNav} from 'keynav-web';
import {useRef, useEffect} from 'react';


export function Transcript(props) {
    const transcriptRef = useRef<HTMLOListElement>(null);
 
    // let listNav;
    // console.log('props.transcript', props.transcript)
    // console.log('transcriptRef', transcriptRef, transcriptRef.current && transcriptRef.current.children.length);

    useEffect(() => {
        // TODO:
        // - Check if this is a good way to add/rem behavior on dynamic lists?
        if (transcriptRef.current && transcriptRef.current.children.length) {
            const listNav = new ListNav({
                listEl: transcriptRef.current,
                listItemsSelector: 'li'
            });
            console.log('add behavior', listNav, transcriptRef.current.children.length);

            return () => {
                console.log('rem behavior')
                listNav.removeBehavior();
            }
        }
    }, [props]);

    return (
        <section>
            <h3>Transcript</h3>
            {props.transcript.length === 0 && 
                <div>No messages yet. Why not send one?</div>
            }

            {(props.transcript.length > 0 && 
                <ol ref={transcriptRef}>
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