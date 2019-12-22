interface IAgeRange {
  min: number;
  max: number;
}

interface IProvincePoliticalLeaningFactors {
  numberOfUniversities: number;
  averageIncome: number;
  ageRange: IAgeRange;
  foreignPopulation: number;
}

interface IProvince {
  name: string;
  population: number;
  happiness: number;
  factors: IProvincePoliticalLeaningFactors;
}

export default IProvince;
