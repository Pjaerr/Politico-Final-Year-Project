import { IDecision } from "../../interfaces/IDecision";

interface IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];
}

export default IDecisionManager;
