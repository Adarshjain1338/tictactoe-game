/* eslint-disable eqeqeq */
import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';

function getGameStatus(squares){
    let winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i = 0; i<= winCombos.length-1; i++){
        let wincombo = winCombos[i];
        let s1 = wincombo[0];
        let s2 = wincombo[1];
        let s3 = wincombo[2];
        
        if(squares[s1] != null && squares[s1] == squares[s2] && squares[s2] == squares[s3]){
            alert(squares[s1] + " won the game");
            return squares[s1]+" wins";
        }
    }
    return null;
}
class Board extends React.Component{
  handleBoxClick(i){
    this.props.handlerForBoxClick(i)
  }
  renderSquare(i){
    return(
      <button onClick={() => this.handleBoxClick(i)}>{this.props.boxes[i]==null? "": this.props.boxes[i]}</button>
    );
  }

  render(){
    return(
      <div className='board'>
          <div className='title'>
            <h2>Tic-Tac-Toe</h2>
          </div>
          <div className='content'>
              <div className='ttt'>
                <div className='row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
              </div>
          </div>
      </div>
    );
  }
}
class Display extends React.Component{
    moveToHistory(i){
        this.props.handlerOfHistory(i);
    }
  render(){

    let gameTitle = null;
    
    if(this.props.gameStatus != null){
        gameTitle = this.props.gameStatus
    }
    else{
        // eslint-disable-next-line eqeqeq
        if(this.props.stepNumber % 2 ==0){
            gameTitle = "Next move for X";
        }
        else{
            gameTitle = "Next move for O";
        }
    }

    let buttons = [];
    
    for(let i = 0; i<= this.props.stepNumber; i++){
      let button = null;

      // eslint-disable-next-line eqeqeq
      if(i == 0){
        button = (<button key = {i} onClick={() => this.moveToHistory(i)}>Go to Start</button>);
      }
      else{
        button = (<button key = {i} onClick={() => this.moveToHistory(i)}>Go to step Number {i}</button>)
      }
      buttons.push(button);
    }

    return(
      <div className='display'>
          <div className='title'>
            <h2>{gameTitle}</h2>
          </div>
          <div className='content'>
                <div className='history'>
                  {buttons}
                </div>
          </div>
      </div>
    );
  }
}

class Game extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        history: [
            [null, null, null, null, null, null, null, null, null],
        ],
        stepNumber: 0,
        gameStatus: null
    }
    
}
  handleSquareBoxClick(i){
    let oldHistory = this.state.history.slice();
    let lastStateOfSquare = oldHistory[oldHistory.length-1].slice();
    
    
    if(lastStateOfSquare[i] != null || this.state.gameStatus != null){
        return;
    }
    // eslint-disable-next-line eqeqeq
    lastStateOfSquare[i] = this.state.stepNumber%2 == 0 ? "X": "O";
    oldHistory.push(lastStateOfSquare)

    let newGameStatus = getGameStatus(lastStateOfSquare);
    if(this.state.stepNumber == 8 && newGameStatus == null){
        newGameStatus = "DRAW";
    }

        this.setState({
            history: oldHistory,
            stepNumber: this.state.stepNumber + 1,
            gameStatus: newGameStatus
        })
  }
  stepOfHistory(i){
    let oldHistory = this.state.history.slice(0 , i+1);
    let lastStateOfSquare_forthisfunction = oldHistory[oldHistory.length-1];
    let newGameStatus = getGameStatus(lastStateOfSquare_forthisfunction);
    this.setState({
        history: oldHistory,
        stepNumber: i,
        gameStatus: newGameStatus
    })
    
  }
  render(){
    
    let squareBox = this.state.history[this.state.history.length-1];
    
    return(
      <>
      <div className='container'>
        <Board handlerForBoxClick={(i) => this.handleSquareBoxClick(i)} boxes={squareBox}/>
        <Display stepNumber={this.state.stepNumber} gameStatus = {this.state.gameStatus} handlerOfHistory = {(i) => this.stepOfHistory(i)} />
        </div>
      </>
    )
  }
}
ReactDOM.render(<Game/>, document.getElementById('root'));