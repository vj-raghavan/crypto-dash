import React from "react";
import { render, screen } from "@testing-library/react";
import { Header, HEADER_TEST_ID } from "./index";

test("renders learn react link", () => {
  render(<Header />);
  const headerText = screen.getByTestId(HEADER_TEST_ID);
  expect(headerText.textContent).toBe("Trade Simulator");
});
