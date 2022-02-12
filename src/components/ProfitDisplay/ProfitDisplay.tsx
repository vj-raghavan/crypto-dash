import React from "react";

import { StyledH3 } from "./index";
export const PDTESTID = "profit-display-text";

type ProfitDisplayProps = {
  dollarValue: number;
};
export const ProfitDisplay = ({ dollarValue }: ProfitDisplayProps) => {
  if (dollarValue > 0) {
    return (
      <StyledH3 data-testid={PDTESTID} positiveProfit={true}>
        {" "}
        $: {dollarValue}
      </StyledH3>
    );
  }
  return (
    <StyledH3 data-testid={PDTESTID} positiveProfit={false}>
      $: {dollarValue}
    </StyledH3>
  );
};
