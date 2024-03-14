interface GameBoardProps {
    onSelectSquare: (rowIndex: number, columnIndex: number) => void,
    gameBoard: string[][],
    winner?: string
}

function GameBoard(props: GameBoardProps) {

    return (
        <ol id="game-board">
            {props.gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) => <li key={columnIndex}>
                        <button onClick={() => props.onSelectSquare(rowIndex, columnIndex)} disabled={!!props.winner || playerSymbol !== ''}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );

}

export default GameBoard;
