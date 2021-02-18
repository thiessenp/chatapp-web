import {Link, useRouteMatch} from 'react-router-dom';

export function ChatsList(props) {
    let {url} = useRouteMatch();

    return (
        <section className="chatListComponent">
            <h2>ChatsList</h2>
            <ol>
                {props.chats && props.chats.map(chat => {
                    return (
                        <li key={chat.id}><Link to={`${url}/${chat.id}`}>id: {chat.id}, {chat.name}</Link></li>
                    )
                })}
            </ol>
        </section>
    )
}