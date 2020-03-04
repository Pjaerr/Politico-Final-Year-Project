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
import { IDecision, DecisionConsequences } from "../../interfaces/IDecision";
import { getPoliticalLeaning } from "../../utils/utils";

type Props = {
  gameData: IGameData;
  nextTurn: (consequences: DecisionConsequences) => void;
};

const Game = ({ gameData, nextTurn }: Props) => {
  const [activeProvince, setActiveProvince] = useState<IProvince>();
  const [activeDecision, setActiveDecision] = useState<IDecision>();
  const [decisionIsActive, setDecisionIsActive] = useState<boolean>(false);
  const [provinceIsActive, setProvinceIsActive] = useState<boolean>(false);

  gameData.provinces.forEach(province => getPoliticalLeaning(province));

  return (
    <div className={styles.container}>
      <Attributes attributes={gameData.attributes} />
      <MapContainer
        provinces={gameData.provinces}
        onProvinceClick={(provinceName: string) => {
          setActiveProvince(
            gameData.provinces.filter(
              province => province.name === provinceName
            )[0]
          );

          setProvinceIsActive(true);
        }}
      />

      {decisionIsActive && activeDecision && (
        <Decision
          decision={activeDecision}
          onYes={() => {
            setDecisionIsActive(false);
            nextTurn(activeDecision.yes);
          }}
          onNo={() => {
            setDecisionIsActive(false);
            nextTurn(activeDecision.no);
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
        onNextTurnClick={() => {
          setActiveDecision(Systems.DecisionManager.getDecision());
          setDecisionIsActive(true);
        }}
      />
    </div>
  );
};

export default Game;
