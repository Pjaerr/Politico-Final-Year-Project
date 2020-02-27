import IAttributes from '../interfaces/IAttributes';
import IProvince from '../interfaces/IProvince';
import { PoliticalLeaning } from '../interfaces/IDecision';
import Provinces from '../data/Provinces';

export const getProvinceSVGPath = (provinceName: string): string => {
    return Provinces.filter(province => {
        return (province.name === provinceName);
    })[0].svgPath;
}

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
    enum Range {
        VeryLow,
        Low,
        Medium,
        High,
        VeryHigh
    }

    let ranges = {
        averageSalary: Range.Medium,
        nonWhiteBritishEthnicPercentage: Range.Medium,
        numberOfUniversities: Range.Medium,
        populationDensity: Range.Medium
    }

    const { averageSalary,
        nonWhiteBritishEthnicPercentage,
        numberOfUniversities,
        populationDensity } = province.factors;



    //Really messy manual process until develop a small fuzzy logic javascript library

    //AVERAGE SALARY
    if (averageSalary >= 13000 && averageSalary < 19000) {
        //Low
        ranges.averageSalary = Range.Low;
    }
    else if (averageSalary >= 19000 && averageSalary < 35000) {
        //Medium
        ranges.averageSalary = Range.Medium;
    }
    else if (averageSalary >= 35000 && averageSalary < 45000) {
        //High
        ranges.averageSalary = Range.High;
    }
    else {
        //Very High
        ranges.averageSalary = Range.VeryHigh;
    }

    //NUMBER OF UNIVERSITIES
    if (numberOfUniversities >= 0 && numberOfUniversities < 4) {
        //Low
        ranges.numberOfUniversities = Range.Low;
    }
    else if (numberOfUniversities >= 4 && numberOfUniversities < 8) {
        //Medium
        ranges.numberOfUniversities = Range.Medium;
    }
    else if (numberOfUniversities >= 8 && numberOfUniversities < 12) {
        //High
        ranges.numberOfUniversities = Range.High;
    }
    else {
        //Very High
        ranges.numberOfUniversities = Range.VeryHigh;
    }

    //NON WHITE BIRITH ETHNIC PERCENTAGE
    if (nonWhiteBritishEthnicPercentage >= 0 && nonWhiteBritishEthnicPercentage < 8.25) {
        //Low
        ranges.nonWhiteBritishEthnicPercentage = Range.Low;
    }
    else if (nonWhiteBritishEthnicPercentage >= 8.25 && nonWhiteBritishEthnicPercentage < 18) {
        //Medium
        ranges.nonWhiteBritishEthnicPercentage = Range.Medium;
    }
    else if (nonWhiteBritishEthnicPercentage >= 18 && nonWhiteBritishEthnicPercentage < 49.5) {
        //High
        ranges.nonWhiteBritishEthnicPercentage = Range.High;
    }
    else {
        //Very High
        ranges.nonWhiteBritishEthnicPercentage = Range.VeryHigh;
    }

    //POPULATION DENSITY
    if (populationDensity >= 0 && populationDensity < 120) {
        //Very Low
        ranges.populationDensity = Range.VeryLow;
    }
    else if (populationDensity >= 120 && populationDensity < 1000) {
        //Low
        ranges.populationDensity = Range.Low;
    }
    else if (populationDensity >= 1000 && populationDensity < 9000) {
        //Medium
        ranges.populationDensity = Range.Medium;
    }
    else if (populationDensity >= 9000 && populationDensity < 11000) {
        //High
        ranges.populationDensity = Range.High;
    }
    else {
        //Very High
        ranges.populationDensity = Range.VeryHigh;
    }

    if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Medium && ranges.numberOfUniversities === Range.Medium && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.HardLeft;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.High && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.Left;
    }
    else if (ranges.populationDensity === Range.High && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.Left;
    }
    else if (ranges.populationDensity === Range.High && ranges.nonWhiteBritishEthnicPercentage === Range.Medium && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.Left;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Medium && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.VeryHigh) {
        return PoliticalLeaning.CentreLeft;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.High && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.CentreLeft;
    }
    else if (ranges.populationDensity === Range.High && ranges.nonWhiteBritishEthnicPercentage === Range.Medium && ranges.numberOfUniversities === Range.Medium && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.CentreLeft;
    }
    else if (ranges.populationDensity === Range.VeryHigh && ranges.nonWhiteBritishEthnicPercentage === Range.High && ranges.numberOfUniversities === Range.VeryHigh && ranges.averageSalary === Range.VeryHigh) {
        return PoliticalLeaning.Centre;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.Centre;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Medium && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.CentreRight;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.High && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.CentreRight;
    }
    else if (ranges.populationDensity === Range.Low && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Medium && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.CentreRight;
    }
    else if (ranges.populationDensity === Range.Medium && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.Right;
    }
    else if (ranges.populationDensity === Range.VeryLow && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.Right;
    }
    else if (ranges.populationDensity === Range.Low && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.Medium) {
        return PoliticalLeaning.Right;
    }
    else if (ranges.populationDensity === Range.Low && ranges.nonWhiteBritishEthnicPercentage === Range.Low && ranges.numberOfUniversities === Range.Low && ranges.averageSalary === Range.High) {
        return PoliticalLeaning.HardRight;
    }

    return PoliticalLeaning.HardLeft;
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