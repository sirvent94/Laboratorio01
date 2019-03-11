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
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
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

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/*
NOTAS

Notas Tutorial React

React is a JavaScript library for building user interfaces.
Develloped at Facebook in 2011, currently is the most used JavaScipt for buildin UI (User Interfaces).

Components: A piece of the UI
We build a bunch of independent, isolated and reusable components. And then compose them to build a more sofisticated UI.
  <x>
  ...
  </x>
Every React Application has at least one component that works as the ROOT COMPONENT.
This component represents the inter application and contains other child components. Every React application is escentially a tree of components.

Example: Twitter

          App (Parent Component)

-NavBar   -Profile  -Trends   -Feed (Child Components)
                  -Tweet  (We can reuse components)
                  -Like
Each component is a piece of UI.

In terms of implementation, a component is tipically implemented as a JS Class that has some state and a render method.
*The state here is the data that we want to display when the component is rendered.
*The render method is the responsable for discribing what the UI should look like.

Example:
class Tweet {
  state = {};
  render(){ -------> The output of this render method is a REACT ELEMENT **

  }
}

**Which is a simple, plain JS object that maps whith DOM element. It's not a real DOM element, it's just a plain JS object that represents that DOM element in memory.
So React keep a light weight representation of the DOM in memory, which we can refer to as the virtual DOM. Unlike the browser or the real DOM, this virtual DOM is cheap to create.

When we change the state of the component we get a new react element. Then it will be compared and then syncronized with part of the real DOM.

Unlike vanilla JS or JQuery we don't need to work with the real DOM.

So we simply need to change the state of our components and React will automatically will update the DOM to match tah state.

This library is called React because once the state changes React escentially react to the state change and updates the DOM.

ANGULAR (Framework) vs REACT (View Library)

---------------------------------------------------
Developement Enviorment

We need to use first Node Package Management (NPM) to install third party libraries.

$npm i -g create-react-app@1.5.2
i -install
g -global

We need then a code editor.

Creating React App Package
$create-react-app name
  Ex: $create-react-app react-app

It will install:
  Light weight development server.
  Webpack for bundoling our files.
  Babel for compailling our JS code.
  And a bunch of some other tools.
  ...we don't have to do any configuration. but... we can eject by running: $npm run eject

Now we're going to this new folder:
  $cd react-app/
  $npm start

index.html
  <div id="root"></div> this div is the container of our React application.
App.js
  class DogMeme extends Component {
    render() {
      return (
        <div className="DogMeme">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <hi className"App-title">Welcome to React</h1>
          </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
      };
  }
}

This is the output of our banner App component.
React code-------->Babel-------->Plain JS Code--------->Browser

Babel compiler: babeljs.io/repl
JSX--------->plain React code

ex:
  const element = <h1>hello World</h1> (convert this on babeljs)

In our components we always use JSX and Babel convert.

---------------------------------------------------------
Hello World

1) Delete all the files from the source folder.
2) New file index.js

index.js
Here we are going to need to import a couple of objects fromm React modules.

import React from 'react';  //react is the module
              //React is the object tha we're importing from that module
import ReactDOM from 'react-dom';

const element = <h1>Hello World</h1>;   //defining an element
                    //Babel will compile this down to a call to React.createElement

                    //React.createElement //Thats the reason we need to import React

Now lets log this element on the console.
console.log(element);

Note: When ever we save the changes this App is automaticalliy restarted. (Hot Module Reloading)

Show the Console: Alt+Ctrl+I

Now rendering inside of the virtual DOM, thats why we import ReactDOM.

ReactDOM.render(element, document.getElementById('root'));  //as the first argument we pass; the element we want to render, as the second argument we need to specify where in the real DOM we want to render this.

So, this React DOM will get a reference to this: root, and render: element inside of that element.
*/