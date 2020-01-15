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

type Props = {};

class App extends React.Component<Props, GameState> {
  constructor(props: Props) {
    super(props);

    //Setup
    this.setupState();
  }

  setupState() {
    const gameData = Systems.DataStorage.get<IGameData>("GameData");

    const defaultGameState = {
      maxTurns: Systems.DecisionManager.numberOfDecisions,
      hasExistingSave: gameData ? true : false,
      gameStarted: false,
      gameIsOver: false,
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

  startNewGame() {
    const gameData: IGameData = Systems.GameDataManager.getFreshGameData();

    Systems.DataStorage.set<IGameData>("GameData", gameData);
    this.setState({
      gameData,
      gameStarted: true
    });
  }

  continueGame() {
    this.setState({
      gameStarted: true
    });
  }

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
    return <Game gameData={this.state.gameData} nextTurn={this.nextTurn} />;
  }
}

export default App;
