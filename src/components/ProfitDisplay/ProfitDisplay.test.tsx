import React from "react";
import { render, screen } from "@testing-library/react";
import { ProfitDisplay, PDTESTID } from "./index";
import "@testing-library/jest-dom/extend-expect";
describe("Renders Profit with Green and Red Styling", () => {
  it("Renders profit text with green colour", () => {
    render(<ProfitDisplay dollarValue={23} />);
    const profitDisplay = screen.getByTestId(PDTESTID);
    expect(profitDisplay).toHaveStyle("color: green");
  });
  it("Renders profit text with red colour", () => {
    render(<ProfitDisplay dollarValue={-23} />);
    const profitDisplay = screen.getByTestId(PDTESTID);
    expect(profitDisplay).toHaveStyle("color: red");
  });
});
