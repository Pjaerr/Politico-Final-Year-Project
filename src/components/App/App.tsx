import React from "react";

//Components
import Game from "../Game/Game";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

//Interfaces
import IGameData from "../../interfaces/IGameData";

//Types
import GameState from "../../types/GameState";

//Systems
import Systems from "../../systems/Systems";
import EndScreen from "../EndScreen/EndScreen";
import StartScreen from "../StartScreen/StartScreen";

//Utils
import * as utils from "../../utils/utils";
import { DecisionConsequences } from "../../interfaces/IDecision";

type Props = {};

class App extends React.Component<Props, GameState> {
  constructor(props: Props) {
    super(props);

    //Setup State
    const gameData = Systems.DataStorage.get<IGameData>("GameData");

    const defaultGameState = {
      maxTurns: Systems.DecisionManager.numberOfDecisions,
      hasExistingSave: gameData ? true : false,
      gameStarted: false,
      gameIsOver: false,
      playerHasWon: false,
    };

    //If a save already exists, use it.
    if (gameData) {
      this.state = {
        gameData,
        ...defaultGameState,
      };
    }
    //If not, get fresh game data.
    else {
      Systems.GameDataManager.getFreshGameData()
        .then((gameData) => {
          this.setState({
            gameData,
            ...defaultGameState,
          });
        })
        .catch(console.error);
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
      playerHasWon,
    });
  };

  startNewGame = () => {
    Systems.resetSystems();

    Systems.GameDataManager.getFreshGameData()
      .then((gameData) => {
        Systems.DataStorage.set<IGameData>("GameData", gameData);
        this.setState({
          gameData,
          gameStarted: true,
        });
      })
      .catch(console.error);
  };

  continueGame = () => {
    this.setState({
      gameStarted: true,
    });
  };

  restartGame = () => {
    Systems.DataStorage.remove<IGameData>("GameData");

    Systems.GameDataManager.getFreshGameData()
      .then((gameData) => {
        this.setState({
          gameData,
          hasExistingSave: false,
          gameStarted: false,
          gameIsOver: false,
          playerHasWon: false,
        });
      })
      .catch(console.error);
  };

  nextTurn = (consequences: DecisionConsequences) => {
    Systems.GameDataManager.updateGameData(this.state.gameData, consequences)
      .then((updatedGameData) => {
        const newGameState = {
          ...updatedGameData,
          turn: this.state.gameData.turn + 1,
        };

        Systems.DataStorage.set<IGameData>("GameData", newGameState);

        this.setState({ gameData: newGameState });
      })
      .catch(console.error);
  };

  render() {
    //Because our state could be generated fresh which involves a network request, we first check if state
    //has actually been assigned before trying to use it.
    if (!this.state) {
      return <LoadingIcon />;
    }

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
            attributes: this.state.gameData.attributes,
          }}
        />
      );
    }
  }
}

export default App;
