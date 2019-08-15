import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game2048 from './2048.js';

class Board extends React.Component {
	render() {
    const layout = this.props.layout;
    let board = 
      <div>
        {layout.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((item, j) => (
              <div className="square" key={i+'-'+j}>{item === 0 ? "" : <span>{item}</span>}</div>
            ))}
          </div>
        ))}
      </div>;

		return (
			<div className="gameContainer">
        {board}
			</div>
		);
	}
}

class Game extends React.Component {
  constructor(props) {
  	super(props);
  	const Game = new Game2048(4);
  	this.state = {
  		game: Game,
      step: 0,
      status: "continue"
  	}
    Game.show();
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
    const ARROW_LEFT = 37;
    const ARROW_UP = 38;
    const ARROW_RIGHT = 39;
    const ARROW_DOWN = 40;
    let status = this.state.status;
    if (status !== "win" && status !== "lost") {
      switch(event.keyCode) {
        case ARROW_LEFT:
          status = this.state.game.move("left");
          break;
        case ARROW_UP:
          status = this.state.game.move("up");
          break;
        case ARROW_RIGHT:
          status = this.state.game.move("right");
          break;
        case ARROW_DOWN:
          status = this.state.game.move("down");
          break;
        default: 
          break;
      }
    }
    
    this.setState({
      step: this.state.step + 1,
      status: status
    });
    
  }

  render() {
    console.log(this.state.game.layout)
    return (
      <div
        className="game"
      >
        <div className="game-board">
          <Board
            rows = '4'
            layout = {this.state.game.layout}
            step = {this.state.step}
          />
        </div>
        <div className="game-info">
          <div>
            {this.state.status === "win" &&
              <div>You win!</div>
            }</div>
          <div>
            {this.state.status === "lost" &&
              <div>You lost!</div>
            }</div>
          <ol>{/* TODO */}</ol>
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

