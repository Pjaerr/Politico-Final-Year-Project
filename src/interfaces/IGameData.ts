import IAttributes from "./IAttributes";
import IProvince from "./IProvince";

interface IGameData {
  turn: number;
  attributes: IAttributes;
  provinces: IProvince[]
}

export default IGameData;
