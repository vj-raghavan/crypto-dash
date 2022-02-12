import React from "react";

import { StyledDiv, StyledH1 } from "./index";
export const HEADER_TEST_ID = "header-text";
export const Header = () => {
  return (
    <StyledDiv>
      <StyledH1 data-testid={HEADER_TEST_ID}>My Portfolio</StyledH1>
    </StyledDiv>
  );
};
