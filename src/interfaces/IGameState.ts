import IAttributes from "./IAttributes";
import IProvince from "./IProvince";

interface IGameState {
  turn: number;
  attributes: IAttributes;
  provinces: IProvince[]
}

export default IGameState;
