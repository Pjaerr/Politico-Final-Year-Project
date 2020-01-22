import IDecisionManager from "./IDecisionManager";
import { IDecision, PoliticalLeaning, FinancialImpact, ForeignApproval } from "../../interfaces/IDecision";

class DecisionManager implements IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];

    constructor() {
        this.decisions = [
            {
                name: "Decision 1",
                description: "Fugiat eiusmod elit adipisicing magna occaecat sunt duis id aute. Qui adipisicing magna amet commodo do tempor consequat Lorem culpa in consequat ea. Deserunt laboris veniam mollit qui dolor Lorem dolore nisi adipisicing ullamco irure magna labore. Excepteur consequat minim mollit proident commodo labore ut occaecat tempor quis. Aliquip qui cillum enim exercitation elit ullamco elit. Nulla aliqua incididunt sint cillum culpa.",
                politicalLeaning: PoliticalLeaning.Centre,
                financialImpact: FinancialImpact.Medium,
                foreignApproval: ForeignApproval.High
            },
            {
                name: "Decision 2",
                description: "Fugiat eiusmod elit adipisicing magna occaecat sunt duis id aute. Qui adipisicing magna amet commodo do tempor consequat Lorem culpa in consequat ea. Deserunt laboris veniam mollit qui dolor Lorem dolore nisi adipisicing ullamco irure magna labore. Excepteur consequat minim mollit proident commodo labore ut occaecat tempor quis. Aliquip qui cillum enim exercitation elit ullamco elit. Nulla aliqua incididunt sint cillum culpa.",
                politicalLeaning: PoliticalLeaning.Right,
                financialImpact: FinancialImpact.Low,
                foreignApproval: ForeignApproval.Low
            },
            {
                name: "Decision 3",
                description: "Fugiat eiusmod elit adipisicing magna occaecat sunt duis id aute. Qui adipisicing magna amet commodo do tempor consequat Lorem culpa in consequat ea. Deserunt laboris veniam mollit qui dolor Lorem dolore nisi adipisicing ullamco irure magna labore. Excepteur consequat minim mollit proident commodo labore ut occaecat tempor quis. Aliquip qui cillum enim exercitation elit ullamco elit. Nulla aliqua incididunt sint cillum culpa.",
                politicalLeaning: PoliticalLeaning.Left,
                financialImpact: FinancialImpact.VeryHigh,
                foreignApproval: ForeignApproval.Medium
            }
        ];

        this.numberOfDecisions = this.decisions.length - 1;
    }
}

export default DecisionManager;
