import React from "react";
import { render, screen } from "@testing-library/react";
import { SellBuy, SELLBUYTESTID, BUY, SELL } from "./index";
import "@testing-library/jest-dom/extend-expect";
describe("Renders Buy Sell Component without any errors", () => {
  it("Renders Buy text with appropriate text", () => {
    render(<SellBuy transactionType={BUY} amount={"45"} time='1525647600' />);
    const sellBuy = screen.getByTestId(SELLBUYTESTID);
    expect(sellBuy).toHaveTextContent("45");
    expect(sellBuy).toHaveTextContent("9:00 am");
  });
  it("Renders Sell text with appropriate text", () => {
    render(<SellBuy transactionType={SELL} amount={"25"} time='1525653000' />);
    const sellBuy = screen.getByTestId(SELLBUYTESTID);
    expect(sellBuy).toHaveTextContent("25");
    expect(sellBuy).toHaveTextContent("10:30 am");
  });
});
