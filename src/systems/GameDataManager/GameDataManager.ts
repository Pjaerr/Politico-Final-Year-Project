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
    randomNumber,
    getPoliticalLeaning,
    getPoliticalLeaningAsString
} from "../../utils/utils";
import IAttributes from "../../interfaces/IAttributes";
import { DecisionConsequences, FinancialImpact, ForeignApproval, PoliticalLeaning } from "../../interfaces/IDecision";

const generateProvinces = (): Promise<IProvince[]> => {
    return new Promise((resolve, reject) => {

        const provinces: IProvince[] = [];

        let partyMembers = 0;
        const maxPartyMembers = 6;

        for (const { name } of Provinces) {
            let isInParty = false;

            //1 in 6 chance that this province is in the party
            if ((randomNumber(0, 6) === 5) && partyMembers < maxPartyMembers) {
                partyMembers++;
                isInParty = true;
            }

            let province = {
                name,
                population: generateRandomPopulation(),
                happiness: generateRandomHappiness(),
                isInParty,
                politicalLeaning: PoliticalLeaning.Centre,
                factors: {
                    populationDensity: generateRandomPopulationDensity(),
                    numberOfUniversities: generateRandomNumberOfUniversities(),
                    averageSalary: generateRandomAverageSalary(),
                    nonWhiteBritishEthnicPercentage: generateRandomNonWhiteBritishEthnicPercentage()
                }
            };

            provinces.push(province);
        }

        let politicalLeaningPromises: Promise<number>[] = [];

        provinces.forEach(province => {
            politicalLeaningPromises.push(getPoliticalLeaning(province));
        });

        Promise.all(politicalLeaningPromises).then((politicalLeaningPromiseResults) => {
            politicalLeaningPromiseResults.forEach((politicalLeaning, index) => {
                provinces[index].politicalLeaning = politicalLeaning;
            });

            resolve(provinces);
        }).catch(reject);
    });
};

const generateAttributes = (): IAttributes => {
    return {
        financial: 70,
        populationHappiness: 30,
        domesticPoliticalFavour: 50,
        foreignPoliticalFavour: 80
    };
};

class GameDataManager implements IGameDataManager {
    financialImpactMap = new Map<FinancialImpact, number>([
        [FinancialImpact.VeryNegative, -40],
        [FinancialImpact.Negative, -20],
        [FinancialImpact.Neutral, 0],
        [FinancialImpact.Positive, 10],
        [FinancialImpact.VeryPositive, 20],
    ]);

    foreignApprovalMap = new Map<ForeignApproval, number>([
        [ForeignApproval.VeryNegative, -40],
        [ForeignApproval.Negative, -20],
        [ForeignApproval.Neutral, 0],
        [ForeignApproval.Positive, 10],
        [ForeignApproval.VeryPositive, 20],
    ]);

    getFreshGameData(): Promise<IGameData> {
        return new Promise((resolve, reject) => {
            generateProvinces().then(provinces => {
                resolve({
                    turn: 0,
                    attributes: generateAttributes(),
                    provinces
                });
            }).catch(reject);
        })
    };

    updateGameData(currentGameData: IGameData, consequences: DecisionConsequences): Promise<IGameData> {
        return new Promise<IGameData>((resolve, reject) => {

            let updatedGameData = currentGameData;

            console.log(consequences);

            //Work out numeric adjustments to be made
            let financialImpact = this.financialImpactMap.get(consequences.financialImpact);
            let foreignApproval = this.foreignApprovalMap.get(consequences.foreignApproval);

            if (financialImpact) updatedGameData.attributes.financial += financialImpact;
            if (foreignApproval) updatedGameData.attributes.foreignPoliticalFavour += foreignApproval;

            if (updatedGameData.attributes.financial > 100) updatedGameData.attributes.financial = 100;
            if (updatedGameData.attributes.foreignPoliticalFavour) updatedGameData.attributes.foreignPoliticalFavour = 100;

            let happiness = currentGameData.attributes.populationHappiness;
            let domesticPoliticalFavour = currentGameData.attributes.domesticPoliticalFavour;

            currentGameData.provinces.forEach(province => {
                const difference = Math.abs(province.politicalLeaning - consequences.politicalLeaning) * 0.01;

                //Manual hard-coded values
                let happinessAdjustment = 0;

                if (difference === 0) {
                    happinessAdjustment = 2.5;
                }
                else if (difference > 0 && difference <= 0.15) {
                    happinessAdjustment = 1
                }
                else if (difference > 0.15 && difference <= 0.25) {
                    happinessAdjustment = 0.5
                }
                else if (difference > 0.25 && difference <= 0.5) {
                    happinessAdjustment = -0.5
                }
                else if (difference > 0.5 && difference <= 0.75) {
                    happinessAdjustment = -1;
                }
                else if (difference === 1) {
                    happinessAdjustment = -5;
                }

                //If we want to scale by province population
                //Get the province with the highest population count
                //Get the province with the lowest population count
                //Map these counts in a range from 0 to 2
                //Multiply happinessAdjustment by the result of the range map.


                happiness += happinessAdjustment;

                if (province.isInParty) {
                    domesticPoliticalFavour += happinessAdjustment;
                }
            });

            if (happiness > 100) happiness = 100;
            if (domesticPoliticalFavour > 100) domesticPoliticalFavour = 100;

            updatedGameData.attributes.populationHappiness = happiness;
            updatedGameData.attributes.domesticPoliticalFavour = domesticPoliticalFavour;

            resolve(updatedGameData);
        });
    }
};

export default GameDataManager;