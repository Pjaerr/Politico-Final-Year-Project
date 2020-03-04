import { PoliticalLeaning } from "./IDecision";

interface IProvincePoliticalLeaningFactors {
  populationDensity: number;
  nonWhiteBritishEthnicPercentage: number;
  numberOfUniversities: number;
  averageSalary: number;
}

interface IProvince {
  name: string;
  population: number;
  happiness: number;
  isInParty: boolean;
  politicalLeaning: PoliticalLeaning;
  factors: IProvincePoliticalLeaningFactors;
}

export default IProvince;
