import React, { useState } from "react";

//Styles
import styles from "./Game.module.scss";

//Components
import Attributes from "../Attributes/Attributes";
import MapContainer from "../MapContainer/MapContainer";
import Decision from "../Decision/Decision";
import MapProvinceInfo from "../MapProvinceInfo/MapProvinceInfo";
import TurnCounter from "../TurnCounter/TurnCounter";
import IGameData from "../../interfaces/IGameData";

//Types
import IProvince from "../../interfaces/IProvince";
import Systems from "../../systems/Systems";
import IAttributes from "../../interfaces/IAttributes";

type Props = {
  gameData: IGameData;
  nextTurn: (attributeAdjustments: IAttributes) => void;
};

const Game = ({ gameData, nextTurn }: Props) => {
  const [activeProvince, setActiveProvince] = useState<IProvince>();
  const [decisionIsActive, setDecisionIsActive] = useState<boolean>(false);
  const [provinceIsActive, setProvinceIsActive] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Attributes attributes={gameData.attributes} />
      <MapContainer
        onProvinceClick={(provinceName: string) => {
          setActiveProvince(
            gameData.provinces.filter(
              province => province.name === provinceName
            )[0]
          );

          setProvinceIsActive(true);
        }}
      />

      {decisionIsActive && (
        <Decision
          decision={Systems.DecisionManager.decisions[gameData.turn]}
          onYes={() => {
            setDecisionIsActive(false);
            nextTurn({
              domesticPoliticalFavour: 0,
              financial: 0,
              foreignPoliticalFavour: 0,
              populationHappiness: 0
            });
          }}
          onNo={() => {
            setDecisionIsActive(false);
            nextTurn({
              domesticPoliticalFavour: 0,
              financial: 0,
              foreignPoliticalFavour: 0,
              populationHappiness: 0
            });
          }}
        />
      )}

      {provinceIsActive && activeProvince && (
        <MapProvinceInfo
          onCloseFunc={() => {
            setProvinceIsActive(false);
          }}
          province={activeProvince}
        />
      )}

      <TurnCounter
        currentTurn={gameData.turn}
        onNextTurnClick={() => setDecisionIsActive(true)}
      />
    </div>
  );
};

export default Game;
