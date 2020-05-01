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

export const getPoliticalLeaning = (province: IProvince): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        fetch(`https://localhost:5001/FuzzyLogic?population_density=${province.factors.populationDensity}&non_white_british_ethnicity_percentage=${province.factors.nonWhiteBritishEthnicPercentage}&number_of_universities=${province.factors.numberOfUniversities}&average_salary=${province.factors.averageSalary}`).then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then(({ fuzzifiedOutput }) => {
            resolve(fuzzifiedOutput.toFixed(2));
        }).catch(err => reject(err));
    });
}

const politicalLeaningMap: { min: number, max: number, politicalLeaning: string }[] = [
    {
        min: 0,
        max: 15,
        politicalLeaning: "Hard Left"
    },
    {
        min: 16,
        max: 30,
        politicalLeaning: "Left"
    },
    {
        min: 31,
        max: 44,
        politicalLeaning: "Centre Left"
    },
    {
        min: 45,
        max: 55,
        politicalLeaning: "Centre"
    },
    {
        min: 56,
        max: 70,
        politicalLeaning: "Centre Right"
    },
    {
        min: 71,
        max: 85,
        politicalLeaning: "Right"
    },
    {
        min: 86,
        max: 100,
        politicalLeaning: "Hard Right"
    },
]

export const getPoliticalLeaningAsString = (politicalLeaning: number): string => {
    for (const range of politicalLeaningMap) {
        if (politicalLeaning > range.min && politicalLeaning <= range.max) {
            return range.politicalLeaning;
        }
    }

    return "Invalid Political Leaning Value";
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