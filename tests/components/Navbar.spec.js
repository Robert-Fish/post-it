/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../test-utils";
import Navbar from "../../components/Navbar";

describe("Navbar", () => {
  it("should render the navbar container", () => {
    const { getByTestId } = render(<Navbar />);
    const container = getByTestId("navbar");
    expect(container).toBeVisible();
  });
});
