import React, { useState } from "react";

//Styles
import styles from "./Game.module.scss";

//Components
import Attributes from "../Attributes/Attributes";
import MapContainer from "../MapContainer/MapContainer";
import DecisionContainer from "../DecisionContainer/DecisionContainer";
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
  const [activeRegion, setActiveRegion] = useState<IProvince | null>(null);
  const [decisionIsActive, setDecisionIsActive] = useState<boolean>(false);
  const [regionIsActive, setRegionIsActive] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Attributes attributes={gameData.attributes} />
      <MapContainer
        onProvinceClick={(provinceName: string) => {
          setActiveRegion(
            gameData.provinces.filter(
              province => province.name === provinceName
            )[0]
          );

          setRegionIsActive(true);
        }}
      ></MapContainer>

      {decisionIsActive && (
        <DecisionContainer
          decision={Systems.DecisionManager.decisions[gameData.turn]}
          nextTurn={nextTurn}
        />
      )}

      {regionIsActive && (
        <MapProvinceInfo
          onCloseFunc={() => {
            setRegionIsActive(false);
          }}
          province={activeRegion}
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
