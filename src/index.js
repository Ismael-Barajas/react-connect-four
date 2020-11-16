import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {

    renderSquare(i) {
        return ( <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/> );
    }

    render() {
        const grid = [];

        for (let i = 0; i < 6; i++) {  
            const squares = [];
            for (let t = 0; t < 7; t++) {
                squares.push(this.renderSquare(7*i+t));
            }
            grid.push(<div className="board-row">{squares}</div>);
        }

        return (
        <div>
            {grid}
        </div>
        );
    }
}

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            history: [{
                squares: Array(42).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const columns = [[0,7,14,21,28,35],
                         [1,8,15,22,29,36],
                         [2,9,16,23,30,37],
                         [3,10,17,24,31,38],
                         [4,11,18,25,32,39],
                         [5,12,19,26,33,40],
                         [6,13,20,27,34,41]];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        for (let x = 0; x < columns.length; x++) {
            if (columns[x].includes(i)) {
                for (let z = 5; z >= 0; z--) {
                    if (squares[columns[x][z]] === null) {
                        squares[columns[x][z]] = this.state.xIsNext ? '🔴' : '🔵';
                        break;
                    } 
                }
            }
        }
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? '🔴' : '🔵');
        }
        
        return (
        <div className="game">
            <div className="game-board">
            <Board  squares={current.squares} onClick={(i) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
            //1st row 
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      //2nd row 
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      //3rd row
      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20], 
      //4th row 
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],
      //5th row
      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34], 
      //6th row 
      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],

      //Column 1
      [0, 7, 14, 21],
      [7, 14, 21, 28],
      [14, 21, 28, 35], 
      //Column 2
      [1, 8, 15, 22],
      [8, 15, 22, 29],
      [15, 22, 29, 36], 
      //Column 3
      [2, 9, 16, 23],
      [9, 16, 23, 30],
      [16, 23, 30, 37], 
      //Column 4
      [3, 10, 17, 24],
      [10, 17, 24, 31],
      [17, 24, 31, 38],
      //Column 5
      [4, 11, 18, 25],
      [11, 18, 25, 32],
      [18, 25, 32, 39],
      //Column 6
      [5, 12, 19, 26],
      [12, 19, 26, 33],
      [19, 26, 33, 40],
      //Column 7
      [6, 13, 20, 27],
      [13, 20, 27, 34],
      [20, 27, 34, 41], 

      //diagnonals
      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [10, 16, 22, 28],
      [5, 11, 17, 23],
      [11, 17, 23, 29],
      [17, 23, 29, 35],
      [6, 12, 18, 24],
      [12, 18, 24, 30],
      [18, 24, 30, 36],
      [13, 19, 25, 31],
      [19, 25, 31, 37],
      [20, 26, 32, 38],
      [3, 11, 19, 27],
      [2, 10, 18, 26],
      [10, 18, 26, 34],
      [1, 9, 17, 25],
      [9, 17, 25, 33],
      [17, 25, 33, 41],
      [0, 8, 16, 24],
      [8, 16, 24, 32],
      [16, 24, 32, 40],
      [7, 15, 23, 31],
      [15, 23, 31, 39],
      [14, 22, 30, 38]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[c] && squares[d]) {
        return squares[a];
      }
    }
    return null;
  }