import IAttributes from './IAttributes'

export enum PoliticalLeaning {
    HardLeft = "Hard Left",
    Left = "Left",
    CentreLeft = "Centre-Left",
    Centre = "Centre",
    CentreRight = "Centre-Right",
    Right = "Right",
    HardRight = "Hard-Right"
}

export enum FinancialImpact {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    VeryHigh = "Very High"
}

export enum ForeignApproval {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    VeryHigh = "Very High"
}

/*The Political Leaning, Financial Impact and Foreign Approval factors will be 
manually determined based on the decision content*/
export interface IDecision {
    name: string;
    description: string;
    politicalLeaning: PoliticalLeaning;
    financialImpact: FinancialImpact;
    foreignApproval: ForeignApproval;
}