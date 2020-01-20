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
  factors: IProvincePoliticalLeaningFactors;
}

export default IProvince;
