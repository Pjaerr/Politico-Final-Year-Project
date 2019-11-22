import React from "react";

import styles from "./Attributes.module.scss";
import IAttributes from "../../interfaces/IAttributes";
import Attribute from "../Attribute/Attribute";

type Props = {
  attributes: IAttributes;
};

const Attributes = ({ attributes }: Props) => {
  return (
    <div className={styles.container}>
      <Attribute
        iconPath="financial.svg"
        type="Financial"
        percentage={attributes.financial}
      />
      <Attribute
        iconPath="population-happiness.svg"
        type="Population Happiness"
        percentage={attributes.populationHappiness}
      />
      <Attribute
        iconPath="domestic-pol-favour.svg"
        type="Domestic Political Favour"
        percentage={attributes.domesticPoliticalFavour}
      />
      <Attribute
        iconPath="foreign-pol-favour.svg"
        type="Foreign Political Favour"
        percentage={attributes.foreignPoliticalFavour}
      />
    </div>
  );
};

export default Attributes;
