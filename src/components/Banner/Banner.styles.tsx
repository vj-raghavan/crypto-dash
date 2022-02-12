import styled from "styled-components";

export const ImgContainer = styled.div`
  flex: row;
  overflow: hidden;
  @media (min-width: 0px) and (max-width: 767px) {
  }
`;

export const Img = styled.img`
  object-fit: cover;
  height: 20vh;
  width: 100%;
  object-position: 50% 50%;
  @media (min-width: 0px) and (max-width: 767px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;
