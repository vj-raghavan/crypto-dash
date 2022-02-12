import React from "react";

import { StyledH4 } from "./index";
export const PDTESTID = "profit-display-text";

type ProfitDisplayProps = {
  dollarValue: number;
};
export const ProfitDisplay = ({ dollarValue }: ProfitDisplayProps) => {
  if (dollarValue > 0) {
    return (
      <StyledH4 data-testid={PDTESTID} positiveProfit={true}>
        {" "}
        ${dollarValue}
      </StyledH4>
    );
  }
  return (
    <StyledH4 data-testid={PDTESTID} positiveProfit={false}>
      ${dollarValue}
    </StyledH4>
  );
};
