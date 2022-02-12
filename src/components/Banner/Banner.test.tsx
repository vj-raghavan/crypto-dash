import React from "react";
import { render, screen } from "@testing-library/react";
import { Banner, BANNER_TEST_ID } from "./index";

test("Renders the banner component with image", () => {
  render(<Banner />);
  const bannerCmp = screen.getByTestId(BANNER_TEST_ID);
  expect(bannerCmp).toBeDefined();
});
