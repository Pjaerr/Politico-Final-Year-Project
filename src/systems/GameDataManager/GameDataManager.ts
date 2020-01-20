import IGameDataManager from "./IGameDataManager";
import IGameData from "../../interfaces/IGameData";
import IProvince from "../../interfaces/IProvince";
import Provinces from "../../data/Provinces";
import { generateRandomPopulation, generateRandomHappiness, generateRandomPopulationDensity, generateRandomNumberOfUniversities, generateRandomAverageSalary, generateRandomNonWhiteBritishEthnicPercentage } from "../../utils/utils";

const generateProvinces = (): IProvince[] => {
    const provinces = [];

    for (const { name } of Provinces) {
        provinces.push({
            name,
            population: generateRandomPopulation(),
            happiness: generateRandomHappiness(),
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

class GameDataManager implements IGameDataManager {
    getFreshGameData(): IGameData {
        //Todo: Return randomly generated IGameData.
        return {
            turn: 0,
            attributes: {
                financial: 80,
                populationHappiness: 30,
                domesticPoliticalFavour: 50,
                foreignPoliticalFavour: 100
            },
            provinces: generateProvinces()
        };
    }
};

export default GameDataManager;