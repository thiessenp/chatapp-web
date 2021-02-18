import {ListNav} from 'keynav-web';
import {useState, useRef, useEffect} from 'react';


export function Transcript(props) {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [listNav, setListNav] = useState<any>({});
    
    const transcriptRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        return () => {
            // NOT WORKING - but works when add a break point?
            console.log('listNav.removeBehavior', listNav.removeBehavior);
            if (listNav.removeBehavior) {
                // listNav.removeBehavior();
                console.log('(to test) did it listNav.removeBehavior', listNav.removeBehavior);
            }
        }
    }, []);

    useEffect(() => {
        // Add keynav to Transcript once loaded (once!)
        if ((props.transcript.length > 0) && initialized === false) {
            setListNav(new ListNav({
                listEl: transcriptRef.current,
                listItemsSelector: 'li'
            }));
            setInitialized(true);
            console.log('initialized=', initialized);
        }
    }, [props.transcript, initialized]);

    return (
        <section className="transcriptComponent">
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

/**
Could do styles like this
const styles = {
  count: css`
    font-size: 12px;
  `,
  lastUpdated: css`
    color: #666;
    font-size: 10px;
  `,
  todos: css`
    padding-left: 0;
  `,
};
 */