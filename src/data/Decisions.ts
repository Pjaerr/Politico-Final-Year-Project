import { IDecision, PoliticalLeaning } from '../interfaces/IDecision';


const Decisions: IDecision[] = [
    {
        description: "Decision 1",
        politicalLeaning: PoliticalLeaning.Centre,
        positiveModifiers: {
            domesticPoliticalFavour: 0,
            financial: 10,
            foreignPoliticalFavour: 0,
            populationHappiness: 5
        },
        negativeModifiers: {
            domesticPoliticalFavour: -5,
            financial: 0,
            foreignPoliticalFavour: 0,
            populationHappiness: 0
        }
    },
    {
        description: "Decision 2",
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
        description: "Decision 3",
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

export default Decisions;