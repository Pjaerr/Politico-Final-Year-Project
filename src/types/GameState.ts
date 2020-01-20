import IGameData from "../interfaces/IGameData";

type GameState = {
    gameData: IGameData;
    maxTurns: number;
    hasExistingSave: boolean;
    gameStarted: boolean;
    gameIsOver: boolean;
    playerHasWon: boolean;
};

export default GameState;