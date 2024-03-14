import GameTurn from "../classes/GameTurn";

interface LogProps {
    gameTurns: GameTurn[]
}

export default function Log(props: LogProps) {
    return (
        <li>
            {props.gameTurns.map(turn => <p>{turn.player} selected ({turn.square.row}, {turn.square.column})</p>)}
        </li>
    );
}
// X selected (1, 2)
