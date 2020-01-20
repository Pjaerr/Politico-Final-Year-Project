import IAttributes from '../interfaces/IAttributes';
import IProvince from '../interfaces/IProvince';
import { PoliticalLeaning } from '../interfaces/IDecision';

export const attributesAreBelowZero = ({
    financial,
    populationHappiness,
    domesticPoliticalFavour,
    foreignPoliticalFavour
}: IAttributes) => {
    return (
        financial <= 0 ||
        populationHappiness <= 0 ||
        domesticPoliticalFavour <= 0 ||
        foreignPoliticalFavour <= 0
    );
}

export const getPoliticalLeaning = (province: IProvince): PoliticalLeaning => {
    //Do some calculations here using fuzzy logic that use the factors of a given
    //province to work out a political leaning for said province.

    return (Math.floor(Math.random() * Math.floor(6))) as PoliticalLeaning;
}

export const getPoliticalLeaningAsString = (province: IProvince): string => {
    return "Left";
}

//Generating realistic values for political leaning factors

export const generateRandomPopulation = (): number => {
    return 317600;
}

export const generateRandomHappiness = (): number => {
    return 80;
}

export const generateRandomPopulationDensity = (): number => {
    return 3600;
};

export const generateRandomNumberOfUniversities = (): number => {
    return 5;
}

export const generateRandomAverageSalary = (): number => {
    return 32000;
}

export const generateRandomNonWhiteBritishEthnicPercentage = (): number => {
    return 12;
}