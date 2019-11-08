import IDataStorage from "./DataStorage/IDataStorage";
import LocalStorage from "./DataStorage/LocalStorage";

class Systems {
  public static DataStorage: IDataStorage;
}

Systems.DataStorage = new LocalStorage();

export default Systems;
