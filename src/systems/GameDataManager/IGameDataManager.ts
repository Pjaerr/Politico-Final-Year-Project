import IGameData from "../../interfaces/IGameData";
import { DecisionConsequences, FinancialImpact, ForeignApproval } from "../../interfaces/IDecision";


interface IGameDataManager {
    financialImpactMap: Map<FinancialImpact, number>;
    foreignApprovalMap: Map<ForeignApproval, number>;

    getFreshGameData(): Promise<IGameData>;
    updateGameData(currentGameData: IGameData, consequences: DecisionConsequences): Promise<IGameData>;
}

export default IGameDataManager;