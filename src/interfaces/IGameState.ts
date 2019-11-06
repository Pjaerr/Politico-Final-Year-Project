import IAttributes from "./IAttributes";
import IProvinces from "./IProvinces";

interface IGameState {
  turn: number;
  attributes: IAttributes;
  provinces: IProvinces;
}

export default IGameState;
