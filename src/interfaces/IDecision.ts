import IAttributes from './IAttributes'

export enum PoliticalLeaning {
    HardLeft = 0,
    Left = 1,
    CentreLeft = 2,
    Centre = 3,
    CentreRight = 4,
    Right = 5,
    HardRight = 6
}

export interface IDecision {
    name: string;
    description: string;
    politicalLeaning: PoliticalLeaning;
    positiveModifiers: IAttributes;
    negativeModifiers: IAttributes;
}