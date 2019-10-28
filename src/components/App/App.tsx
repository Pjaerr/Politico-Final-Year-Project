import React from "react";

//Styles
import styles from "./App.module.scss";

//Components
import TurnCounter from "../TurnCounter/TurnCounter";

type State = {
  turn: number;
};

type Props = {};

class App extends React.Component<Props, State> {
  state: State = {
    turn: 1
  };

  nextTurn = () => {
    this.setState((prevState: State) => {
      return { turn: prevState.turn + 1 };
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <TurnCounter currentTurn={this.state.turn} />
        <button onClick={this.nextTurn}>Increment Turn</button>
      </div>
    );
  }
}

export default App;
