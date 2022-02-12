import React from "react";
import bannerImg from "../../Assets/banner.jpg";
import { ImgContainer, Img } from "./Banner.styles";
export const BANNER_TEST_ID = "banner-img";
export const Banner = () => {
  return (
    <ImgContainer>
      <Img
        src={bannerImg}
        data-testid={BANNER_TEST_ID}
        role='img'
        aria-label='crypto background banner'
      ></Img>
    </ImgContainer>
  );
};
