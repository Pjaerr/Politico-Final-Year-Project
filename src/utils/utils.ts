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

export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateRandomPopulation = (): number => {
    //Range:
    /* 8,000 ->  9,000,000 */
    return randomNumber(8000, 9000000);
}

export const generateRandomHappiness = (): number => {
    //Range:
    /* 20 -> 100 */
    return randomNumber(20, 100);
}

export const generateRandomPopulationDensity = (): number => {
    //Range:
    /* 20 -> 17,000 */
    return randomNumber(20, 17000);
};

export const generateRandomNumberOfUniversities = (): number => {
    //Range:
    /* 0 -> 40 */
    return randomNumber(0, 40);
}

export const generateRandomAverageSalary = (): number => {
    //Range:
    /* 13,000 -> 100,000 */
    return randomNumber(13000, 100000);
}

export const generateRandomNonWhiteBritishEthnicPercentage = (): number => {
    //Range:
    /* 0 -> 100 */
    return randomNumber(0, 100);
}