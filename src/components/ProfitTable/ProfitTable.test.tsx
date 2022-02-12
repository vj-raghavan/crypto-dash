import React from "react";
import { render, screen } from "@testing-library/react";
import { ProfitTable } from "./index";
import { queryAllByTableHeader } from "./tables";
import * as CONSTANT from "./constants";
test("Renders Table without any errors", () => {
  render(<ProfitTable />);

  const coinCells = queryAllByTableHeader("ETH");
  const scopedCoinCells = queryAllByTableHeader("ETH", { scope: "col" });
  console.log(coinCells, scopedCoinCells);
  expect(coinCells).toEqual(scopedCoinCells);
});
