import * as React from 'react'
import { Board } from './board'
import '../index.css'

interface GameProps {

}

interface GameState {
    xTurn: boolean;
    history: Array<ISquare>;
    moveNumber: number;
}

interface ISquare {
    squares: Array<string>;
}

export class Game extends React.Component<GameProps, GameState> {

    constructor(props: GameProps) {
        super(props);
        this.state = {
            xTurn: true,
            history: Array({squares: Array(9).fill("")}),
            moveNumber: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.render = this.render.bind(this);
    }

    handleClick(i: number) {
        const history: Array<ISquare> = this.state.history.slice(0, this.state.moveNumber + 1);
        const currentSquares: ISquare = history[history.length - 1];

        if (currentSquares.squares[i]) return;

        const newSquares = currentSquares.squares.slice();
        const xMove = this.state.xTurn;

        xMove ? newSquares[i] = "X" : newSquares[i] = "O";
        this.setState({history: history.concat({squares: newSquares}), xTurn: !xMove, moveNumber: history.length});

        const winner = this.checkWinner(newSquares);

        if (winner)
            return;
    }

    jumpTo(move: number, data: ISquare) {
        this.setState({moveNumber: move, xTurn: (move % 2) === 0})
    }

    render() {
        let status;
        const history: Array<ISquare> = this.state.history;
        const currentSquares: ISquare = history[this.state.moveNumber];

        const winner = this.checkWinner(currentSquares.squares);

        const moves = history.map((data, moveNumber) => {
            const desc = moveNumber ? "Go to move #" + moveNumber
                : "Go to start";
            
            return (
                <li key={moveNumber}>
                    <button onClick={() => this.jumpTo(moveNumber, data)}>{desc}</button>
                </li>
            );
        });

        if (winner === "DRAW")
            status = "It's draw dude";
        else if (winner) 
            status = winner + " has won! Congrats! 🎉🎉";
        else
            status = "Next player: " + (this.state.xTurn ? "X" : "O");

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentSquares.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }

    private checkWinner(squares: Array<string>): any {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        let squaresTaken = 0; 

        for (let i = 0; i < lines.length; i++)
        {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a];
        }

        for (let i = 0; i < squares.length; i++)
        {
            if (squares[i])
                squaresTaken++;
        }

        if (squaresTaken === squares.length)
            return "DRAW";

        return null;
    }
}
