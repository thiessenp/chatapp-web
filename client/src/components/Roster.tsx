

export function Roster(props) {
    console.log('--', props)
    return (
        <ol>
            {props.roster && props.roster.map(user => {
                return (
                    <li key={user.id}>id: {user.id}, {user.name}</li>
                )
            })}
        </ol>
    )
}