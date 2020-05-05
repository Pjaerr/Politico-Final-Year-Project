import { IDecision } from "../../interfaces/IDecision";

interface IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];
    decisionList: IDecision[];
    getDecision: () => IDecision;
    saveDecisionList: () => void;
}

export default IDecisionManager;
