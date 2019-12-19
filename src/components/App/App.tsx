import React from "react";

//Styles
import styles from "./App.module.scss";

//Components
import TurnCounter from "../TurnCounter/TurnCounter";
import Attributes from "../Attributes/Attributes";
import StartScreen from "../StartScreen/StartScreen";
import EndScreen from "../EndScreen/EndScreen";
import DecisionContainer from "../DecisionContainer/DecisionContainer";

//Systems
import Systems from "../../systems/Systems";

//Interfaces
import IGameState from "../../interfaces/IGameState";
import IAttributes from "../../interfaces/IAttributes";

//Data
import DefaultGameState from "../../data/DefaultGameState";
import Decisions from "../../data/Decisions";

//Utils
import * as utils from "../../utils/utils";
import MapContainer from "../MapContainer/MapContainer";

type State = {
  gameState: IGameState;
  maxTurns: number;
  hasExistingSave: boolean;
  gameStarted: boolean;
  gameIsOver: boolean;
  playerHasWon: boolean;
  decisionIsActive: boolean;
};

type Props = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const gameState = Systems.DataStorage.get<IGameState>("GameState");

    const defaultState = {
      maxTurns: Decisions.length - 1,
      hasExistingSave: gameState ? true : false,
      gameStarted: false,
      gameIsOver: false,
      playerHasWon: false,
      decisionIsActive: false
    };

    if (gameState) {
      this.state = {
        gameState: gameState,
        ...defaultState
      };
    } else {
      this.state = {
        gameState: DefaultGameState,
        ...defaultState
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
    this.setState(prevState => {
      const newGameState = {
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
      };

      //Save the game state to storage before we move to the next turn
      Systems.DataStorage.set<IGameState>("GameState", newGameState);

      return {
        gameState: newGameState,
        decisionIsActive: false
      };
    });
  };

  componentDidUpdate() {
    //Avoid infinite state updates if the game is over
    if (this.state.gameIsOver) return;

    if (this.state.gameState.turn > this.state.maxTurns) {
      this.setState({
        gameIsOver: true,
        playerHasWon: true
      });
    } else if (utils.attributesAreBelowZero(this.state.gameState.attributes)) {
      this.setState({
        gameIsOver: true,
        playerHasWon: false
      });
    }
  }

  render() {
    if (!this.state.gameIsOver) {
      return (
        <>
          {this.state.gameStarted ? (
            <div className={styles.container}>
              <Attributes attributes={this.state.gameState.attributes} />
              <MapContainer></MapContainer>

              {this.state.decisionIsActive ? (
                <DecisionContainer
                  decision={Decisions[this.state.gameState.turn]}
                  nextTurn={this.nextTurn}
                />
              ) : (
                <>
                  <TurnCounter
                    currentTurn={this.state.gameState.turn}
                    onNextTurnClick={() =>
                      this.setState({ decisionIsActive: true })
                    }
                  />
                </>
              )}
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
    } else {
      return (
        <>
          <EndScreen
            exitFunc={() => {
              this.setState({
                gameState: DefaultGameState,
                hasExistingSave: false,
                gameStarted: false,
                gameIsOver: false,
                playerHasWon: false
              });
            }}
            playerHasWon={this.state.playerHasWon}
            statistics={{
              numberOfDecisions: this.state.gameState.turn,
              attributes: this.state.gameState.attributes
            }}
          />
        </>
      );
    }
  }
}

export default App;
