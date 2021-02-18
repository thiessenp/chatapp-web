export function Roster(props) {

    return (
        <section className="rosterComponent">
            <h3>Roster</h3>

            {props.roster.length === 0 && 
                <div>No Users yet?</div>
            }

            {props.roster.length > 0 && 
                <ol>
                    {props.roster && props.roster.map(user => {
                        return (
                            <li key={user.id}>{user.username}</li>
                        )
                    })}
                </ol>
            }
        </section>
    )
}