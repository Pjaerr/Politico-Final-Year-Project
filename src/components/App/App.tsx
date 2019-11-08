import React from "react";

//Styles
import styles from "./App.module.scss";

//Components
import TurnCounter from "../TurnCounter/TurnCounter";

//Systems
import Systems from "../../systems/Systems";

//Interfaces
import IGameState from "../../interfaces/IGameState";

type State = {
  gameState: IGameState;
};

type Props = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const gameState = Systems.DataStorage.get<IGameState>("gameState");

    if (gameState) {
      //If we already have a game save, restore it.
      this.state = {
        gameState
      };
    } else {
      //If we don't have a game save, create a new game.
      // ! This will eventually be extracted out of here.
      this.state = {
        gameState: {
          turn: 0,
          attributes: {
            financial: 100,
            populationHappiness: 100,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
          },
          provinces: {
            bedfordshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            berkshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            buckinghamshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            cheshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            cambridgeshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            cornwall: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            cumbria: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            derbyshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            durham: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            dorset: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            devon: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            essex: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            gloucestershire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            greater_london: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            hampshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            herefordshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            hertfordshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            kent: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            lancashire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            leicestershire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            lincolnshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            northamptonshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            northumberland: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            norfolk: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            northern_ireland: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            nottinghamshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            oxfordshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            rutland: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            scotland: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            suffolk: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            somerset: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            shropshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            surrey: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            staffordshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            sussex: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            wales: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            wiltshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            worcestershire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            warwickshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            },
            yorkshire: {
              population: 31670000,
              happiness: 100,
              factors: {
                numberOfUniversities: 5,
                averageIncome: 37000,
                ageRange: { min: 28, max: 35 },
                foreignPopulation: 5
              }
            }
          }
        }
      };
    }
  }

  nextTurn = () => {
    //Save the game state to storage before we move to the next turn
    Systems.DataStorage.set<IGameState>("GameState", this.state.gameState);

    this.setState(prevState => {
      return {
        gameState: {
          ...prevState.gameState,
          turn: prevState.gameState.turn + 1
        }
      };
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <TurnCounter currentTurn={this.state.gameState.turn} />
        <button onClick={this.nextTurn}>Increment Turn</button>
      </div>
    );
  }
}

export default App;
