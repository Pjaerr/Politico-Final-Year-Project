import IDecisionManager from "./IDecisionManager";
import { IDecision, PoliticalLeaning } from "../../interfaces/IDecision";

class DecisionManager implements IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];

    constructor() {
        this.decisions = [
            {
                name: "Decision 1",
                description: "lorem ipsum dimsum",
                politicalLeaning: PoliticalLeaning.Centre,
                positiveModifiers: {
                    domesticPoliticalFavour: 0,
                    financial: 10,
                    foreignPoliticalFavour: 0,
                    populationHappiness: 5
                },
                negativeModifiers: {
                    domesticPoliticalFavour: -5,
                    financial: -90,
                    foreignPoliticalFavour: 0,
                    populationHappiness: 0
                }
            },
            {
                name: "Decision 2",
                description: "lorem ipsum dimsum",
                politicalLeaning: PoliticalLeaning.Right,
                positiveModifiers: {
                    domesticPoliticalFavour: 30,
                    financial: 2,
                    foreignPoliticalFavour: 0,
                    populationHappiness: 0
                },
                negativeModifiers: {
                    domesticPoliticalFavour: 0,
                    financial: -5,
                    foreignPoliticalFavour: -10,
                    populationHappiness: -15
                }
            },
            {
                name: "Decision 3",
                description: "lorem ipsum dimsum",
                politicalLeaning: PoliticalLeaning.Left,
                positiveModifiers: {
                    domesticPoliticalFavour: 0,
                    financial: 50,
                    foreignPoliticalFavour: 0,
                    populationHappiness: 20
                },
                negativeModifiers: {
                    domesticPoliticalFavour: -25,
                    financial: 0,
                    foreignPoliticalFavour: -15,
                    populationHappiness: 0
                }
            }
        ];

        this.numberOfDecisions = this.decisions.length - 1;
    }
}

export default DecisionManager;
