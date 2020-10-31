import * as React from 'react';
import { Square } from './square';

interface BoardProps {
    
}

interface BoardState {
    squares: Array<string>;
    xTurn: boolean;
}

export class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps)  {
        super(props)
        this.state = { 
            squares: Array(9).fill(""),
            xTurn: true,
        };
    }

    handleClick(i: number) {

        if (this.state.squares[i]) return;

        const newSquares = this.state.squares.slice();
        const xMove = this.state.xTurn;

        xMove ? newSquares[i] = "X" : newSquares[i] = "O";

        this.setState({squares: newSquares, xTurn: !xMove});

        const winner = this.checkWinner(newSquares);

        if (winner)
            return;
    }

    renderSquare(i: number) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    render() {
        let status;
        const winner = this.checkWinner(this.state.squares);

        if (winner === "DRAW")
            status = "It's draw dude";
        else if (winner) 
            status = winner + " has won! Congrats! 🎉🎉";
        else
            status = "Next player: " + (this.state.xTurn ? "X" : "O");
        
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
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
