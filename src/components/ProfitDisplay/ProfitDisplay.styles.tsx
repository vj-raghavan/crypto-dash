import styled from "styled-components";

export const StyledH4 = styled.h4<{ positiveProfit: boolean }>`
  color: ${(props) => (props.positiveProfit ? "green" : "red")};
`;
