import IGameState from "../interfaces/IGameState";

export default {
    turn: 0,
    attributes: {
        financial: 80,
        populationHappiness: 30,
        domesticPoliticalFavour: 50,
        foreignPoliticalFavour: 100
    },
    provinces: [
        {
            name: "Bedfordshire",
            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Berkshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Buckinghamshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Cheshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Cambridgeshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Cornwall",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Cumbria",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Derbyshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Durham",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Dorset",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Devon",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Essex",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Gloucestershire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Greater London",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Hampshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Herefordshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Hertfordshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Kent",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Lancashire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Leicestershire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Lincolnshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Northamptonshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Northumberland",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Norfolk",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Northern Ireland",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Nottinghamshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Oxfordshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Rutland",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Scotland",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Suffolk",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Somerset",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Shropshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Surrey",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Staffordshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Sussex",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Wales",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Wiltshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Worcestershire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Warwickshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        },
        {
            name: "Yorkshire",

            population: 31670000,
            happiness: 100,
            factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
            }
        }
    ]
} as IGameState;