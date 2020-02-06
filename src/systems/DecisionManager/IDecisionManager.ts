import { IDecision } from "../../interfaces/IDecision";

interface IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];
    getDecision: () => IDecision;
}

export default IDecisionManager;
