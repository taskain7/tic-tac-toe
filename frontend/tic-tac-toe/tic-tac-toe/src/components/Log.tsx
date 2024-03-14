import GameTurn from "../classes/GameTurn";

interface LogProps {
    turns: GameTurn[]
}

function Log(props: LogProps) {

    return (
        <ol id="log">
            {props.turns.map(turn => <li key={`${turn.square.row},${turn.square.column}`}>{turn.player} selected ({turn.square.row}, {turn.square.column})</li>)
            }
        </ol>
    );

}

export default Log;
