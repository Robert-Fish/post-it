/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../test-utils";
import Home from "../../pages/index";

describe("Home", () => {
  test("should render a grid of 10 users as cards", async () => {
    const { getAllByTestId } = await render(<Home />);
    const profiles = getAllByTestId("profile");
    expect(profiles.length).toBe(10);
  });
});
