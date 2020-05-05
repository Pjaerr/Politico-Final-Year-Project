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
        fetch(`/FuzzyLogic?population_density=${province.factors.populationDensity}&non_white_british_ethnicity_percentage=${province.factors.nonWhiteBritishEthnicPercentage}&number_of_universities=${province.factors.numberOfUniversities}&average_salary=${province.factors.averageSalary}`).then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then(({ fuzzifiedOutput }) => {
            if (fuzzifiedOutput) {

                //Introduce a random chance to have a hardleft or hardright leaning
                if (randomNumber(0, 20) === 10) {
                    resolve(90)
                }
                else if (randomNumber(0, 20) === 10) {
                    resolve(10);
                }
                else {
                    resolve(fuzzifiedOutput.toFixed(2));
                }

            }
            else {
                resolve(50.00);
                console.error("Something has gone wrong on the backend");
            }
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
        min: 15.01,
        max: 30,
        politicalLeaning: "Left"
    },
    {
        min: 30.01,
        max: 44,
        politicalLeaning: "Centre Left"
    },
    {
        min: 44.01,
        max: 55,
        politicalLeaning: "Centre"
    },
    {
        min: 55.01,
        max: 70,
        politicalLeaning: "Centre Right"
    },
    {
        min: 70.01,
        max: 85,
        politicalLeaning: "Right"
    },
    {
        min: 85.01,
        max: 100,
        politicalLeaning: "Hard Right"
    },
]

export const getPoliticalLeaningAsString = (politicalLeaning: number): string => {
    for (const range of politicalLeaningMap) {
        if (politicalLeaning >= range.min && politicalLeaning <= range.max) {
            return range.politicalLeaning;
        }
    }

    console.log(politicalLeaning);
    return "Invalid Political Leaning Value";
}



export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const values = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2
];

enum RANGE {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
};

export const getRandomRange = (): RANGE => {
    return values[randomNumber(0, values.length - 1)] as RANGE;
}

export const generateRandomPopulation = (): number => {
    //Range:
    /* 8,000 ->  9,000,000 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(8000, 900000);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(900000, 3500000);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(3500000, 9000000);
    }

    return randomNumber(8000, 9000000);
}

export const generateRandomHappiness = (): number => {
    //Range:
    /* 20 -> 100 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(20, 50);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(50, 70);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(70, 100);
    }

    return randomNumber(20, 100);
}

export const generateRandomPopulationDensity = (): number => {
    //Range:
    /* 20 -> 17,000 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(20, 6000);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(6000, 12000);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(12000, 17000);
    }

    console.log("Pop Density Broke Yo");
    return randomNumber(20, 17000);
};

export const generateRandomNumberOfUniversities = (): number => {
    //Range:
    /* 0 -> 40 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(0, 2);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(2, 5);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(5, 40);
    }

    console.log("Unis Broke Yo");
    return randomNumber(0, 40);
}

export const generateRandomAverageSalary = (): number => {
    //Range:
    /* 13,000 -> 100,000 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(13000, 26000);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(26000, 45000);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(45000, 100000);
    }

    console.log("Salary Broke Yo");
    return randomNumber(13000, 100000);
}

export const generateRandomNonWhiteBritishEthnicPercentage = (): number => {
    //Range:
    /* 0 -> 100 */
    const range = getRandomRange();

    if (range === RANGE.LOW) {
        //Low
        return randomNumber(0, 20);
    }
    else if (range === RANGE.MEDIUM) {
        //Medium
        return randomNumber(20, 60);
    }
    else if (range === RANGE.HIGH) {
        //High
        return randomNumber(60, 100);
    }

    return randomNumber(0, 100);
}