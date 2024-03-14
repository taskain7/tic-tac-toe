import React, {useState} from 'react';
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameTurn from "./classes/GameTurn";
import Square from "./classes/Square";
import GameOver from "./components/GameOver";
import Players from "./classes/Players";

const initialGameBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function deriveActivePlayer(gameTurns: GameTurn[]) {
    return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}

function App() {
    const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
    const [players, setPlayers] = useState(new Players('Player 1', 'Player 2'))

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard].map(innerArray => [...innerArray]);

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, column} = square;

        gameBoard[row][column] = player;
    }

    let winner = undefined;

    if (isRowWinning() || isColumnWinning() || isDiagonalWinning()) {
        winner = gameTurns[0].player === 'X' ? players.x : players.o;
    }

    function isRowWinning() {
        for (let i = 0;i < gameBoard.length; i++) {
            if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][0] === gameBoard[i][2]) {
                return  true;
            }
        }
        return false;
    }

    function isColumnWinning() {
        for (let i = 0;i < gameBoard.length; i++) {
            if (gameBoard[0][i] !== '' && gameBoard[0][i] === gameBoard[1][i] && gameBoard[0][i] === gameBoard[2][i]) {
                return true;
            }
        }
        return false;
    }

    function isDiagonalWinning() {
        if (gameBoard[0][0] !== '' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
            return true
        }
        if (gameBoard[2][0] !== '' && gameBoard[2][0] === gameBoard[1][1] && gameBoard[2][0] === gameBoard[0][2]) {
            return true;
        }
        return false;
    }

    function handleSelectSquare(rowIndex: number, columnIndex: number) {
        setGameTurns(previousGameTurns => {
            let currentPlayer = deriveActivePlayer(previousGameTurns);

            return [new GameTurn(new Square(rowIndex, columnIndex), currentPlayer), ...previousGameTurns];
        })
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(playerSymbol: string, newPlayerName: string) {
        setPlayers(previousPlayers => {
            if ('X' === playerSymbol) {
                return new Players(newPlayerName, previousPlayers.o)
            }
            return new Players(previousPlayers.x, newPlayerName);
        })
    }

    const isDraw = gameTurns.length === 9 && !winner;

  return (
      <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayerNameChange}/>
                <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayerNameChange}/>
            </ol>
            {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
            <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} winner={winner}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
  );
}

export default App;
