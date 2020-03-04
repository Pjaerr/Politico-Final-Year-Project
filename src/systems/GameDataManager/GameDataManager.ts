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
    getPoliticalLeaning
} from "../../utils/utils";
import IAttributes from "../../interfaces/IAttributes";
import { DecisionConsequences, FinancialImpact, ForeignApproval, PoliticalLeaning } from "../../interfaces/IDecision";

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

        province.politicalLeaning = getPoliticalLeaning(province);

        provinces.push(province);
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
    financialImpactMap = new Map<FinancialImpact, number>([
        [FinancialImpact.VeryNegative, -20],
        [FinancialImpact.Negative, -10],
        [FinancialImpact.Neutral, 0],
        [FinancialImpact.Positive, 10],
        [FinancialImpact.VeryPositive, 20],
    ]);

    foreignApprovalMap = new Map<ForeignApproval, number>([
        [ForeignApproval.VeryNegative, -20],
        [ForeignApproval.Negative, -10],
        [ForeignApproval.Neutral, 0],
        [ForeignApproval.Positive, 10],
        [ForeignApproval.VeryPositive, 20],
    ]);

    getFreshGameData(): IGameData {
        return {
            turn: 0,
            attributes: generateAttributes(),
            provinces: generateProvinces()
        };
    };

    updateGameData(currentGameData: IGameData, consequences: DecisionConsequences): IGameData {
        let updatedGameData = currentGameData;

        console.log(consequences);

        //Work out numeric adjustments to be made
        let financialImpact = this.financialImpactMap.get(consequences.financialImpact);
        let foreignApproval = this.foreignApprovalMap.get(consequences.foreignApproval);

        if (financialImpact) updatedGameData.attributes.financial += financialImpact;
        if (foreignApproval) updatedGameData.attributes.foreignPoliticalFavour += foreignApproval;

        if (updatedGameData.attributes.financial > 100) updatedGameData.attributes.financial = 100;
        if (updatedGameData.attributes.foreignPoliticalFavour) updatedGameData.attributes.foreignPoliticalFavour = 100;


        //! Will need refactoring when have the time. Very non-DRY code.
        let happiness = currentGameData.attributes.populationHappiness;
        let domesticPoliticalFavour = currentGameData.attributes.domesticPoliticalFavour;

        currentGameData.provinces.forEach(province => {
            //Every time we call this method (updateGameData), we use the province's factors
            //to get their political leaning.
            province.politicalLeaning = getPoliticalLeaning(province);

            const difference = getDifferenceBetweenPoliticalLeaning(province.politicalLeaning, consequences.politicalLeaning);

            if (difference === 0) {
                happiness += 5;
            } else if (difference >= 4) {
                happiness -= 5;
            }

            if (province.isInParty) {
                if (difference === 0) {
                    domesticPoliticalFavour += 5;
                }
                else if (difference >= 4) {
                    domesticPoliticalFavour -= 5;
                }
            }

        });

        if (happiness > 100) happiness = 100;
        if (domesticPoliticalFavour > 100) domesticPoliticalFavour = 100;

        updatedGameData.attributes.populationHappiness = happiness;
        updatedGameData.attributes.domesticPoliticalFavour = domesticPoliticalFavour;

        return updatedGameData;
    }
};

const getDifferenceBetweenPoliticalLeaning = (first: PoliticalLeaning, second: PoliticalLeaning): number => {
    const politicalLeaningAsString = ["Hard Left", "Left", "Centre-Left", "Centre", "Centre-Right",
        "Right",
        "Hard-Right"];

    const firstPos = politicalLeaningAsString.indexOf(first);
    const secondPos = politicalLeaningAsString.indexOf(second);

    return Math.abs(firstPos - secondPos);
}

export default GameDataManager;