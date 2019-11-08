import React from "react";

//Styles
import styles from "./App.module.scss";

//Components
import TurnCounter from "../TurnCounter/TurnCounter";

//Systems
import Systems from "../../systems/Systems";

//Interfaces
import IGameState from "../../interfaces/IGameState";
import IAttributes from "../../interfaces/IAttributes";

//Data
import DefaultGameState from "../../data/DefaultGameState";
import StartScreen from "../StartScreen/StartScreen";

type State = {
  gameState: IGameState;
  hasExistingSave: boolean;
  gameStarted: boolean;
};

type Props = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const gameState = Systems.DataStorage.get<IGameState>("GameState");

    if (gameState) {
      this.state = {
        gameState,
        hasExistingSave: true,
        gameStarted: false
      };
    } else {
      this.state = {
        gameState: DefaultGameState,
        hasExistingSave: false,
        gameStarted: false
      };
    }
  }

  startNewGame = () => {
    if (this.state.hasExistingSave) {
      this.setState({
        gameState: DefaultGameState,
        gameStarted: true
      });
    } else {
      this.setState({ gameStarted: true });
    }
  };

  continueGame = () => {
    this.setState({
      gameStarted: true
    });
  };

  nextTurn = (
    attributeAdjustments: IAttributes = {
      financial: 0,
      populationHappiness: 0,
      domesticPoliticalFavour: 0,
      foreignPoliticalFavour: 0
    }
  ) => {
    //Save the game state to storage before we move to the next turn
    Systems.DataStorage.set<IGameState>("GameState", this.state.gameState);

    this.setState(prevState => {
      return {
        gameState: {
          ...prevState.gameState,
          attributes: {
            financial:
              prevState.gameState.attributes.financial +
              attributeAdjustments.financial,
            populationHappiness:
              prevState.gameState.attributes.populationHappiness +
              attributeAdjustments.populationHappiness,
            domesticPoliticalFavour:
              prevState.gameState.attributes.domesticPoliticalFavour +
              attributeAdjustments.domesticPoliticalFavour,
            foreignPoliticalFavour:
              prevState.gameState.attributes.foreignPoliticalFavour +
              attributeAdjustments.foreignPoliticalFavour
          },
          turn: prevState.gameState.turn + 1
        }
      };
    });
  };

  render() {
    return (
      <>
        {this.state.gameStarted ? (
          <div className={styles.container}>
            <TurnCounter currentTurn={this.state.gameState.turn} />
            <button
              onClick={() => {
                this.nextTurn();
              }}
            >
              Increment Turn
            </button>
          </div>
        ) : (
          <StartScreen
            showContinueButton={this.state.hasExistingSave}
            continueFunc={this.continueGame}
            startFunc={this.startNewGame}
          />
        )}
      </>
    );
  }
}

export default App;
