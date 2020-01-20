//Interfaces
import IDataStorage from "./DataStorage/IDataStorage";
import IDecisionManager from "./DecisionManager/IDecisionManager";
import IGameDataManager from "./GameDataManager/IGameDataManager";

//Implementations
import LocalStorage from "./DataStorage/LocalStorage";
import DecisionManager from "./DecisionManager/DecisionManager";
import GameDataManager from "./GameDataManager/GameDataManager";

class Systems {
  public static DataStorage: IDataStorage;
  public static DecisionManager: IDecisionManager;
  public static GameDataManager: IGameDataManager;
}

Systems.DataStorage = new LocalStorage();
Systems.DecisionManager = new DecisionManager();
Systems.GameDataManager = new GameDataManager();

export default Systems;
