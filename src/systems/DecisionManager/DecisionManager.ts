import IDecisionManager from "./IDecisionManager";
import { IDecision, PoliticalLeaning, FinancialImpact, ForeignApproval } from "../../interfaces/IDecision";
import { randomNumber } from "../../utils/utils";
import {
    DataStorageSystem
} from "../Systems";

class DecisionManager implements IDecisionManager {
    numberOfDecisions: number;
    decisions: IDecision[];
    decisionList: IDecision[];

    /**
     * Note for testing:
     * Maybe need to introduce more refined outcomes for both the financial impact and the foreign approval
     * if its found that the game is too difficult/variable.
     */
    constructor() {
        this.decisions = [
            {
                name: "Tighten Immigration System",
                description: `
                    Introduce a points-based immigration system that evaluates the potential positive impact
                    a new arrival to the country can have on the economy before allowing entry.
                `,
                yes: {
                    politicalLeaning: 65.85,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Negative
                },
                no: {
                    politicalLeaning: 25,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Positive
                }
            },
            {
                name: "Introduce High Speed Rail Transport Links",
                description: `Introduce a new High Speed Rail Transport Link at high cost between Greater London and Yorkshire 
                that will greatly benefit business men/women who travel across the country often.`,
                yes: {
                    politicalLeaning: 75.60,
                    financialImpact: FinancialImpact.VeryNegative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 48,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Regulate Energy Companies",
                description: `Pass the Energy Regulation Act that ensures all energy companies cannot 
                charge excessive amounts and must reduce their profit margins.`,
                yes: {
                    politicalLeaning: 20,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 78,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Introduce Free Broadband to all Households in the UK",
                description: `Nationalise the broadband companies so that free broadband can be provided to
                all households within the UK.`,
                yes: {
                    politicalLeaning: 15.25,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 56.78,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Ban Fox Hunting",
                description: `Place a ban on fox hunting within the UK amidst pressure from the 
                European Union.`,
                yes: {
                    politicalLeaning: 26.50,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.VeryPositive
                },
                no: {
                    politicalLeaning: 82,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Negative
                }
            },
            {
                name: "Get Rid of Overseas Financial Aid",
                description: `Scrap the existing financial aid that the UK provides to countries overseas.`,
                yes: {
                    politicalLeaning: 78.4,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.VeryNegative
                },
                no: {
                    politicalLeaning: 26,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Leave the North Atlantic Treaty Organisation (NATO)",
                description: `Leave NATO and stop contributing 2% of the UK's GDP in funds.`,
                yes: {
                    politicalLeaning: 96,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Negative
                },
                no: {
                    politicalLeaning: 40,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Provide Extra Funding for the UK's Armed Forces",
                description: `Provide more funding for the UK's Armed Forces so that they can
                carry out their relevant commitments overseas.`,
                yes: {
                    politicalLeaning: 60,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Positive
                },
                no: {
                    politicalLeaning: 9.67,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Increase Funding for Renewable Energy Initiatives",
                description: `Increase the amount of money spent on renewable energy initiatives, cutting what is
                spent on fossil fuel producing initiatives.`,
                yes: {
                    politicalLeaning: 38.75,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.VeryPositive
                },
                no: {
                    politicalLeaning: 98.8,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Stop Any Future Plans to Privatise the National Health Service (NHS)",
                description: `Put laws in place to stop any future potential plans to privatise the NHS.`,
                yes: {
                    politicalLeaning: 50,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 100,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Reduce Voting Age to 16",
                description: `Reduce the age at which somebody is legally allowed to vote to 16 years of age.`,
                yes: {
                    politicalLeaning: 18,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 50,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Increase the Number of Mandatory Holiday Days Per Year",
                description: `Increase the number of holiday days that an employer must provide.`,
                yes: {
                    politicalLeaning: 35,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 53.50,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Increase Taxation on UK Businesses",
                description: `Increase the amount of tax that UK businesses must pay.`,
                yes: {
                    politicalLeaning: 0,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 55,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Get Rid of the Nuclear Missles Program in the UK",
                description: `Scrap the UK's nuclear missles program.`,
                yes: {
                    politicalLeaning: 0,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Positive
                },
                no: {
                    politicalLeaning: 50,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Increase the Living Wage to £15.34 an hour",
                description: `Increase the Living Wage from £10.75 an hour to £15.34 an hour`,
                yes: {
                    politicalLeaning: 16,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 78,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Restrict older cars from entering central zones in larger cities",
                description: `To help reduce emissions, fine those driving cars inside of central zones in larger cities whose production date is older than 2005.`,
                yes: {
                    politicalLeaning: 21,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Positive
                },
                no: {
                    politicalLeaning: 58,
                    financialImpact: FinancialImpact.Negative,
                    foreignApproval: ForeignApproval.Negative
                }
            },
            {
                name: "Shut down the majority of the fishing industry",
                description: `Shut down the British fishing industry, in favour of importing from Iceland.`,
                yes: {
                    politicalLeaning: 30,
                    financialImpact: FinancialImpact.VeryNegative,
                    foreignApproval: ForeignApproval.VeryPositive
                },
                no: {
                    politicalLeaning: 62,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Negative
                }
            },
            {
                name: "Limit entry into the country to only 'High-Skilled' workers",
                description: `Only allow high skilled workers into the country.`,
                yes: {
                    politicalLeaning: 100,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.VeryNegative
                },
                no: {
                    politicalLeaning: 45,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Positive
                }
            },
            {
                name: "Allow counties like Yorkshire to implement a mayoral system like London",
                description: `Allow large counties like Yorkshire to implement a mayoral system like in London. This will give those counties more power locally.`,
                yes: {
                    politicalLeaning: 35,
                    financialImpact: FinancialImpact.Positive,
                    foreignApproval: ForeignApproval.Neutral
                },
                no: {
                    politicalLeaning: 80,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Implement a Sugar Tax",
                description: `Items that have over a set amount of sugar will now cost more in the supermarkets.`,
                yes: {
                    politicalLeaning: 40,
                    financialImpact: FinancialImpact.VeryPositive,
                    foreignApproval: ForeignApproval.Positive
                },
                no: {
                    politicalLeaning: 55,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Neutral
                }
            },
            {
                name: "Switch to using the Euro",
                description: `Switch from using GBP to EUR as the national currency of Great Britain.`,
                yes: {
                    politicalLeaning: 0,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.VeryPositive
                },
                no: {
                    politicalLeaning: 50,
                    financialImpact: FinancialImpact.Neutral,
                    foreignApproval: ForeignApproval.Negative
                }
            }
        ];


        const decisionsFromStorage = DataStorageSystem.get<IDecision[]>("decisions");

        if (decisionsFromStorage) {
            this.decisionList = decisionsFromStorage;
        }
        else {
            this.decisionList = this.decisions.sort(() => Math.random() - 0.5);
        }

        this.numberOfDecisions = this.decisionList.length - 1;

    }

    getDecision(): IDecision {
        const decision = this.decisionList.pop();

        if (decision) {
            return decision;
        }

        throw new Error("List of decisions is empty!");
    }

    saveDecisionList(): void {
        DataStorageSystem.set<IDecision[]>("decisions", this.decisionList);
    }
}

export default DecisionManager;
