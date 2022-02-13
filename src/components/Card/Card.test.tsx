import React from "react";
import { render, screen } from "@testing-library/react";
import { CARDTESTID } from "./index";
import { CardBlurb } from "./index";
describe("Renders the banner component with image", () => {
  it("render eth banner and text", () => {
    render(<CardBlurb coin='ETH' />);
    const bannerCmp = screen.getByTestId(CARDTESTID);
    expect(bannerCmp).toBeDefined();
    expect(bannerCmp).toHaveTextContent("Ethereum is a decentralized");
  });
  it("render btc banner and text", () => {
    render(<CardBlurb coin='BTC' />);
    const bannerCmp = screen.getByTestId(CARDTESTID);
    expect(bannerCmp).toBeDefined();
    expect(bannerCmp).toHaveTextContent("Bitcoin is a decentralized digital");
  });
  it("render ltc banner and text", () => {
    render(<CardBlurb coin='LTC' />);
    const bannerCmp = screen.getByTestId(CARDTESTID);
    expect(bannerCmp).toBeDefined();
    expect(bannerCmp).toHaveTextContent(
      "Litecoin (LTC or Ł) is a peer-to-peer"
    );
  });
});
