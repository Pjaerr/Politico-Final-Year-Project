import { IDecision, PoliticalLeaning } from '../interfaces/IDecision';


/**
 * Each Decision object has Positive and Negative modifiers. For each decision that is made
 * If, for a particular attribute, it is a positive outcome, then the Positive modifier will
 * be applied to the overall attributes and vice versa.
 * 
 * EG: The majority of your provinces lean Left on the political spectrum but you say Yes to
 * a decision that is Right leaning. This will use the negative modifier from the decision for
 * population happiness.
 */
const Decisions: IDecision[] = [
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
            financial: 0,
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

export default Decisions;