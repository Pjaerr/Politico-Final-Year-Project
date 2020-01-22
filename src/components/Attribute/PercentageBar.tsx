import React from "react";

type Props = {
  percentage: number;
  height?: string;
};

const getColour = (percentage: number): string => {
  if (percentage > 0 && percentage <= 30) {
    return "#E55039";
  } else if (percentage > 30 && percentage <= 60) {
    return "#E58E26";
  }

  return "#16A085";
};

const PercentageBar = ({ percentage, height = "20px" }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height,
        outline: "0.5px solid black"
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: getColour(percentage)
        }}
      ></div>
    </div>
  );
};

export default PercentageBar;
