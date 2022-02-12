import styled from "styled-components";

export const StyledH3 = styled.h3<{ positiveProfit: boolean }>`
  color: ${(props) => (props.positiveProfit ? "green" : "red")};
`;
