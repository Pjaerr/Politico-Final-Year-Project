import React from "react";
import IProvince from "../../interfaces/IProvince";
import Modal from "../Modal/Modal";

import styles from "./MapProvinceInfo.module.scss";

import { getPoliticalLeaningAsString } from "../../utils/utils";

type Props = {
  province: IProvince;
  onCloseFunc: () => void;
};

const MapProvinceInfo = ({ province, onCloseFunc }: Props) => {
  return (
    <Modal title={province.name} onCloseFunc={onCloseFunc}>
      <section className={styles.body}>
        <p className={styles.population}>
          <img src="population-happiness.svg" alt="Province Population Icon" />
          {province.population}
        </p>
        <p className={styles.politicalLeaning}>
          {province.name} leans{" "}
          <span>{getPoliticalLeaningAsString(province.politicalLeaning)}</span>{" "}
          on the political spectrum
        </p>
        {province.isInParty && (
          <p className={styles.isInParty}>
            {province.name} is represented by a member of your party.
          </p>
        )}
        <div className={styles.statistics}>
          <h2>Statistics</h2>
          <p className={styles.statistic}>
            The population density in {province.name} is{" "}
            <span>{province.factors.populationDensity}/km2</span>
          </p>
          <p className={styles.statistic}>
            {province.name} has{" "}
            <span>{province.factors.numberOfUniversities}</span> universities
          </p>
          <p className={styles.statistic}>
            The average salary in {province.name} is{" "}
            <span>£{province.factors.averageSalary}</span>
          </p>
          <p className={styles.statistic}>
            <span>{province.factors.nonWhiteBritishEthnicPercentage}%</span> of
            the population in {province.name} are of non white-British
            ethnicity.
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default MapProvinceInfo;
