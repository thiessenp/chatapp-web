import {Link, useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {activeChat} from '../store/chatDataActions';


export function ChatsListItem(props) {
    let {url} = useRouteMatch();
    const dispatch = useDispatch();
    const activeChatId = useSelector(state => state.chatData.activeChatId);

    function setActiveChat(e) {
        dispatch(activeChat({chatId: props.id}));
    }

    return (
        <li className={props.id===activeChatId ? 'active' : ''}>
            <Link to={`${url}/${props.id}`} onClick={setActiveChat}>
                    {/* id: {props.chatId},  */}
                    {props.name}
            </Link>
        </li>
    )
}