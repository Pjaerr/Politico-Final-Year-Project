import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MapProvinceInfo from "./MapProvinceInfo";
import IProvince from "../../interfaces/IProvince";

test("Calls onCloseFunc() prop when the close button is clicked", () => {
  //Useless province object to avoid missing prop errors when testing MapProvinceInfo component
  const mockProvince: IProvince = {
    factors: {
      averageSalary: 0,
      nonWhiteBritishEthnicPercentage: 0,
      numberOfUniversities: 0,
      populationDensity: 0,
    },
    politicalLeaning: 50,
    happiness: 100,
    isInParty: false,
    name: "Mock Province",
    population: 10000,
  };

  let count = 5;

  render(
    <MapProvinceInfo onCloseFunc={() => (count += 5)} province={mockProvince} />
  );

  const closeButton = screen.getByAltText(/Back Arrow Icon/i);
  fireEvent.click(closeButton);

  expect(count).toBe(10);
});
