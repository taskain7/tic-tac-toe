import React, {useState} from "react";

interface PlayerProps {
    name: string,
    symbol: string,
    isActive: boolean,
    onPlayerNameChange: (playerSymbol: string, newPlayerName: string) => void
}

function Player(props: PlayerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);

    function handleEditClick() {
        setIsEditing(editing => !editing);
        if (isEditing) {
            props.onPlayerNameChange(props.symbol, name);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    return (
        <li className={props.isActive ? 'active' : undefined}>
            <span className='player'>
                {isEditing ?
                    <input type="text" required defaultValue={name} onChange={handleChange}/>
                    :
                    <span className='player-name'>{name}</span>
                }
                <span className='player-symbol'>{props.symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}

export default Player;
