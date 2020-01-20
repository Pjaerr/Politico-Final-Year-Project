import IGameDataManager from "./IGameDataManager";
import IGameData from "../../interfaces/IGameData";
import IProvince from "../../interfaces/IProvince";
import Provinces from "../../data/Provinces";
import {
    generateRandomPopulation,
    generateRandomHappiness,
    generateRandomPopulationDensity,
    generateRandomNumberOfUniversities,
    generateRandomAverageSalary,
    generateRandomNonWhiteBritishEthnicPercentage,
    randomNumber
} from "../../utils/utils";
import IAttributes from "../../interfaces/IAttributes";

const generateProvinces = (): IProvince[] => {
    const provinces = [];

    let partyMembers = 0;
    const maxPartyMembers = 6;

    for (const { name } of Provinces) {
        let isInParty = false;

        //1 in 6 chance that this province is in the party
        if ((randomNumber(0, 6) === 5) && partyMembers < maxPartyMembers) {
            partyMembers++;
            isInParty = true;
        }

        provinces.push({
            name,
            population: generateRandomPopulation(),
            happiness: generateRandomHappiness(),
            isInParty,
            factors: {
                populationDensity: generateRandomPopulationDensity(),
                numberOfUniversities: generateRandomNumberOfUniversities(),
                averageSalary: generateRandomAverageSalary(),
                nonWhiteBritishEthnicPercentage: generateRandomNonWhiteBritishEthnicPercentage()
            }
        });
    }

    return provinces;
};

const generateAttributes = (): IAttributes => {
    return {
        financial: 80,
        populationHappiness: 30,
        domesticPoliticalFavour: 50,
        foreignPoliticalFavour: 100
    };
};

class GameDataManager implements IGameDataManager {
    getFreshGameData(): IGameData {
        return {
            turn: 0,
            attributes: generateAttributes(),
            provinces: generateProvinces()
        };
    }
};

export default GameDataManager;