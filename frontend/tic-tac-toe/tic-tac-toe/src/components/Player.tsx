import React, {useState} from "react";

interface PlayerProps {
    playerName: string,
    playerSymbol: string,
    isActive: boolean,
    onNameChange: (playerSymbol: string, newPlayerName: string) => void
}

export default function Player(props: PlayerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.playerName);

    function handleEditing() {
        setIsEditing(editing => !editing);
        if (isEditing) {
            props.onNameChange(props.playerSymbol, name);
        }
    }

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    return (
        <li className={props.isActive ? 'active' : undefined}>
            <span className='player'>
                {!isEditing && <span className='player-name'>{name}</span>}
                {isEditing && <input type="text" required defaultValue={name} onChange={handleNameChange}/>}
                <span className='player-symbol'>{props.playerSymbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
