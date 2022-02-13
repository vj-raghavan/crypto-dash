import { Card } from "react-bootstrap";
import React from "react";
import bitCoinBanner from "../../Assets/bitcoin-banner.jpg";
import ethBanner from "../../Assets/ether-banner.jpg";
import ltcBanner from "../../Assets/litecoin-banner.jpg";
import * as CONSTANTS from "./constants";
import "./Card.style.css";
type CardBlurbProps = {
  coin: string;
};

export const CardBlurb = ({ coin }: CardBlurbProps) => {
  let bannerImage = "";
  let bannerText = "";
  if (coin === "ETH") {
    bannerImage = ethBanner;
    bannerText = CONSTANTS.eth;
  } else if (coin === "BTC") {
    bannerImage = bitCoinBanner;
    bannerText = CONSTANTS.bitcoin;
  } else {
    bannerImage = ltcBanner;
    bannerText = CONSTANTS.ltc;
  }
  return (
    <Card data-testid={CONSTANTS.CARDTESTID}>
      <Card.Img
        variant='top'
        className='crypto-banner-image'
        src={bannerImage}
      />
      <Card.Body>
        <Card.Text>{bannerText}</Card.Text>
      </Card.Body>
    </Card>
  );
};
