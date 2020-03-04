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
    VeryNegative = "Very Negative",
    Negative = "Negative",
    Neutral = "Neutral",
    Positive = "Positive",
    VeryPositive = "Very Positive"
}

export enum ForeignApproval {
    VeryNegative = "Very Negative",
    Negative = "Negative",
    Neutral = "Neutral",
    Positive = "Positive",
    VeryPositive = "Very Positive"
}

export type DecisionConsequences = {
    politicalLeaning: PoliticalLeaning;
    financialImpact: FinancialImpact;
    foreignApproval: ForeignApproval;
}

/*The Political Leaning, Financial Impact and Foreign Approval factors will be 
manually determined based on the decision content*/
export interface IDecision {
    name: string;
    description: string;
    yes: {
        politicalLeaning: PoliticalLeaning;
        financialImpact: FinancialImpact;
        foreignApproval: ForeignApproval;
    },
    no: {
        politicalLeaning: PoliticalLeaning;
        financialImpact: FinancialImpact;
        foreignApproval: ForeignApproval;
    }
}