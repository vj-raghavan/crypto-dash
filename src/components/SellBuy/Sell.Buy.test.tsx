import React from "react";
import { render, screen } from "@testing-library/react";
import { SellBuy, SELLBUYTESTID, BUY, SELL } from "./index";
import "@testing-library/jest-dom/extend-expect";
describe("Renders Buy Sell Component without any errors", () => {
  it("Renders Buy text with appropriate text", () => {
    render(<SellBuy transactionType={BUY} amount={45} time='9:45 AM' />);
    const sellBuy = screen.getByTestId(SELLBUYTESTID);
    expect(sellBuy).toHaveTextContent("45");
    expect(sellBuy).toHaveTextContent("9:45 AM");
  });
  it("Renders Sell text with appropriate text", () => {
    render(<SellBuy transactionType={BUY} amount={25} time='11:45 AM' />);
    const sellBuy = screen.getByTestId(SELLBUYTESTID);
    expect(sellBuy).toHaveTextContent("25");
    expect(sellBuy).toHaveTextContent("11:45 AM");
  });
});
