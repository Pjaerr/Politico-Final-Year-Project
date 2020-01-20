import IGameData from "../../interfaces/IGameData";

interface IGameDataManager {
    getFreshGameData(): IGameData;
}

export default IGameDataManager;