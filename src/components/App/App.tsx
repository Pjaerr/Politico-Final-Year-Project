import React from "react";

//Components
import Game from "../Game/Game";

//Interfaces
import IGameData from "../../interfaces/IGameData";

//Types
import GameState from "../../types/GameState";

//Systems
import Systems from "../../systems/Systems";
import IAttributes from "../../interfaces/IAttributes";
import EndScreen from "../EndScreen/EndScreen";
import StartScreen from "../StartScreen/StartScreen";

//Utils
import * as utils from "../../utils/utils";

type Props = {};

class App extends React.Component<Props, GameState> {
  constructor(props: Props) {
    super(props);

    //Setup State
    const gameData = Systems.DataStorage.get<IGameData>("GameData");

    const defaultGameState = {
      maxTurns: Systems.DecisionManager.numberOfDecisions,
      hasExistingSave: gameData ? true : false,
      gameStarted: true,
      gameIsOver: true,
      playerHasWon: false
    };

    //If a save already exists, use it.
    if (gameData) {
      this.state = {
        gameData,
        ...defaultGameState
      };
    }
    //If not, get fresh game data.
    else {
      this.state = {
        gameData: Systems.GameDataManager.getFreshGameData(),
        ...defaultGameState
      };
    }
  }

  componentDidUpdate() {
    //Avoid infinite state updates if the game is over
    if (this.state.gameIsOver) return;

    //Have we reached the maximum number of turns?
    if (this.state.gameData.turn > this.state.maxTurns) {
      //End the game with a win
      this.endGame(true);
    }
    //Are any of the attributes below zero?
    else if (utils.attributesAreBelowZero(this.state.gameData.attributes)) {
      //End the game with a loss
      this.endGame(false);
    }
  }

  endGame = (playerHasWon: boolean) => {
    this.setState({
      gameIsOver: true,
      playerHasWon
    });
  };

  startNewGame = () => {
    const gameData: IGameData = Systems.GameDataManager.getFreshGameData();

    Systems.DataStorage.set<IGameData>("GameData", gameData);
    this.setState({
      gameData,
      gameStarted: true
    });
  };

  continueGame = () => {
    this.setState({
      gameStarted: true
    });
  };

  restartGame = () => {
    this.setState({
      gameData: Systems.GameDataManager.getFreshGameData(),
      hasExistingSave: false,
      gameStarted: false,
      gameIsOver: false,
      playerHasWon: false
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
        ...prevState.gameData,
        attributes: {
          financial:
            prevState.gameData.attributes.financial +
            attributeAdjustments.financial,
          populationHappiness:
            prevState.gameData.attributes.populationHappiness +
            attributeAdjustments.populationHappiness,
          domesticPoliticalFavour:
            prevState.gameData.attributes.domesticPoliticalFavour +
            attributeAdjustments.domesticPoliticalFavour,
          foreignPoliticalFavour:
            prevState.gameData.attributes.foreignPoliticalFavour +
            attributeAdjustments.foreignPoliticalFavour
        },
        turn: prevState.gameData.turn + 1
      };

      //Save the game state to storage before we move to the next turn
      Systems.DataStorage.set<IGameData>("GameData", newGameState);

      return {
        gameData: newGameState
      };
    });
  };

  render() {
    if (!this.state.gameStarted) {
      return (
        <StartScreen
          showContinueButton={this.state.hasExistingSave}
          continueFunc={this.continueGame}
          startFunc={this.startNewGame}
        />
      );
    } else if (!this.state.gameIsOver) {
      return <Game gameData={this.state.gameData} nextTurn={this.nextTurn} />;
    } else {
      return (
        <EndScreen
          exitFunc={this.restartGame}
          playerHasWon={this.state.playerHasWon}
          statistics={{
            numberOfDecisions: this.state.gameData.turn,
            attributes: this.state.gameData.attributes
          }}
        />
      );
    }
  }
}

export default App;
