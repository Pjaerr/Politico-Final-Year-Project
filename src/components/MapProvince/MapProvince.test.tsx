import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MapProvince from "./MapProvince";
import IProvince from "../../interfaces/IProvince";
import Provinces from "../../data/Provinces";

test("Calls onClick() prop when the SVG path is clicked", () => {
  //Useless province object to avoid missing prop errors when testing MapProvinceInfo component
  const mockProvince: IProvince = {
    factors: {
      averageSalary: 0,
      nonWhiteBritishEthnicPercentage: 0,
      numberOfUniversities: 0,
      populationDensity: 0
    },
    happiness: 100,
    isInParty: false,
    name: "Mock Province",
    population: 10000
  };

  //svgPath taken from array of province paths for testing
  const svgPath = Provinces[0].svgPath;

  let count = 5;

  const { container } = render(
    <svg>
      <MapProvince
        onClick={() => (count += 5)}
        province={mockProvince}
        svgPath={svgPath}
      />
    </svg>
  );

  const path = container.querySelector("path");

  if (path) {
    fireEvent.click(path);
    expect(count).toBe(10);
  } else {
    fail("Can't find the SVGPathElement");
  }
});
