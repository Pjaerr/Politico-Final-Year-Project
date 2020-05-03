import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

test("Calls onCloseFunc() prop when the close button is clicked", () => {
  let count = 5;

  render(
    <Modal
      onCloseFunc={() => {
        count += 5;
      }}
      title="Hello World"
    >
      <h1>Some content!</h1>
    </Modal>
  );

  const closeButton = screen.getByAltText(/Back Arrow Icon/i);
  fireEvent.click(closeButton);

  expect(count).toBe(10);
});
