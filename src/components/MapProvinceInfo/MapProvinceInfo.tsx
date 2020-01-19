import React from "react";
import IProvince from "../../interfaces/IProvince";

import styles from "./MapProvinceInfo.module.scss";

import * as utils from "../../utils/utils";

type Props = {
  province: IProvince | null;
  onCloseFunc: () => void;
};

const MapProvinceInfo = ({ province, onCloseFunc }: Props) => {
  if (province) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.backButtonContainer}>
              <button onClick={onCloseFunc}>
                <img src="back-arrow.svg" alt="Back Arrow Icon"></img>
              </button>
            </div>
            <h1>{province.name}</h1>
          </div>
          <p className={styles.population}>
            <img
              src="population-happiness.svg"
              alt="Province Population Icon"
            />
            {province.population}
          </p>
          <p className={styles.politicalLeaning}>
            {province.name} leans{" "}
            <span className={styles.left}>
              {utils.getPoliticalLeaning(province)}
            </span>{" "}
            on the political spectrum
          </p>
          <div className={styles.statistics}>
            <h2>Statistics</h2>
            <p className={styles.statistic}>
              {province.name} has{" "}
              <span>{province.factors.numberOfUniversities}</span> universities
            </p>
            <p className={styles.statistic}>
              The average income in {province.name} is{" "}
              <span>£{province.factors.averageIncome}</span>
            </p>
            <p className={styles.statistic}>
              The most common age range in {province.name} is{" "}
              <span>
                {province.factors.ageRange.min} -{" "}
                {province.factors.ageRange.max}
              </span>
            </p>
            <p className={styles.statistic}>
              <span>{province.factors.foreignPopulation}%</span> of the
              population in {province.name} were born outside of the UK
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MapProvinceInfo;
