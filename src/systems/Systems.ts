//Interfaces
import IDataStorage from "./DataStorage/IDataStorage";
import IDecisionManager from "./DecisionManager/IDecisionManager";
import IGameDataManager from "./GameDataManager/IGameDataManager";

//Implementations
import LocalStorage from "./DataStorage/LocalStorage";
import DecisionManager from "./DecisionManager/DecisionManager";
import GameDataManager from "./GameDataManager/GameDataManager";

export let DataStorageSystem = new LocalStorage();
export let DecisionManagerSystem = new DecisionManager();
export let GameDataManagerSystem = new GameDataManager();

export const resetSystems = () => {
  DataStorageSystem = new LocalStorage();
  DecisionManagerSystem = new DecisionManager();
  GameDataManagerSystem = new GameDataManager();
}

// class Systems {
//   public static DataStorage: IDataStorage = new LocalStorage();
//   public static DecisionManager: IDecisionManager = new DecisionManager();
//   public static GameDataManager: IGameDataManager = new GameDataManager();

//   public static resetSystems = () => {
//     Systems.DataStorage = new LocalStorage();
//     Systems.DecisionManager = new DecisionManager();
//     Systems.GameDataManager = new GameDataManager();
//   }
// }

// Systems.DataStorage = new LocalStorage();
// Systems.DecisionManager = new DecisionManager();
// Systems.GameDataManager = new GameDataManager();

// export default Systems;
